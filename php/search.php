<?php
ini_set('display_errors',1);

session_start();

$myid = $_SESSION["my_id"];

$SearchValue = $_POST["SearchValue"];

require_once("mysql2.php");

$mysql = new MySQL;

$count = 0; //while変数
//publicstageテーブルから読み込む

// $mysql->query("SELECT DISTINCT id, username, stagename FROM publicstage WHERE id not in ('71') AND id not in ('72') ORDER BY id");
$mysql->query("SELECT DISTINCT id, username, stagename FROM publicstage WHERE id not in ('71') AND id not in ('72') AND username LIKE '%$SearchValue%' ORDER BY id");
while($row = $mysql->fetch()) {
  $id = $row["id"];
  $username = $row["username"];
  $stagename = $row["stagename"];

  if($count == 0) {
    echo "<li class='parent'>
    <a id='parentuser'>".$username."さん</a>
    <ul class='childuser'>
    <div class='area' style='width: 600px; height: 400px; background: lightblue;'>
    <li id='canvasname'>".$stagename."</li>
    <canvas class='canvassample' width='350' height='350' style='padding-left: 10px; float: left;'></canvas>
  <div class='downloadMaxBlock'></div>
    <button class='downloadButton'>ダウンロード</button>
    </div>";
    $i = $id;
    $count++;
  } else if($i == $id) {
    echo "<div class='area' style='width: 600px; height: 400px; background: lightblue;'>
    <li id='canvasname'>".$stagename."</li>
    <canvas class='canvassample' width='350' height='350' style='padding-left: 10px; float: left;'></canvas>
    <div class='downloadMaxBlock'></div>
    <button class='downloadButton'>ダウンロード</button>
    </div>";
  } else {
    echo "</ul>
    </li>
    <br>
    <li class='parent'>
    <a id='parentuser'>".$username."さん</a>
    <ul class='childuser'>
    <div class='area' style='width: 600px; height: 400px; background: lightblue;''>
    <li id='canvasname'>".$stagename."</li>
    <canvas class='canvassample' width='350' height='350' style='padding-left: 10px; float: left;'></canvas>
    <div class='downloadMaxBlock'></div>
    <button class='downloadButton'>ダウンロード</button>
    </div>";
    $i = $id;
  }
}
echo "</ul>
</li>
</ul>";
?>
