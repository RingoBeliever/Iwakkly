$(function(){
  //グローバル変数
  var DeleteClickStage; //削除用クリックしたステージ
  var downloadClickStage; //ダウンロード用クリックしたステージ
  var responce; //ダウンロード用ajax返り値

  //確認ダイアログ
  function alertDialog(_options){
    let default_option = {
      title:"",
      body:"",
      close:function(){ return true; }
    }
    let options = $.extend(default_option , _options, {});
    let dom = $("<div />", { title: options.title, html: options.body });
    dom.dialog({
      modal: true,
      width: 400,
      height:300,
      close: function(){
        let dom = $(this);
        dom.dialog("destroy");
        dom.remove();
        options.close();
      },
      buttons: [{
        text: "OK",
        click: function() {
          $(this).dialog("close");
        }
      }]
    });
  };

  //確認ダイアログ,ダウンロード専用
  function YesNoDialog(_options){
    let default_option = {
      title:"",
      body:"",
      close:function(){ return true; }
    }
    let options = $.extend(default_option , _options, {});
    let dom = $("<div />", { title: options.title, html: options.body });
    dom.dialog({
      modal: true,
      width: 500,
      height:350,
      close: function(){
        let dom = $(this);
        dom.dialog("destroy");
        dom.remove();
        options.close();
      },
      buttons: {
        "はい": function() {
          // $("#downloaddialog").dialog("close");
          // $(this).dialog("close");
          console.log(downloadClickStage);
          console.log(JSON.parse(downloadClickStage).stagename);
          for(i = 0; i < downloadClickStage.length; i++) {
            puzzle[puzzle.length] = JSON.parse(downloadClickStage[i]);
            console.log(JSON.parse(downloadClickStage[i]).puzzle);
            item = document.createElement("option");
            item.value = puzzle[puzzle.length];
            item.innerText = JSON.parse(downloadClickStage).stagename;
            selectPuzzle.appendChild(item);
          }
          init();
          var cleateNumber = puzzle.length - 1;
          $.ajax({
            url: './php/cleateAppend.php',
            type: 'POST',
            data: {"clearValue": cleateNumber
          },
        })
        .done(function() {
          console.log("done");
        })
        .fail(function() {
          console.log("fail");
        });
          // item = document.createElement("option");
          // item.value = puzzle[puzzle.length];
          // item.innerText = JSON.parse(downloadClickStage).stagename;
          // selectPuzzle.appendChild(item);
          alertDialog({title:"かくにん",
          body:"<div style='text-align: center'>ステージせんたくボックスについかされました。</div>",
          close: function(){
            console.log("確認ダイアログ(ダウンロード)を閉じました。");
          }});
          $(this).dialog("close");
        },
        "いいえ": function() {
          $(this).dialog("close");
        }
      }
    });
  };

  //確認ダイアログ,削除用
  function deleteDialog(_options){
    let default_option = {
      title:"",
      body:"",
      close:function(){
        return true;
      }
    }
    let options = $.extend(default_option , _options, {});
    let dom = $("<div />", { title: options.title, html: options.body });
    dom.dialog({
      modal: true,
      width: 500,
      height:350,
      close: function(){
        let dom = $(this);
        dom.dialog("destroy");
        dom.remove();
        options.close();
      },
      buttons: {
        "はい": function() {
          $(this).dialog("close");
          console.log("a");
          $.ajax({
            url: './php/dupload.php',
            type: 'POST',
            data: {"clickstage": DeleteClickStage
          },
        })
        .done(function (html) {
          init();
          alertDialog({title:"かくにん",
          body:"<div style='padding-top: 50px; padding-left: 20px;'>ステージ「" + DeleteClickStage + "」さくじょされました。</div>",
          close: function(){
            console.log("確認ダイアログを閉じました。");
            location.reload();
          }});
        })
        .fail(function() {
          console.log("fail");
        });
      },
      "いいえ": function() {
        $(this).dialog("close");
      }
    }
  });
};

//ダウンロードダイアログキャンセルボタンが押された時
$('#search input[name="search_chansel"]').on(" click", function() {
  $('#search [name=q]').val("");
  let ChanselValue= $('#search [name=q]').val();
  $.ajax({
    url: './php/search.php',
    type: 'POST',
    data: {"SearchValue": ChanselValue},
  })
  .done(function (search) {
    // console.log(search);
    $(".dropdownuser").html(search);
    stage.repaint();
    $(".downloadButton").on("click", function(){
      // console.log($(this).parent().html());
    //   //ステージ名
      var clickstage = $(this).parent().find("li").html();
      //クリックしたuser
      var clickuser = $(this).parent().parent().parent().find("a").html();
      let username = clickuser.slice(0, -2 );
      $.ajax({
        url: './php/download.php',
        type: 'POST',
        dataType: 'json',
        data: {"clickstage": clickstage,
        "username": username,
        "my_login": my_login
      },
    })
    .done(function (download) {
      downloadClickStage = download;
      YesNoDialog({title:"かくにん",
      body:"「" + clickuser + "」のステージ「" + clickstage + "」をダウンロードしますか？",
      close: function(){
        console.log("確認ダイアログ(ダウンロード)を閉じました。");
      }});
    })
    .fail(function() {
      console.log(my_login);
      console.log("fail(ダウンロード)");
    });
    });
})
.fail(function() {
  console.log("fail");
});
});

//user検索機能検索ボタンを押したとき
$('#search input[name="btn_search"]').on(" click", function() {
  let SearchValue =  $('#search [name=q]').val();
  console.log(SearchValue);
  $.ajax({
    url: './php/search.php',
    type: 'POST',
    data: {"SearchValue": SearchValue},
  })
  .done(function (search) {
    // console.log(search);
    $(".dropdownuser").html(search);
    //dropdown
    stage.repaint();
    $(".downloadButton").on("click", function(){
      // console.log($(this).parent().html());
    //   //ステージ名
      var clickstage = $(this).parent().find("li").html();
      //クリックしたuser
      var clickuser = $(this).parent().parent().parent().find("a").html();
      let username = clickuser.slice(0, -2 );
      $.ajax({
        url: './php/download.php',
        type: 'POST',
        dataType: 'json',
        data: {"clickstage": clickstage,
        "username": username,
        "my_login": my_login
      },
    })
    .done(function (download) {
      downloadClickStage = download;
      YesNoDialog({title:"かくにん",
      body:"「" + clickuser + "」のステージ「" + clickstage + "」をダウンロードしますか？",
      close: function(){
        console.log("確認ダイアログ(ダウンロード)を閉じました。");
      }});
    })
    .fail(function() {
      console.log(my_login);
      console.log("fail(ダウンロード)");
    });
    });
})
.fail(function() {
  console.log("fail");
});
});

// クリックしたliの要素をアラートで表示
$(".downloadButton").on("click", function(){
  // console.log($(this).parent().html());
//   //ステージ名
  var clickstage = $(this).parent().find("li").html();
  //クリックしたuser
  var clickuser = $(this).parent().parent().parent().find("a").html();
  let username = clickuser.slice(0, -2 );
  $.ajax({
    url: './php/download.php',
    type: 'POST',
    dataType: 'json',
    data: {"clickstage": clickstage,
    "username": username,
    "my_login": my_login
  },
})
.done(function (download) {
  downloadClickStage = download;
  YesNoDialog({title:"かくにん",
  body:"「" + clickuser + "」のステージ「" + clickstage + "」をダウンロードしますか？",
  close: function(){
    console.log("確認ダイアログ(ダウンロード)を閉じました。");
  }});
})
.fail(function() {
  console.log(my_login);
  console.log("fail(ダウンロード)");
});
});

// dropdown
$('#dropdownsample li').hover(function(){
  $("ul:not(:animated)", this).slideDown();
}, function(){
  $("ul.childsample",this).slideUp();
});
// クリックしたliの要素をアラートで表示
$(".childsample li").on("click", function(){
  //クリックしたinnerhtml
  var clickstage = $(this).html();
  //クリックしたuser
  var clickuser = $(this).parent().parent().find("a").html();
  // let username = clickuser.slice(0, -2 );
  $.ajax({
    url: './php/download.php',
    type: 'POST',
    dataType: 'json',
    data: {"clickstage": clickstage,
    "username": clickuser,
    "my_login": my_login
  },
})
.done(function (download) {
  downloadClickStage = download;
  // $("#downloaddialog").dialog("close");
  YesNoDialog({title:"かくにん",
  body:"「" + clickuser + "」のステージ「" + clickstage + "」をダウンロードしますか？",
  close: function(){
    console.log("確認ダイアログ(ダウンロードサンプル)を閉じました。");
  }});
})
.fail(function() {
  console.log("fail(ダウンロードサンプル)");
});
});

// 削除用クリックしたliの要素をアラートで表示
$(".CriateStageName a").on("click", function(){
  //クリックしたstagename
  DeleteClickStage = $(this).html();
  deleteDialog({title:"かくにん",
  body:"<div style='text-align: center;'>ステージ「" + DeleteClickStage + "」をさくじょしますか？</div>",
  close: function(){
    console.log("確認ダイアログ(削除)を閉じました。");
  }});
});

// ボタンのクリックイベント
//downloadボタン
$("#download").click(function(){
  // ダイアログを表示する
  $("#downloaddialog").dialog("open");
});
//uploadボタン
$("#upload").click(function(){
  var uploadNote = my_login;
  var stageFlag = 0;
  for (let i = 0; i < stageData.length; i++) {
    for (let j = 0; j < stageData.length; j++) {
      if(stageData[i][j] == 5) {
        stageFlag = stageFlag + 1;
      }
    }
  }
  console.log(uploadNote);
  if(uploadNote == 0) {
    alertDialog({title:"かくにん",
    body:"<div id='storageNoteMessage'>ログインしてね。</div>",
    close: function(){
      console.log("確認ダイアログ(ゲストユーザーアップロード)を閉じました。");
    }});
    // 使えるブロックの数を入力していない時
  } else if(stageFlag == 0) {
    alertDialog({title:"かくにん",
    body:"<div style='text-align: center; padding-top: 60px;'>はたをおいてね</div>",
    close: function(){
      console.log("確認ダイアログ(アップロード)を閉じました。");
    }});
  } else if(checkUpload == 0) {
    alertDialog({title:"かくにん",
    body:"<div style='text-align: center; padding-top: 40px;'>アップロードするステージを<br>自分でクリアしよう！",
    close: function(){
      console.log("確認ダイアログ(アップロード)を閉じました。");
    }});
  } else if($("#UseNumber").val() == 0){
    alertDialog({title:"かくにん",
    body:"使えるブロックの数を入力してね",
    close: function(){
      console.log("確認ダイアログ(アップロード)を閉じました。");
    }});
    // errorMessage("使えるブロックの数を入力してね");
  } else if(!$("#UseNumber").val().match(/^[\x20-\x7e]*$/)) {
    alertDialog({title:"かくにん",
    body:"使えるブロックの数は半角で入力してね",
    close: function(){
      console.log("確認ダイアログ(アップロード)を閉じました。");
    }});
    // errorMessage("使えるブロックの数は半角で入力してね");
  } else if(!document.getElementById("UseNumber").value.match(/^([1-9]\d*|0)$/)){
    alertDialog({title:"かくにん",
    body:"使えるブロックの数は数字を入力してね",
    close: function(){
      console.log("確認ダイアログ(アップロード)を閉じました。");
    }});
  } else {
    // ダイアログを表示する
    $("#uploaddialog").dialog("open");
  }
});
//deletedownloadボタン
$("#DeleteUpload").click(function(){
  var duploadNote = my_login;
  console.log(duploadNote);
  if(duploadNote == 0) {
    alertDialog({title:"かくにん",
    body:"<div id='storageNoteMessage'>ログインしてね。</div>",
    close: function(){
      console.log("確認ダイアログ(ゲストユーザーアップロード)を閉じました。");
    }});
  } else {
  // ダイアログを表示する
  $("#DeleteUploadDialog").dialog("open");
}
});

//ダイアログイベント
// downloadダイアログ
$("#downloaddialog").dialog({
  autoOpen: false,
  modal: true,
  width: 1000,
  height:550,
  close: function () {
    $('#search [name=q]').val("");
    console.log("ダウンロードダイアログを閉じました。");

  }});
  //uploadダイアログ
  $("#uploaddialog").dialog({
    autoOpen: false,
    modal: true,
    width: 500,
    height:350,
    //クローズイベント発生時、入力値とエラーメッセージを空にする
    close: function () {
      $("#nameerror").empty();
      $("#inputStageName").val("");
      console.log("アップロードダイアログを閉じました。");
    },
    buttons: {
      //OKボタンが押された時
      "ＯＫ": function() {
        //名前が入力されていない時
        if($("#inputStageName").val() == 0) {
          errorMessage("名前が入力されていないよ");
          // 使えるブロックの数を入力していない時
        } else if($("#UseNumber").val() == 0){
          errorMessage("使えるブロックの数を入力してね");
        } else if(!$("#UseNumber").val().match(/^[\x20-\x7e]*$/)) {
          errorMessage("使えるブロックの数は半角で入力してね");
        } else if(!document.getElementById("UseNumber").value.match(/^([1-9]\d*|0)$/)){
          alertDialog({title:"かくにん",
          body:"使えるブロックの数は数字を入力してね",
          close: function(){
            console.log("確認ダイアログ(保存)を閉じました。");
          }});
        } else {
          //同じ名前がmysql上に存在しないか確認
          $.ajax({
            type: "POST",
            url: "./php/exist.php",
            data: {"stagename": $("#inputStageName").val(),
                    "storageFlag": 0}
          })
          .done(function (done) {
            //戻り値を代入（noなら重複無し）
            console.log(done);
            responce = done;
            nowStage();
            eval(evalstage);
            //mysqlのpublicstageテーブルに同じステージの名前がなければ保存
            if(responce == 'true') {
              console.log("11");
              $.ajax({
                type: "POST",
                url: "./php/upload.php",
                data: { "stagename": $("#inputStageName").val(),
                "puzzle": puzzle.length-1,
                "main": puzzle[puzzle.length-1].main,
                "dir": puzzle[puzzle.length-1].dir ,
                "clear": puzzle[puzzle.length-1].clear ,
                "block": puzzle[puzzle.length-1].block ,
                "maxBlocks": $("#UseNumber").val()
              },
              success: function(html) {
                alertDialog({title:"かくにん",
                body:html,
                close: function(){
                  console.log("確認ダイアログ(アップロード)を閉じました。");
                  location.reload();
                }});
              }
            });
            $("#uploaddialog").dialog("close");
          } else {
            errorMessage($("#inputStageName").val() + "はすでにあるよ");
          }
        })
        .fail(function() {
          console.log("fail(アップロード)");
        });
      }
    },
    //キャンセルボタンが押された時
    "キャンセル": function() {
      $(this).dialog("close");
      $("#nameerror").empty();
      $("#inputStageName").val("");
    }
  }
});
// 削除ダイアログ
$("#DeleteUploadDialog").dialog({
  autoOpen: false,
  modal: true,
  width: 500,
  height:500,
  close: function() {
    console.log("削除ダイアログが削除されました。");
  }
});

//uploadエラーメッセージ
function errorMessage(str) {
  $("#nameerror").html(str);
  $("#nameerror").css("color", "red");
}

function nowStage() {
  var stageText = "puzzle[BASE+" + (puzzle.length-BASE) + "] = {\n";
  stageText += "  'main' : [\n";
  for (var y = 0; y < stageData.length; y++) {
    stageText += "    [";
    for (var x = 0; x < stageData[y].length-1; x++) {
      stageText += stageData[y][x] + ", ";
    }
    stageText += stageData[y][stageData[y].length-1] + "],\n";
  }
  stageText += "  ],\n\n";
  stageText += "  'dir' : " + pm.currentDir + ",\n";
  stageText += "  'clear' : 'get flag',\n";

  stageText += "  'block' : [\n";
  var block = document.getElementsByClassName("block")
  for (var i = 0; i < block.length-1; i++) {
    stageText += "    '" + block[i].id + "',\n";
  }
  stageText += "    '" + block[block.length-1].id + "'\n";
  stageText += "  ],\n\n"
  stageText += "'maxBlocks' : " + document.getElementById("UseNumber").value + "\n";
  stageText += "};\n"
  evalstage = stageText;
}

$("input[name='UseNumber']").blur(function() {
  if($(this).val() == "") {
    $(this).css("background-color", "#fef4f8");
    $(this).css("border", "1px solid red");
  } else if(!$("#UseNumber").val().match(/^[\x20-\x7e]*$/)) {
    $(this).css("background-color", "#fef4f8");
    $(this).css("border", "1px solid red");
  } else if(!document.getElementById("UseNumber").value.match(/^([1-9]\d*|0)$/)) {
    $(this).css("background-color", "#fef4f8");
    $(this).css("border", "1px solid red");
  } else {
    $(this).css("background-color", "#fafeff");
    $(this).css("border", "1px solid #1e90ff");
  }
})
// $('li .parent').click(function(){
//     $('.area').toggle();
// });

});
