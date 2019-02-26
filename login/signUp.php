<?php
//新規登録処理
ini_set('display_errors', "On");

session_start(); //セッション開始

//mysqlクラスファイルの取り込み
require_once(dirname(__FILE__)."/../php/mysql2.php");

//MySQLクラスインスタンスの作成
$mysql = new MySQL;

//POSTされたデータを取得
$user_name = $_POST["UserName"];
$user_pw = $_POST["Password"];

//ユーザ名チェック
$mysql->query("SELECT * FROM users WHERE name = '$user_name'");
$row = $mysql->fetch();
if($row) {
  //ユーザIDがすでに登録されている時
  //json形式でajaxに戻す
  $res = array('name' => $user_name, 'parameters' => 1);
  echo json_encode($res);
  exit;
}

//エラーがなければ登録処理
  $sql = "INSERT INTO users VALUES('0', '$user_name', '$user_pw')";
  $mysql->query($sql);

  $mysql->query("SELECT * FROM users WHERE name = '$user_name'");
  if($mysql->rows() > 0) { //行が存在した場合
    $row = $mysql->fetch();
    if($row["password"] == $user_pw) {
      $_SESSION["my_id"] = $row["id"];
      $_SESSION["my_name"] = $row["name"];
      $_SESSION["my_login"] = 1;
    }
  }

  $id = $_SESSION["my_id"];
  //ステージクリアログ初期値
  $sql2 = "INSERT INTO stagelog VALUES('$id', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')";
  $mysql->query($sql2);
  
  //クッキーを保存する
  setcookie("puzzles[user_name]", $user_name); //ユーザIDを保存
  setcookie("puzzles[user_pw]", $user_pw); //パスワードを保存

  //json形式でajaxに戻す
  $res = array('name' => $user_name, 'parameters' => 0);
  echo json_encode($res);
  exit;
?>
