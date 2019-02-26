<?php
//ステージクリアログ管理
//Basic認証
if(!isset($_SERVER["PHP_AUTH_USER"]) || !($_SERVER["PHP_AUTH_USER"] == "masago" && $_SERVER["PHP_AUTH_PW"] == "Bunbun")) {
  header("WWW-Authenticate: Basic realm=\"Cooking community\"");
  header("HTTP/1.0 401 Unauthorized");
  echo "Basic認証のIDまたはパスワードが正しくありません<br><br>";
  echo "<a href=\"userkanri.php\">メンバー管理ページへ</a>";
  exit();
}

//MySQLクラスファイルの取り込み
require_once(dirname(__FILE__)."/../php/mysql2.php");

//MySQLクラスインスタンスの作成
$mysql = new MySQL;

//変数初期化
$sql = "";
$error = "";
$new_id = "";
$value = "";
$clearflag = "";

//POSTされたとき
if($_SERVER["REQUEST_METHOD"] =="POST") {
  //新規追加
  if(isset($_POST["submit_add"])) {
    //POSTされたデータを取得

    //新規追加
    $new_id = htmlspecialchars($_POST["new_id"], ENT_QUOTES); //追加Id
    $value = htmlspecialchars($_POST["value"], ENT_QUOTES); //追加Id
    $clearflag = htmlspecialchars($_POST["clearflag"], ENT_QUOTES); //追加Id

    //全角文字を半角に変換
    $new_id = mb_convert_kana($new_id, "as");
    $value = mb_convert_kana($value, "as");
    $clearflag = mb_convert_kana($clearflag, "as");

    //SQL文作成
    if($error == "") {
      $sql = "INSERT INTO cleatelog VALUES('$new_id', '$value', '$clearflag')";
      $mysql->query($sql);
    }
  }

  //変更
  if(isset($_POST["submit_upd"])) {
    $id = key($_POST[submit_upd]);

    //POSTされたデータを取得
    $value = htmlspecialchars($_POST["value"][$id], ENT_QUOTES); //追加Id
    $clearflag = htmlspecialchars($_POST["clearflag"][$id], ENT_QUOTES); //追加Id

    //全角文字を半角に変換
    $new_id = mb_convert_kana($new_id, "as");
    $value = mb_convert_kana($value, "as");
    $clearflag = mb_convert_kana($clearflag, "as");

    //SQL文作成
    if($error == "") {
      $sql = "UPDATE cleatelog SET value = '$value', clearflag = '$clearflag' WHERE id = $id";
      $mysql->query($sql);
      $error = "{$id}番のデータを変更しました";
    }
  }

  //削除
  if(isset($_POST["submit_del"])) {
    $id = key($_POST[submit_del]);
    //usersテーブルから削除
    $sql = "DELETE FROM cleatelog WHERE id = $id";
    $mysql->query($sql);
    $error = "{$id}番のデータを削除しました";
  }
}
?>
<html>
<head>
  <meta http-http-equiv="Content-type" content="text/html; charset=euc-jp">
  <title>クリエイトステージクリアログ管理画面</title>
</head>
</body>

<?php
//エラーメッセージがあれば表示
if(strlen($error) > 0) {
  echo "<font size = \"2\" color = \"#da0b00\" > {$error} </font><p>";
}
?>

<h3> クリエイトステージクリアログ管理</h3>
<form action = "<?=$_SERVER["PHP_SELF"]?>" method = "POST">
  <table border = "1" cellspacing = "0" cellpadding = "3" width = "100%" bordercolor = "#666666">
    <tr bgcolor = "#eee8aa">
      <td align = "center"><font size = "2">ユーザ番号</font></td>
      <td align = "center"><font size = "2">ステージ番号</font></td>
      <td align = "center"><font size = "2">clearflag</font></td>
    </tr>

    <?php
    //テーブルデータから読み込む
    $mysql->query("SELECT * FROM cleatelog ORDER BY id");
    while($row = $mysql->fetch()) {
      $id = $row["id"];
      $value = $row["value"];
      $clearflag = $row["clearflag"];

      echo <<<EOT
      <td align = "center">$id</td>
      <td><input type = "text" name = "value[$id]" value = "$value" size = "10"></td>
      <td><input type = "text" name = "clearflag[$id]" value = "$clearflag" size = "10"></td>
      <td><input type = "submit" name = "submit_upd[$id]" value = "変更">
      <td><input type = "submit" name = "submit_del[$id]" value = "削除"</td>
      </tr>
EOT;
    }
    ?>
    <tr>
      <td align = "center"><input = "text" name = "new_id" value = "<?=$new_id ?>" size = "5"></td>
      <td><input type = "text" name = "value" value="<?=$value ?>" size = "10"></td>
      <td><input type = "text" name = "clearflag" value="<?=$clearflag ?>" size = "10"></td>
      <td><input type = "submit" name = "submit_add" value="追加"></td>
    </tr>
  </table>
</form>
<font size = "2" color = "#556b2f">
</font>
</body>
</html>
