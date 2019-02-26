<?php
ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];
$username = $_SESSION["my_name"];

require_once("mysql2.php");

$mysql = new MySQL;

$stagename = $_POST['stagename'];
$storageflag = $_POST['storageFlag'];

if($storageflag == 1) {
  $mysql->query("SELECT * FROM usersdata WHERE id = '$user'");
  while($row = $mysql->fetch()) {
    // $id = $row["id"];
    $sn = $row["stagename"];
    if($stagename == $sn) {
      echo "false";
      exit;
    }
  }
  echo "true";
} else {
//テーブルデータidを指定して読み込む
$mysql->query("SELECT * FROM publicstage WHERE id = '$user'");
while($row = $mysql->fetch()) {
  // $id = $row["id"];
  $sn = $row["stagename"];
  if($stagename == $sn) {
    echo "false";
    exit;
  }
}
echo "true";
}
?>
