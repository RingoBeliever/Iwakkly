<?php

ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];

require_once("mysql2.php");

$mysql = new MySQL;

$stages = array();

  //テーブルデータから読み込む
  $mysql->query("SELECT * FROM usersdata WHERE id = '$user'");
  while($row = $mysql->fetch()) {
    $id = $row["id"];
    $stagename = $row["stagename"];
    $puzzle = $row["puzzle"];
    $main = $row["main"];
    $element = $row["element"];
    $dir = $row["dir"];
    $clear = $row["clear"];
    $block= $row["block"];
    $maxBlocks = $row["maxBlocks"];

    $explode = explode("$", $main);
    // var_dump(json_encode($explode));
    $kai = explode("_", $explode[0]);
      $rray = array_map(function($value) {return (int)$value; },
      $kai);
      $don = [];
      $intarray = [];
      $don[] = $rray;
      for ($i = 1; $i < $element; $i++) {
        $iarray = explode("_", $explode[$i]);
          $harray = array_map(function($value) {return (int)$value; },
          $iarray);
          $intarray[] = $harray;
          $b = array_merge($don , $intarray);
      }

      $eblock = explode("_", $block);


      $stagedata = array("main" => $b, "dir" => (double)$dir, "clear" => $clear, "block" => $eblock, "maxBlocks" => (int)$maxBlocks, "puzzle" => (int)$puzzle, "stagename" => $stagename);
      $stage = json_encode($stagedata);
      array_push($stages, $stage);
      $stage = array();

  }
  $json = json_encode($stages);
  echo $json;
  // exit(0);

 ?>
