<?php

ini_set('display_errors',1);

session_start();

$user = $_SESSION["my_id"];
$login = $_SESSION["my_login"];
$Value = $_POST["value"];
require_once("mysql2.php");

$mysql = new MySQL;

if($login == 1) {
$mysql->query("DELETE FROM cleatelog WHERE id=$user AND value=$Value");
}
 ?>
