<?php
ini_set('display_errors',1);
session_start();
require_once(dirname(__FILE__)."/../php/mysql2.php");
//MySQLクラスインスタンスの作成
$mysql = new MySQL;
if(strlen($_SESSION["my_name"]) == 0) {
  $usr = "ゲスト";
} else {
  $usr = $_SESSION["my_name"];
}
?>

<div id="header">
  <header>
    <p>
      <a href = "./index.php">Iwakkly</a>
    </p>
    <nav>
      <ul>
        <!-- <li><a href = "./mypage.php">マイページ</a></li> -->
        <li><a href = "./help.html" target="_new">遊び方</a></li>
        <select onChange="top.location.href=value" name="akaunt" class="akaunt">
          <option selected value="#"><?=$usr ?></option>
          <!-- <option value="#"><a href = "#">ユーザ設定</a></option> -->
          <option value="./login/logout.php"><a>ログアウト</a></option>
        </select>
        <!-- <li><a href = "#"><?=$usr ?></a></li> -->
      </ul>
    </nav>
  </header>
</div>
