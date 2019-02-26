<?php
//publicstage管理
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
$new_username = "";
$new_stagename = "";
$new_puzzle = "";
$new_main = "";
$new_element = "";
$new_dir = "";
$new_clear = "";
$new_block = "";
$new_maxBlocks = "";

//POSTされたとき
if($_SERVER["REQUEST_METHOD"] =="POST") {
  //新規追加
  if(isset($_POST["submit_add"])) {
    //POSTされたデータを取得

    //新規追加
    $new_id = htmlspecialchars($_POST["new_id"], ENT_QUOTES); //追加Id
    $new_username = htmlspecialchars($_POST["new_username"], ENT_QUOTES); //追加Id
    $new_stagename = htmlspecialchars($_POST["new_stagename"], ENT_QUOTES); //追加Id
    $new_puzzle = htmlspecialchars($_POST["new_puzzle"], ENT_QUOTES); //追加Id
    $new_main = htmlspecialchars($_POST["new_main"], ENT_QUOTES); //追加Id
    $new_element = htmlspecialchars($_POST["new_element"], ENT_QUOTES); //追加Id
    $new_dir = htmlspecialchars($_POST["new_dir"], ENT_QUOTES); //追加Id
    $new_clear = htmlspecialchars($_POST["new_clear"], ENT_QUOTES); //追加Id
    $new_block = htmlspecialchars($_POST["new_block"], ENT_QUOTES); //追加Id
    $new_maxBlocks = htmlspecialchars($_POST["new_maxBlocks"], ENT_QUOTES); //追加Id

    //全角文字を半角に変換
    $new_id = mb_convert_kana($new_id, "as");
    $new_username = mb_convert_kana($new_username, "as");
    $new_stagename = mb_convert_kana($new_stagename, "as");
    $new_puzzle = mb_convert_kana($new_puzzle, "as");
    $new_main = mb_convert_kana($new_main, "as");
    $new_element = mb_convert_kana($new_element, "as");
    $new_dir = mb_convert_kana($new_dir, "as");
    $new_clear = mb_convert_kana($new_clear, "as");
    $new_block = mb_convert_kana($new_block, "as");
    $new_maxBlocks = mb_convert_kana($new_maxBlocks, "as");

    //SQL文作成
    if($error == "") {
      $sql = "INSERT INTO publicstage VALUES('$new_id', '$new_username', '$new_stagename', '$new_puzzle', '$new_main', '$new_element', '$new_dir', '$new_clear', '$new_block', '$new_maxBlocks')";
      $mysql->query($sql);
    }
  }

  //変更
  if(isset($_POST["submit_upd"])) {
    $id = key($_POST[submit_upd]);

    //POSTされたデータを取得
    $username = htmlspecialchars($_POST["username"][$id], ENT_QUOTES);
    $stagename = htmlspecialchars($_POST["stagename"][$id], ENT_QUOTES);
    $puzzle = htmlspecialchars($_POST["puzzle"][$id], ENT_QUOTES);
    $main = htmlspecialchars($_POST["main"][$id], ENT_QUOTES); //名前
    $element = htmlspecialchars($_POST["element"][$id], ENT_QUOTES);
    $dir = htmlspecialchars($_POST["dir"][$id], ENT_QUOTES); //パスワード
    $clear = htmlspecialchars($_POST["clear"][$id], ENT_QUOTES);
    $block = htmlspecialchars($_POST["block"][$id], ENT_QUOTES);
    $maxBlocks = htmlspecialchars($_POST["maxBlocks"][$id], ENT_QUOTES);

    //全角文字を半角に変換
    $new_id = mb_convert_kana($new_id, "as");
    $new_username = mb_convert_kana($new_username, "as");
    $new_stagename = mb_convert_kana($new_stagename, "as");
    $new_puzzle = mb_convert_kana($new_puzzle, "as");
    $new_main = mb_convert_kana($new_main, "as");
    $new_element = mb_convert_kana($new_element, "as");
    $new_dir = mb_convert_kana($new_dir, "as");
    $new_clear = mb_convert_kana($new_clear, "as");
    $new_block = mb_convert_kana($new_block, "as");
    $new_maxBlocks = mb_convert_kana($new_maxBlocks, "as");

    //SQL文作成
    if($error == "") {
      $sql = "UPDATE publicstage SET stagename = '$stagename', puzzle = '$puzzle', main = '$main', element = '$element', dir = '$dir', clear = '$clear', block = '$block', maxBlocks = '$maxBlocks' WHERE id = $id AND username = $username";
      $mysql->query($sql);
      $error = "{$id}番のデータを変更しました";
    }
  }

  //削除
  if(isset($_POST["submit_del"])) {
    $id = key($_POST[submit_del]);
    //usersテーブルから削除
    $sql = "DELETE FROM publicstage WHERE id = $id";
    $mysql->query($sql);
    $error = "{$id}番のデータを削除しました";
  }
}
?>
<html>
<head>
  <meta http-http-equiv="Content-type" content="text/html; charset=euc-jp">
  <title>共有データ管理画面</title>
</head>
</body>

<?php
//エラーメッセージがあれば表示
if(strlen($error) > 0) {
  echo "<font size = \"2\" color = \"#da0b00\" > {$error} </font><p>";
}
?>

<h3> 共有データ管理</h3>
<form action = "<?=$_SERVER["PHP_SELF"]?>" method = "POST">
  <table border = "1" cellspacing = "0" cellpadding = "3" width = "100%" bordercolor = "#666666">
    <tr bgcolor = "#eee8aa">
      <td align = "center"><font size = "2">ユーザ番号</font></td>
      <td align = "center"><font size = "2">username</font></td>
      <td align = "center"><font size = "2">stagename</font></td>
      <td align = "center"><font size = "2">puzzle</font></td>
      <td align = "center"><font size = "2">main</font></td>
      <td align = "center"><font size = "2">element</font></td>
      <td align = "center"><font size = "2">dir</font></td>
      <td align = "center"><font size = "2">clear</font></td>
      <td align = "center"><font size = "2">block</font></td>
      <td align = "center"><font size = "2">maxBlocks</font></td>
      <!-- <td><font size = "2"> </font></td> -->
    </tr>
    <?php
    //テーブルデータから読み込む
    $mysql->query("SELECT * FROM publicstage ORDER BY id");
    while($row = $mysql->fetch()) {
      $id = $row["id"];
      $username = $row["username"];
      $stagename = $row["stagename"];
      $puzzle = $row["puzzle"];
      $main = $row["main"];
      $element = $row["element"];
      $dir = $row["dir"];
      $clear = $row["clear"];
      $block= $row["block"];
      $maxBlocks = $row["maxBlocks"];

      echo <<<EOT
      <td align = "center">$id</td>
      <td><input type = "text" name = "username[$id]" value = "$username" size = "10"></td>
      <td><input type = "text" name = "stagename[$id]" value = "$stagename" size = "10"></td>
      <td><input type = "text" name = "puzzle[$id]" value = "$puzzle" size = "10"></td>
      <td><input type = "text" name = "main[$id]" value = "$main" size = "10"></td>
      <td><input type = "text" name = "element[$id]" value = "$element" size = "10"></td>
      <td><input type = "text" name = "dir[$id]" value = "$dir" size = "10"></td>
      <td><input type = "text" name = "clear[$id]" value = "$clear" size = "10"></td>
      <td><input type = "text" name = "block[$id]" value = "$block" size = "10"></td>
      <td><input type = "text" name = "maxBlocks[$id]" value = "$maxBlocks" size = "10"></td>
      <td><input type = "submit" name = "submit_upd[$id]" value = "変更">
      <td><input type = "submit" name = "submit_del[$id]" value = "削除"</td>
      </tr>
EOT;
    }
    ?>
    <tr>
      <td align = "center"><input = "text" name = "new_id" value = "<?=$new_id ?>" size = "5"></td>
      <td><input type = "text" name = "new_username" value="<?=$new_username ?>" size = "10"></td>
      <td><input type = "text" name = "new_stagename" value="<?=$new_stagename ?>" size = "10"></td>
      <td><input type = "text" name = "new_puzzle" value="<?=$new_puzzle ?>" size = "10"></td>
      <td><input type = "text" name = "new_main" value="<?=$new_main ?>" size = "10"></td>
      <td><input type = "text" name = "new_element" value="<?=$new_element ?>" size = "10"></td>
      <td><input type = "text" name = "new_dir" value="<?=$new_dir ?>" size = "10"></td>
      <td><input type = "text" name = "new_clear" value="<?=$new_clear ?>" size = "10"></td>
      <td><input type = "text" name = "new_block" value="<?=$new_block ?>" size = "10"></td>
      <td><input type = "text" name = "new_maxBlocks" value="<?=$new_maxBlocks ?>" size = "10"></td>
      <td><input type = "submit" name = "submit_add" value="追加"></td>
    </tr>
  </table>
</form>
<font size = "2" color = "#556b2f">
</font>
</body>
</html>
