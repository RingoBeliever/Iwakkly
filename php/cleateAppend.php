<?php

ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];
$login = $_SESSION["my_login"];
$clearValue = $_POST["clearValue"];
require_once("mysql2.php");

$mysql = new MySQL;

if($login == 1) {
    // $mysql->query("UPDATE INTO cleatelog SET clearflag='1' WHERE id=$user AND value=clearValue");
    $sql = "INSERT INTO cleatelog VALUES('$user', '$clearValue', '0')";
    $mysql->query($sql);
  }
 ?>
