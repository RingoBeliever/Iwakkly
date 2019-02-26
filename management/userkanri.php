<?php
//メンバー管理
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
$new_name = "";
$new_password = "";

//POSTされたとき
if($_SERVER["REQUEST_METHOD"] =="POST") {
  //新規追加
  if(isset($_POST["submit_add"])) {
    //POSTされたデータを取得

    //新規追加
    $new_id = htmlspecialchars($_POST["new_id"], ENT_QUOTES); //追加Id
    $new_name = htmlspecialchars($_POST["new_name"], ENT_QUOTES); //追加名前
    $new_password = htmlspecialchars($_POST["new_password"], ENT_QUOTES); //追加パスワード

    //全角文字を半角に変換
    $new_id = mb_convert_kana($new_id, "as");
    $new_name = mb_convert_kana($new_name, "as");
    $new_password = mb_convert_kana($new_password, "as");

    //名前
    if(strlen($new_name) == 0) {
      $error = "新規名前が未入力です";
    }

    //SQL文作成
    if($error == "") {
      $sql = "INSERT INTO users VALUES('$new_id', '$new_name', '$new_password')";
      $mysql->query($sql);
    }
  }

  //変更
  if(isset($_POST["submit_upd"])) {
    $id = key($_POST[submit_upd]);

    //POSTされたデータを取得
    $name = htmlspecialchars($_POST["name"][$id], ENT_QUOTES); //名前
    $password = htmlspecialchars($_POST["password"][$id], ENT_QUOTES); //パスワード

    //全角文字を半角に変換
    $new_name = mb_convert_kana($new_name, "as");
    $new_password = mb_convert_kana($new_password, "as");

    //名前
    if(strlen($name) == 0) {
      $error = "{$id}番の名前が未入力です";
    }

    //SQL文作成
    if($error == "") {
      $sql = "UPDATE users SET name = '$name', password = '$password' WHERE id = $id";
      $mysql->query($sql);
      $error = "{$id}番のデータを変更しました";
    }
  }

  //削除
  if(isset($_POST["submit_del"])) {
    $id = key($_POST[submit_del]);
    //usersテーブルから削除
    $sql = "DELETE FROM users WHERE id = $id";
    $mysql->query($sql);
    $error = "{$id}番のデータを削除しました";
  }
}
?>
<html>
<head>
  <meta http-http-equiv="Content-type" content="text/html; charset=euc-jp">
  <title>メンバー管理画面</title>
</head>
</body>

<?php
//エラーメッセージがあれば表示
if(strlen($error) > 0) {
  echo "<font size = \"2\" color = \"#da0b00\" > {$error} </font><p>";
}
?>

<h3> ユーザ管理</h3>
<form action = "<?=$_SERVER["PHP_SELF"]?>" method = "POST">
  <table border = "1" cellspacing = "0" cellpadding = "3" width = "100%" bordercolor = "#666666">
    <tr bgcolor = "#eee8aa">
      <td align = "center"><font size = "2">番号</font></td>
      <td align = "center"><font size = "2">名前</font></td>
      <td align = "center"><font size = "2">パスワード</font></td>
    </tr>

    <?php
    //テーブルデータから読み込む
    $mysql->query("SELECT * FROM users ORDER BY id");
    while($row = $mysql->fetch()) {
      $id = $row["id"];
      $name = $row["name"];
      $password = $row["password"];

      echo <<<EOT
      <td align = "center">$id</td>
      <td><input type = "text" name = "name[$id]" value = "$name" size = "10"></td>
      <td><input type = "text" name = "password[$id]" value = "$password" size = "10"></td>
      <td><input type = "submit" name = "submit_upd[$id]" value = "変更">
      <td><input type = "submit" name = "submit_del[$id]" value = "削除"</td>
      </tr>
EOT;
    }
    ?>
    <tr>
      <td align = "center"><input = "text" name = "new_id" value = "<?=$new_id ?>" size = "5"></td>
      <td><input type = "text" name = "new_name" value="<?=$new_name ?>" size = "10"></td>
      <td><input type = "text" name = "new_password" value="<?=$new_password ?>" size = "10"></td>
      <td><input type = "submit" name = "submit_add" value="追加"></td>
    </tr>
  </table>
</form>
<font size = "2" color = "#556b2f">
</font>
</body>
</html>
