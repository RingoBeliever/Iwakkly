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
$stage1 = "";
$stage2 = "";
$stage3 = "";
$stage4 = "";
$stage5 = "";
$stage6 = "";
$stage7 = "";
$stage8 = "";
$stage9 = "";
$stage10 = "";
$stage11 = "";
$stage12 = "";
$stage13 = "";
$stage14 = "";

//POSTされたとき
if($_SERVER["REQUEST_METHOD"] =="POST") {
  //新規追加
  if(isset($_POST["submit_add"])) {
    //POSTされたデータを取得

    //新規追加
    $new_id = htmlspecialchars($_POST["new_id"], ENT_QUOTES); //追加Id
    $stage1 = htmlspecialchars($_POST["stage1"], ENT_QUOTES); //追加Id
    $stage2 = htmlspecialchars($_POST["stage2"], ENT_QUOTES); //追加Id
    $stage3 = htmlspecialchars($_POST["stage3"], ENT_QUOTES); //追加Id
    $stage4 = htmlspecialchars($_POST["stage4"], ENT_QUOTES); //追加Id
    $stage5 = htmlspecialchars($_POST["stage5"], ENT_QUOTES); //追加Id
    $stage6 = htmlspecialchars($_POST["stage6"], ENT_QUOTES); //追加Id
    $stage7 = htmlspecialchars($_POST["stage7"], ENT_QUOTES); //追加Id
    $stage8 = htmlspecialchars($_POST["stage8"], ENT_QUOTES); //追加Id
    $stage9 = htmlspecialchars($_POST["stage9"], ENT_QUOTES); //追加Id
    $stage10 = htmlspecialchars($_POST["stage10"], ENT_QUOTES); //追加Id
    $stage11 = htmlspecialchars($_POST["stage11"], ENT_QUOTES); //追加Id
    $stage12 = htmlspecialchars($_POST["stage12"], ENT_QUOTES); //追加Id
    $stage13 = htmlspecialchars($_POST["stage13"], ENT_QUOTES); //追加Id
    $stage14 = htmlspecialchars($_POST["stage14"], ENT_QUOTES); //追加Id

    //全角文字を半角に変換
    $new_id = mb_convert_kana($new_id, "as");
    $stage1 = mb_convert_kana($stage1, "as");
    $stage2 = mb_convert_kana($stage2, "as");
    $stage3 = mb_convert_kana($stage3, "as");
    $stage4 = mb_convert_kana($stage4, "as");
    $stage5 = mb_convert_kana($stage5, "as");
    $stage6 = mb_convert_kana($stage6, "as");
    $stage7 = mb_convert_kana($stage7, "as");
    $stage8 = mb_convert_kana($stage8, "as");
    $stage9 = mb_convert_kana($stage9, "as");
    $stage10 = mb_convert_kana($stage10, "as");
    $stage11 = mb_convert_kana($stage11, "as");
    $stage12 = mb_convert_kana($stage12, "as");
    $stage13 = mb_convert_kana($stage13, "as");
    $stage14 = mb_convert_kana($stage14, "as");

    //SQL文作成
    if($error == "") {
      $sql = "INSERT INTO stagelog VALUES('$new_id', '$stage1', '$stage2', '$stage3', '$stage4', '$stage5', '$stage6', '$stage7', '$stage8', '$stage9', '$stage10', '$stage11', '$stage12', '$stage13', '$stage14')";
      $mysql->query($sql);
    }
  }

  //変更
  if(isset($_POST["submit_upd"])) {
    $id = key($_POST[submit_upd]);

    //POSTされたデータを取得
    $stage1 = htmlspecialchars($_POST["stage1"][$id], ENT_QUOTES); //追加Id
    $stage2 = htmlspecialchars($_POST["stage2"][$id], ENT_QUOTES); //追加Id
    $stage3 = htmlspecialchars($_POST["stage3"][$id], ENT_QUOTES); //追加Id
    $stage4 = htmlspecialchars($_POST["stage4"][$id], ENT_QUOTES); //追加Id
    $stage5 = htmlspecialchars($_POST["stage5"][$id], ENT_QUOTES); //追加Id
    $stage6 = htmlspecialchars($_POST["stage6"][$id], ENT_QUOTES); //追加Id
    $stage7 = htmlspecialchars($_POST["stage7"][$id], ENT_QUOTES); //追加Id
    $stage8 = htmlspecialchars($_POST["stage8"][$id], ENT_QUOTES); //追加Id
    $stage9 = htmlspecialchars($_POST["stage9"][$id], ENT_QUOTES); //追加Id
    $stage10 = htmlspecialchars($_POST["stage10"][$id], ENT_QUOTES); //追加Id
    $stage11 = htmlspecialchars($_POST["stage11"][$id], ENT_QUOTES); //追加Id
    $stage12 = htmlspecialchars($_POST["stage12"][$id], ENT_QUOTES); //追加Id
    $stage13 = htmlspecialchars($_POST["stage13"][$id], ENT_QUOTES); //追加Id
    $stage14 = htmlspecialchars($_POST["stage14"][$id], ENT_QUOTES); //追加Id


    //全角文字を半角に変換
    $new_id = mb_convert_kana($new_id, "as");
    $stage1 = mb_convert_kana($stage1, "as");
    $stage2 = mb_convert_kana($stage2, "as");
    $stage3 = mb_convert_kana($stage3, "as");
    $stage4 = mb_convert_kana($stage4, "as");
    $stage5 = mb_convert_kana($stage5, "as");
    $stage6 = mb_convert_kana($stage6, "as");
    $stage7 = mb_convert_kana($stage7, "as");
    $stage8 = mb_convert_kana($stage8, "as");
    $stage9 = mb_convert_kana($stage9, "as");
    $stage10 = mb_convert_kana($stage10, "as");
    $stage11 = mb_convert_kana($stage11, "as");
    $stage12 = mb_convert_kana($stage12, "as");
    $stage13 = mb_convert_kana($stage13, "as");
    $stage14 = mb_convert_kana($stage14, "as");

    //SQL文作成
    if($error == "") {
      $sql = "UPDATE stagelog SET stage1 = '$stage1', stage2 = '$stage2', stage3 = '$stage3', stage4 = '$stage4', stage5 = '$stage5', stage6 = '$stage6', stage7 = '$stage7', stage8 = '$stage8', stage9 = '$stage9', stage10 = '$stage10', stage11 = '$stage11', stage12 = '$stage12', stage13 = '$stage14' WHERE id = $id";
      $mysql->query($sql);
      $error = "{$id}番のデータを変更しました";
    }
  }

  //削除
  if(isset($_POST["submit_del"])) {
    $id = key($_POST[submit_del]);
    //usersテーブルから削除
    $sql = "DELETE FROM stagelog WHERE id = $id";
    $mysql->query($sql);
    $error = "{$id}番のデータを削除しました";
  }
}
?>
<html>
<head>
  <meta http-http-equiv="Content-type" content="text/html; charset=euc-jp">
  <title>ステージクリアログ管理画面</title>
</head>
</body>

<?php
//エラーメッセージがあれば表示
if(strlen($error) > 0) {
  echo "<font size = \"2\" color = \"#da0b00\" > {$error} </font><p>";
}
?>

<h3> ステージクリアログ管理</h3>
<form action = "<?=$_SERVER["PHP_SELF"]?>" method = "POST">
  <table border = "1" cellspacing = "0" cellpadding = "3" width = "100%" bordercolor = "#666666">
    <tr bgcolor = "#eee8aa">
      <td align = "center"><font size = "2">ユーザ番号</font></td>
      <td align = "center"><font size = "2">ステージ1</font></td>
      <td align = "center"><font size = "2">ステージ2</font></td>
      <td align = "center"><font size = "2">ステージ3</font></td>
      <td align = "center"><font size = "2">ステージ4</font></td>
      <td align = "center"><font size = "2">ステージ5</font></td>
      <td align = "center"><font size = "2">ステージ6</font></td>
      <td align = "center"><font size = "2">ステージ7</font></td>
      <td align = "center"><font size = "2">ステージ8</font></td>
      <td align = "center"><font size = "2">ステージ9</font></td>
      <td align = "center"><font size = "2">ステージ10</font></td>
      <td align = "center"><font size = "2">ステージ11</font></td>
      <td align = "center"><font size = "2">ステージ12</font></td>
      <td align = "center"><font size = "2">ステージ13</font></td>
      <td align = "center"><font size = "2">ステージ14</font></td>
    </tr>

    <?php
    //テーブルデータから読み込む
    $mysql->query("SELECT * FROM stagelog ORDER BY id");
    while($row = $mysql->fetch()) {
      $id = $row["id"];
      $stage1 = $row["stage1"];
      $stage2 = $row["stage2"];
      $stage3 = $row["stage3"];
      $stage4 = $row["stage4"];
      $stage5 = $row["stage5"];
      $stage6 = $row["stage6"];
      $stage7 = $row["stage7"];
      $stage8 = $row["stage8"];
      $stage9 = $row["stage9"];
      $stage10 = $row["stage10"];
      $stage11 = $row["stage11"];
      $stage12 = $row["stage12"];
      $stage13 = $row["stage13"];
      $stage14 = $row["stage14"];

      echo <<<EOT
      <td align = "center">$id</td>
      <td><input type = "text" name = "stage1[$id]" value = "$stage1" size = "10"></td>
      <td><input type = "text" name = "stage2[$id]" value = "$stage2" size = "10"></td>
      <td><input type = "text" name = "stage3[$id]" value = "$stage3" size = "10"></td>
      <td><input type = "text" name = "stage4[$id]" value = "$stage4" size = "10"></td>
      <td><input type = "text" name = "stage5[$id]" value = "$stage5" size = "10"></td>
      <td><input type = "text" name = "stage6[$id]" value = "$stage6" size = "10"></td>
      <td><input type = "text" name = "stage7[$id]" value = "$stage7" size = "10"></td>
      <td><input type = "text" name = "stage8[$id]" value = "$stage8" size = "10"></td>
      <td><input type = "text" name = "stage9[$id]" value = "$stage9" size = "10"></td>
      <td><input type = "text" name = "stage10[$id]" value = "$stage10" size = "10"></td>
      <td><input type = "text" name = "stage11[$id]" value = "$stage11" size = "10"></td>
      <td><input type = "text" name = "stage12[$id]" value = "$stage12" size = "10"></td>
      <td><input type = "text" name = "stage13[$id]" value = "$stage13" size = "10"></td>
      <td><input type = "text" name = "stage14[$id]" value = "$stage14" size = "10"></td>
      <td><input type = "submit" name = "submit_upd[$id]" value = "変更">
      <td><input type = "submit" name = "submit_del[$id]" value = "削除"</td>
      </tr>
EOT;
    }
    ?>
    <tr>
      <td align = "center"><input = "text" name = "new_id" value = "<?=$new_id ?>" size = "5"></td>
      <td><input type = "text" name = "stage1" value="<?=$stage1 ?>" size = "10"></td>
      <td><input type = "text" name = "stage2" value="<?=$stage2 ?>" size = "10"></td>
      <td><input type = "text" name = "stage3" value="<?=$stage3 ?>" size = "10"></td>
      <td><input type = "text" name = "stage4" value="<?=$stage4 ?>" size = "10"></td>
      <td><input type = "text" name = "stage5" value="<?=$stage5 ?>" size = "10"></td>
      <td><input type = "text" name = "stage6" value="<?=$stage6 ?>" size = "10"></td>
      <td><input type = "text" name = "stage7" value="<?=$stage7 ?>" size = "10"></td>
      <td><input type = "text" name = "stage8" value="<?=$stage8 ?>" size = "10"></td>
      <td><input type = "text" name = "stage9" value="<?=$stage9 ?>" size = "10"></td>
      <td><input type = "text" name = "stage10" value="<?=$stage10 ?>" size = "10"></td>
      <td><input type = "text" name = "stage11" value="<?=$stage11 ?>" size = "10"></td>
      <td><input type = "text" name = "stage12" value="<?=$stage12 ?>" size = "10"></td>
      <td><input type = "text" name = "stage13" value="<?=$stage13 ?>" size = "10"></td>
      <td><input type = "text" name = "stage14" value="<?=$stage14 ?>" size = "10"></td>
      <td><input type = "submit" name = "submit_add" value="追加"></td>
    </tr>
  </table>
</form>
<font size = "2" color = "#556b2f">
</font>
</body>
</html>
