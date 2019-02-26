<?php
require_once(dirname(__FILE__)."/../php/com_function.php");
$host = get_host();
// session初期化
session_start();
$_SESSION["my_id"] = 0;
$_SESSION["my_name"] = "";
$_SESSION["my_login"] = 0;
header("Location: http://$host/../index.php");
?>
