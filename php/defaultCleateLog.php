<?php

ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];

require_once("mysql2.php");

$mysql = new MySQL;

$stages = array();

  //テーブルデータから読み込む
  $mysql->query("SELECT * FROM cleatelog WHERE id = '$user'");
  $i = 0;
  while($row = $mysql->fetch()) {
    $stages[$i] = array(
      'puzzle' => $row["value"],
      'flag' => $row["clearflag"]
    );
    $i = $i + 1;
  }
  // $stages = array("stage1" => $stage1, "stage2" => $stage2, "stage3" => $stage3, "stage4" => $stage4, "stage5" => $stage5, "stage6" => $stage6, "stage7" => $stage7, "stage8" => $stage8, "stage9" => $stage9, "stage10" => $stage10, "stage11" => $stage11, "stage12" => $stage12, stage13" => $stage13, "stage14" => $stage14);
  $json = json_encode($stages);
  echo $json;
  // exit(0);

 ?>
