<?php
// ログイン処理
ini_set('display_errors', "On");

session_start(); //セッション開始

//mysqlクラスファイルの取り込み
require_once(dirname(__FILE__)."/../php/mysql2.php");

//MySQLクラスインスタンスの作成
$mysql = new MySQL;

//POSTされたデータを取得
$user_name = $_POST["UserName"]; //// ID
$user_pw =  $_POST["Password"]; //パスワード

//入力内容チェック
$mysql->query("SELECT * FROM users WHERE name = '$user_name'");
if($mysql->rows() > 0) { //行が存在した場合
  $row = $mysql->fetch();
  if($row["password"] == $user_pw) {
    $_SESSION["my_id"] = $row["id"];
    $_SESSION["my_name"] = $row["name"];
    $_SESSION["my_login"] = 1;
    //クッキーを保存する
    setcookie("puzzles[user_name]", $user_name); //ユーザIDを保存
    setcookie("puzzles[user_pw]", $user_pw); //パスワードを保存
    $res = array('parameters' => 0);
    echo json_encode($res);
    exit;
  }
  $res = array('parameters' => 1);
  echo json_encode($res);
  exit;
} else { //行が存在しない場合
  $res = array('parameters' => 1);
  echo json_encode($res);
  exit;
}
//クッキーを取得する（POSTでないとき）
if($_SERVER["REQUEST_METHOD"] != "POST") {
  if(isset($_COOKIE["puzzles"])) {
    $puzzles = $_COOKIE["puzzles"]; //クッキーを変数に保存
    $user_name = $puzzles["user_name"]; //ユーザIDを取得
    $user_pw = $puzzles["user_pw"]; //ユーザパスワードを取得
  }
}
?>
