<?php
ini_set('display_errors', "On");
//MySQLクラス
class MySQL {
  //変数の宣言
  var $m_Con;
  var $m_HostName = "";
  var $m_UserName = "";
  var $m_Password = "";
  var $m_Rows = 0;

  //コンストラクタ
  function MySQL() {
    $filename = "/etc/mysql.ini";
    if(!file_exists($filename)) {
      die("mysql.iniファイルが存在しません。");
    } else {
      $fp = fopen($filename, "r");
      if(!$fp) {
        die("mysql.iniファイルが存在しません。");
      } else {
        $this->m_HostName=trim(fgets($fp));
        $this->m_UserName=trim(fgets($fp));
        $this->m_Password=trim(fgets($fp));
        $this->m_Database=trim(fgets($fp));
      }
      fclose($fp);
    }

    //MySQLへ接続
    $this->m_con = mysqli_connect($this->m_HostName, $this->m_UserName, $this->m_Password);
    if(!$this->m_con) {
      die("MYSQLの接続に失敗しました。");
    }

    //データベースを選択
    if(!mysqli_select_db($this->m_con, $this->m_Database)) {
      die("データベースの選択に失敗しました。DB:{$this->m_Database}");
    }

  }

  //SQLクエリの処理
  function query($sql) {
    $this->m_Rows =mysqli_query($this->m_con, $sql);
    if(!$this->m_Rows) {
      die("MySQLでエラーが発生しました。<br><b>{$sql}<?b><br>" .mysqli_errno($this->m_con).":" .mysqli_error($this->m_con));
    }
    return $this->m_Rows;
  }

  //検索結果をfetch
  function fetch() {
    return mysqli_fetch_array($this->m_Rows);
  }

  //変更された行の数を得る
  function affected_rows() {
    return mysqli_affected_rows();
  }

  //列数
  function cols() {
    return mysqli_num_fields($this->m_Rows);
  }

  //行数
  function rows() {
    return mysqli_num_rows($this->m_Rows);
  }

  function free() {
    mysqli_free_result($this->m_Rows);
  }

  //MySQLをクローズ
  function close() {
    mysqli_close($this->m_con);
  }

  //エラーメッセージ
  function errors() {
    return mysqli_errno().": ".mysqli_error();
  }

  //エラーナンバー
  function errorno() {
    return mysqli_errno();
  }
}
?>
