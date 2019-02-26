<?php
require_once("mysql2.php");

$mysql = new MySQL;

require_once("com_function.php");

$host = get_host();

session_start();

$error = "";
$my_id = $_SESSION["my_id"];
$my_name = $_SESSION["my_name"];
$user_id = $my_id;
$user_name = $my_name;
 ?>
