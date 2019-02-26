<?php

ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];
$login = $_SESSION["my_login"];
$clearValue = $_POST["clearValue"];
require_once("mysql2.php");

$mysql = new MySQL;

if($login == 1) {
  if($clearValue == 7) {
    $mysql->query("UPDATE stagelog SET stage1='1' WHERE id=$user");
  } else if($clearValue == 8) {
    $mysql->query("UPDATE stagelog SET stage2='1' WHERE id=$user");
  } else if($clearValue == 9) {
    $mysql->query("UPDATE stagelog SET stage3='1' WHERE id=$user");
  } else if($clearValue == 10) {
    $mysql->query("UPDATE stagelog SET stage4='1' WHERE id=$user");
  } else if($clearValue == 11) {
    $mysql->query("UPDATE stagelog SET stage5='1' WHERE id=$user");
  } else if($clearValue == 12) {
    $mysql->query("UPDATE stagelog SET stage6='1' WHERE id=$user");
  } else if($clearValue == 13) {
    $mysql->query("UPDATE stagelog SET stage7='1' WHERE id=$user");
  } else if($clearValue == 14) {
    $mysql->query("UPDATE stagelog SET stage8='1' WHERE id=$user");
  } else if($clearValue == 15) {
    $mysql->query("UPDATE stagelog SET stage9='1' WHERE id=$user");
  } else if($clearValue == 16) {
    $mysql->query("UPDATE stagelog SET stage10='1' WHERE id=$user");
  } else if($clearValue == 17) {
    $mysql->query("UPDATE stagelog SET stage11='1' WHERE id=$user");
  } else if($clearValue == 18) {
    $mysql->query("UPDATE stagelog SET stage12='1' WHERE id=$user");
  } else if($clearValue == 19) {
    $mysql->query("UPDATE stagelog SET stage13='1' WHERE id=$user");
  } else if($clearValue == 20) {
    $mysql->query("UPDATE stagelog SET stage14='1' WHERE id=$user");
  }
}
 ?>
