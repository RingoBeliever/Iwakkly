<?php

ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];

require_once("mysql2.php");

$mysql = new MySQL;

$puzzle = $_POST['item'];

  //テーブルデータから読み込む
  $mysql->query("DELETE FROM usersdata WHERE id = $user AND puzzle = $puzzle");

echo "クリエイト'$puzzle - 20'を削除しました";
 ?>
