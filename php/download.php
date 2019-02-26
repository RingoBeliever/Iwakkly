<?php

ini_set('display_errors',1);

session_start();

$myid = $_SESSION["my_id"];

$clickstage = $_POST["clickstage"];
$username = $_POST["username"];
$my_login = $_POST["my_login"];

require_once("mysql2.php");

$mysql = new MySQL;

$stages = array();

  //publicstageテーブルから読み込む
  $mysql->query("SELECT * FROM publicstage WHERE username = '$username' AND stagename = '$clickstage'");
  while($row = $mysql->fetch()) {
    $id = $row["id"];
    $username = $row["username"];
    $stagename = $row["stagename"];
    // $puzzle = $row["puzzle"];
    $main = $row["main"];
    $element = $row["element"];
    $dir = $row["dir"];
    $clear = $row["clear"];
    $block= $row["block"];
    $maxBlocks = $row["maxBlocks"];

    //main配列に戻す
    $explode = explode("$", $main);
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

      //puzzleの要素の最大値取得
      $max = 0;
      $mysql->query("SELECT * FROM usersdata WHERE id = '$myid'");
        while($row2 = $mysql->fetch()) {
          $option = (int)$row2["puzzle"];
          if($max < $option) {
            $max = $option;
          }
        }
        if($max == 0) {
          $max = 20;
        }
        $max += 1;
        $puzzle = $max;

      $stagedata = array("main" => $b, "dir" => (double)$dir, "clear" => $clear, "block" => $eblock, "maxBlocks" => (int)$maxBlocks, "puzzle" => $puzzle, "username" => $username, "stagename" => $stagename);
      $stage = json_encode($stagedata);
      array_push($stages, $stage);
      $stage = array();

  }
  if($my_login == 1) {
    $cnt = count($b);
    $sql = "INSERT INTO usersdata VALUES('$myid', '$clickstage', '$puzzle', '$main', '$cnt', '$dir', '$clear', '$block', '$maxBlocks')";
    $mysql->query($sql);
  }
  // var_dump($my_login);
  $json = json_encode($stages);
  echo $json;
  // exit(0);

 ?>
