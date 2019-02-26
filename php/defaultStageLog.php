<?php

ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];

require_once("mysql2.php");

$mysql = new MySQL;

$stages = array();

  //テーブルデータから読み込む
  $mysql->query("SELECT * FROM stagelog WHERE id = '$user'");
  while($row = $mysql->fetch()) {
    $stages[] = array(
      'stage1' => $row["stage1"],
      'stage2' => $row["stage2"],
      'stage3' => $row["stage3"],
      'stage4' => $row["stage4"],
      'stage5' => $row["stage5"],
      'stage6' => $row["stage6"],
      'stage7' => $row["stage7"],
      'stage8' => $row["stage8"],
      'stage9' => $row["stage9"],
      'stage10' => $row["stage10"],
      'stage11' => $row["stage11"],
      'stage12' => $row["stage12"],
      'stage13' => $row["stage13"],
      'stage14' => $row["stage14"],
    );
  }
  // $stages = array("stage1" => $stage1, "stage2" => $stage2, "stage3" => $stage3, "stage4" => $stage4, "stage5" => $stage5, "stage6" => $stage6, "stage7" => $stage7, "stage8" => $stage8, "stage9" => $stage9, "stage10" => $stage10, "stage11" => $stage11, "stage12" => $stage12, stage13" => $stage13, "stage14" => $stage14);
  $json = json_encode($stages);
  echo $json;
  // exit(0);

 ?>
