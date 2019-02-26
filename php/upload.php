<?php
// エラー表示あり
ini_set('display_errors', 1);

require_once("com_require.php");

//MySQLクラスインスタンスの作成
$mysql = new MySQL;

$stagename = $_POST['stagename'];

$puzzle = $_POST['puzzle'];

$m = $_POST['main'];
// var_dump($m);
$r = implode("_", $m[0]);
$cnt = count($m);
$array[] = $r;
for ($i = 1; $i < $cnt; $i++) {
  $y = implode("_", $m[$i]);
  $t[] = $y;
  // echo "<1>$y<1>";
  $a = array_merge($array, $t);
  $main = implode("$", $a);
}
// var_dump($main);

$dir = $_POST['dir'];
$clear = $_POST['clear'];
$B = $_POST['block'];
$block = implode("_",$B);
// $block = $_POST['block'];
$maxBlocks = $_POST['maxBlocks'];
$id = $_SESSION["my_id"];
$username = $_SESSION["my_name"];

  $sql = "INSERT INTO publicstage VALUES('$id', '$username', '$stagename', '$puzzle', '$main', '$cnt', '$dir', '$clear', '$block', '$maxBlocks')";

  $mysql->query($sql);

  echo "<div style='padding-top: 50px; padding-left:10px;'>ステージ「".$stagename."」をアップロードしたよ！</div>";
?>
