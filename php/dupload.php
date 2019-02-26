<?php

ini_set('display_errors',1);

session_start();

$myid = $_SESSION["my_id"];

$clickstage = $_POST["clickstage"];
$userid = $_SESSION["my_id"];
// echo "$userid";

require_once("mysql2.php");

$mysql = new MySQL;

$stages = array();

  //publicstageテーブルから読み込む
  $mysql->query("DELETE FROM publicstage WHERE id = $userid AND stagename = '$clickstage'");
  echo "$clickstage";

 ?>
