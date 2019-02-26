<?php
// session初期化
session_start();
$_SESSION["my_id"] = 0;
$_SESSION["my_name"] = "";
$_SESSION["my_login"] = 0;
?>

<!-- <!DOCTYPE html> -->
<html>
<head>
  <meta charset="utf-8">
  <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <!-- <link rel="stylesheet" type="text/css" href="css/home.css"> -->
  <link rel="stylesheet" type="text/css" href="css/test.css">
  <title>Iwakkly</title>
</head>
<body>
  <div class="bodyall">
    <div class="all">
      <p id="title">Iwakkly</p>
      <table style="border-spacing: 25px 0px; width: 900px; text-align: center;">
        <tr>
          <td>
            <a href = "./game.php">遊ぶ</a>
          </td>
          <td>
            <a href = "./help.html" target="_new">遊び方</a>
          </td>
          <td>
            <a href = "#" id="SignUp">Iwakklyにとうろくする</a>
          </td>
          <td>
            <a href = "#" id="Login">ログイン</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <!-- <header> -->
    <!-- <p>
      <a href = "#">Iwakkly</a>
    </p>
    <nav>
      <ul>
        <li><a href = "./game.php">遊ぶ</a></li>
        <li><a href = "./help.html" target="_blank">遊び方</a></li>
        <li id="SignUp"><a>Iwakklyにとうろくしよう</a></li>
        <li id="Login"><a>ログイン</a></li>
      </ul>
    </nav> -->

    <!-- 新規登録ダイアログエリア -->
    <div id="SignUpDialog" title="Iwakklyにとうろくしよう！！！">
      <table border="0" cellspacing="3" style="width:100%; padding-top: 30px; padding-left: 20px;">
        <tr>
          <font size="3" color="#556b2f">ユーザIDとパスワードには、<ruby><rb>氏名</rb><rp>(</rp><rt>しめい</rt><rp>)</rp></ruby>や<ruby><rb>電話番号</rb><rp>(</rp><rt>でんわばんごう</rt><rp>)</rp></ruby>などの<ruby><rb>個人情報</rb>
            <rp>(</rp><rt>こじんじょうほう</rt><rp>)</rp></ruby>を入力しないでください。</font>
        </tr>
        <tr>
          <td align="center" bgcolor="#3cb371" style="width: 180px;">
            <font size="3" color="#fff">ユーザID<br>[ニックネーム]</font>
          </td>
          <td style="width: 180px;">
            <input id="SignUpUserName" value = ""size="10">
          </td>
          <td style="width: 180px;">
            <font size="3" color="#556b2f">10文字以内で<br>入力してね</font>
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#3cb371" style="width: 180px;">
            <font size="3" color="#fff">パスワード</font>
          </td>
          <td style="width: 180px;">
            <input id="SignUpPassword" value = ""size="10">
          </td>
          <td style="width: 180px;">
            <font size="3" color="#556b2f">10文字以内の英数字で入力してね</font>
          </td>
        </tr>
      </table>
      <!-- メッセージエリア -->
      <div id="SignUpMessage" style="height:40px; padding-left:20px;"></div>
    </div>

    <!-- ログインダイアログエリア -->
    <div id="LoginDialog" title="ログイン">
      <font size="3" color="#556b2f" style="padding-left:20px; padding-top:30px;">IDとパスワードを入れてログインしてね<br></font>
      <table border = "0" cellspacing="3" style="width:100%; padding-left:20px;">
        <tr>
          <td align="center" bgcolor="#3cb371">
            <font size = "3" color="#fff">ユーザID</font>
          </td>
          <td>
            <input id="LoginUserName" value = "" size="10">
          </td>
        </tr>
        <tr>
          <td align="center" bgcolor="#3cb371">
            <font size = "3" color="#fff">パスワード</font>
          </td>
          <td>
            <input id="LoginPassword" value="" size = "10">
          </td>
        </tr>
      </table>
      <!-- メッセージエリア -->
      <div id="LoginMessage" style="height:40px; padding-left:20px;"></div>
      <!-- 新規とうろくボタン -->
      <font size="3" color="#556b2f" style="padding-left:20px;">とうろくがまだの方へ</font>
      <br>
      <input id="LoginSignUp" type="submit" name="touroku" value="Iwakklyにとうろくする" style="margin-left:20px;">
    </div>
  <!-- </header> -->

  <!-- <div id="rect">
  <img src="picture/imgRunningMan.png" alt="RunningMan" width="300px" height="300px">
</div> -->

  <script>
  $(function(){

    //新規登録ボタンクリック
    $("#SignUp").click(function(){
      // ダイアログを表示する
      $("#SignUpDialog").dialog("open");
    });
    //新規登録ダイアログ
    $("#SignUpDialog").dialog({
      autoOpen: false,
      modal: true,
      width: 550,
      height:400,
      //クローズイベント発生時、入力値とエラーメッセージを空にする
      close: function(event) {
        $("#SignUpMessage").empty();
        $("#SignUpUserName").val("");
        $("#SignUpPassword").val("");
      },
      buttons: {
        //登録ボタンが押された時
        "とうろくする": function() {
          console.log(3);
          //名前が入力されていない時
          if($("#SignUpUserName").val() == 0) {
            SignUpMessage("名前が入力されていないよ");
          }
          //パスワードが入力されていない時
          else if($("#SignUpPassword").val() == 0) {
            SignUpMessage("パスワードが入力されていないよ");
          }
          else if(!$("#SignUpPassword").val().match(/^[A-Za-z0-9]*$/)){
            console.log(1);
            SignUpMessage("パスワードがちゃう");
          }

          //ユーザIDチェック
          else if($("#SignUpUserName").val() > 10) {
            SignUpMessage("ユーザIDは10けたまでだよ");
          }
          else {
            //同じ名前がmysql上に存在しないか確認
            $.ajax({
              type: "POST",
              url: "./login/signUp.php",
              data: {"UserName": $("#SignUpUserName").val(),
              "Password": $("#SignUpPassword").val()
            }
          })
          .done(function (done) {
            console.log(done);
            let responce = JSON.parse(done);
            // console.log(parameters);
            //成功時
            if(responce.parameters == 0) {
              //ダイアログを閉じる
              $("#SignUpDialog").dialog("close");
              $("#SignUpMessage").empty();
              $("#SignUpUserName").val("");
              $("#SignUpPassword").val("");
              //ダイアログを開いて登録したのメッセージからのオッケーボタンが押されたらマイページに移動するダイアログを閉じる
              MyPageDialog({title:"Iwakklyにようこそ！",
              body:"<div style='text-align: center;'>" + responce.name + "さんとうろくありがとうございます。<br>ゲーム画面にいどうします。</div>",
              close: function(){
                console.log("確認ダイアログを閉じました。")
                //mypageにジャンプ
                window.location.href = "./game.php";
              }});
            } else if(responce.parameters == 1) {
              console.log(3);
              //名前が存在した時
              SignUpMessage("「" + responce.name + "」はすでに使われているよ");
              $("#SignUpPassword").val("");
            }
          })
          //ajax失敗
          .fail(function() {
            console.log("fail");
          });
        }
      },
      //キャンセルボタンが押された時
      "キャンセル": function() {
        $(this).dialog("close");
        $("#SignUpMessage").empty();
        $("#SignUpUserName").val("");
        $("#SignUpPassword").val("");
      }
    }
  });
  function SignUpMessage(str) {
    $("#SignUpMessage").html(str);
    $("#SignUpMessage").css("color", "red");
  }
  //ページ遷移ダイアログ（新規登録のみ）
  function MyPageDialog(_options){
    var default_option = {
      title:"",
      body:"",
      close:function(){ return true; }
    }
    var options = $.extend(default_option , _options, {});
    var dom = $("<div />", { title: options.title, html: options.body });
    dom.dialog({
      modal: true,
      width: 500,
      height:400,
      close: function(){
        var dom = $(this);
        dom.dialog("destroy");
        dom.remove();
        options.close();
      },
      buttons: [
        {
          text: "Ok",
          click: function() {
            $(this).dialog("close");
          }
        }
      ]
    });
  };

  //ログインボタンクリック
  $("#Login").click(function(){
    // ダイアログを表示する
    $("#LoginDialog").dialog("open");
  });
  //ログインダイアログ
  $("#LoginDialog").dialog({
    autoOpen: false,
    modal: true,
    width: 500,
    height:400,
    //クローズイベント発生時、入力値とエラーメッセージを空にする
    close: function(event) {
      $("#LoginMessage").empty();
      $("#LoginUserName").val("");
      $("#LoginPassword").val("");
    },
    buttons: {
      //ログインボタンが押された時
      "ログイン": function() {
        console.log(3);
        //名前が入力されていない時
        if($("#LoginUserName").val() == 0) {
          LoginMessage("名前が入力されていないよ");
        }
        //パスワードが入力されていない時
        else if($("#LoginPassword").val() == 0) {
          LoginMessage("パスワードが入力されていないよ");
        }
        else {
          //同じ名前がmysql上に存在しないか確認
          $.ajax({
            type: "POST",
            url: "./login/signIn.php",
            data: {UserName: $("#LoginUserName").val(),
            Password: $("#LoginPassword").val()
          }
        })
        .done(function (done) {
          console.log(done);
          let responce = JSON.parse(done);
          //成功時
          if(responce.parameters == 0) {
            //ダイアログを閉じる
            $("#LoginDialog").dialog("close");
            $("#LoginMessage").empty();
            $("#LoginUserName").val("");
            $("#LoginPassword").val("");
            //mypageにジャンプ
            window.location.href = "./game.php";
          } else if(responce.parameters == 1) {
            //パスワードまたはユーザーIDの入力が間違っている場合
            LoginMessage("ユーザIDまたはパスワードがまちがっています。");
            $("#LoginPassword").val("");
          }
        })
        //ajax失敗
        .fail(function() {
          console.log("fail");
        });
      }
    },
    //キャンセルボタンが押された時
    "キャンセル": function() {
      //ダイアログを閉じる
      $(this).dialog("close");
      $("#LoginMessage").empty();
      $("#LoginUserName").val("");
      $("#LoginPassword").val("");
    }
  }
});
function LoginMessage(str) {
  $("#LoginMessage").html(str);
  $("#LoginMessage").css("color", "red");
}

//ログインダイアログで新規登録ボタンを押した時
$("#LoginSignUp").click(function(){
  // ダイアログを表示する
  $("#SignUpDialog").dialog("open");
  //ログインダイアログを閉じる
  $("#LoginDialog").dialog("close");
  $("#LoginMessage").empty();
  $("#LoginUserName").val("");
  $("#LoginPassword").val("");
});

setTimeout('rect()'); //アニメーションを実行


});
function rect() {
    $("#rect").animate({
        "marginLeft": $(window).width() + "px"//要素を動かす位置
    }, 3000).animate({
        "marginLeft": "-300px"//要素を戻す位置
    }, 0)
    setTimeout("rect()", 3000);//アニメーションを繰り返す間隔
}

</script>
</body>
</html>
