<?php
//ホストアドレスを取得
function get_host() {
  $str = $_SERVER["HTTP_HOST"];
  $str.=rtrim(dirname($_SERVER["PHP_SELF"]), "/\\");
  return $str;
}
 ?>
