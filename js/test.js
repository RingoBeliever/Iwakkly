var stageData = [[]];
var gc, selectPuzzle, deletePuzzle;
var mouseX, mouseY, beforeMouseX, beforeMouseY, gridY, gridX, isClickMouse;
var currentMouseValue = 0;
var programRunFlag = 0;
var puzzleNum = 7;
var createStageFlag = 0;
var toolbox;
var speed = 500;

var proc = [];

var pm = new PuzzleMan;
var stage = new Stage;

function init() {
  if (programRunFlag == 0) {
    gc = document.getElementById("stageArea").getContext("2d");
    selectPuzzle = document.getElementById("selectPuzzle");

    deletePuzzle = document.getElementById("deletePuzzle");

    modechange = document.getElementById("modechange");

    selectBasePuzzle = document.getElementById("selectBasePuzzle");
    changeMouse = document.getElementById("changeMouse");
    puzzleNum = 7;
    console.log(puzzleNum);
    stage.init(puzzleNum);
    // onkeydown = myKeyDown;  //キーボード入力の場合
    stageArea.onmousedown = startMouseDown;
    stageArea.onmouseup = endMouseDown;
    stageArea.onmousemove = moveMouse;
    selectPuzzle.onchange = changeSelectPuzzle;

    deletePuzzle.onchange = deleteSelectPuzzle;

    // modechange.onchange = changeStageMode;

    // selectPuzzle.onclick = changeSelectPuzzle;
    selectBasePuzzle.onchange = changeSelectPuzzle;
    // selectBasePuzzle.onclick = changeSelectPuzzle;
    selectExecSpeed.onchange = changeExecSpeed;
    // changeMouse.onchange = changeMouseValue;
    addSelectPuzzleBox();
    addDeletePuzzleBox();
    defaultStageLog();
    stage.repaint();
  }
}
//
// function myKeyDown(e) {
//   if (programRunFlag == 0) {
//     dy = pm.currentY, dx = pm.currentX;
//     stageData[pm.currentY][pm.currentX] ^= 2; //二桁目をビット反転(XOR)
//     switch (e.keyCode) {
//       case 37: dx--; break; //左カーソルキー
//       case 38: dy--; break; //上カーソルキー
//       case 39: dx++; break; //右カーソルキー
//       case 40: dy++; break; //下カーソルキー
//     }
//
//
//     if ((dy >= 0) && (dy < stageData.length)) { //上下壁判定
//       if (stageData[dy][dx] & 0x1) {
//         pm.currentY = dy;
//       }
//       if ((dx >= 0) && (dx < stageData.length)) { //左右壁判定
//         if (stageData[dy][dx] & 0x1) {
//           pm.currentX = dx;
//         }
//       }
//     }
//
//     stageData[pm.currentY][pm.currentX] |= 2; //二桁目をセット
//     stage.repaint();
//   }
// }

// function changeMouseValue() {
//   var selectedItem = this.options[this.selectedIndex];
//   currentMouseValue = Number(selectedItem.value);
// }

// function startMouseDown(e) {
//   if ((programRunFlag == 0) && (createStageFlag == 1)){
//     isMoveMouse = true;
//     mouseX = !isNaN(e.offsetX) ? e.offsetX : e.touches[0].clientX;
//     mouseY = !isNaN(e.offsetY) ? e.offsetY : e.touches[0].clientY;
//     console.log(currentMouseValue)
//     changeTile();
//   }
// }
//
// function endMouseDown(e) {
//   if ((programRunFlag == 0) && (createStageFlag == 1)){
//     isMoveMouse = false;
//   }
// }
//
// function moveMouse(e) {
//   if ((programRunFlag == 0) && (createStageFlag == 1)){
//     if (isMoveMouse == true) {
//       beforeMouseX = mouseX;
//       beforeMouseY = mouseY;
//       mouseX = !isNaN(e.offsetX) ? e.offsetX : e.touches[0].clientX;
//       mouseY = !isNaN(e.offsetY) ? e.offsetY : e.touches[0].clientY;
//       if ((Math.floor(mouseX / stage.tileSize) != Math.floor(beforeMouseX / stage.tileSize))
//         || (Math.floor(mouseY / stage.tileSize) != Math.floor(beforeMouseY / stage.tileSize))) {
//           changeTile();
//       }
//       console.log(mouseY + "," + mouseY)
//     }
//   }
// }

function startMouseDown(e) {
  if ((programRunFlag == 0) && (createStageFlag == 1)){
    isClickMouse = true;
    mouseY = !isNaN(e.offsetY) ? e.offsetY : e.touches[0].clientY;
    mouseX = !isNaN(e.offsetX) ? e.offsetX : e.touches[0].clientX;
    changeTile();
  }
}

function endMouseDown(e) {
  if ((programRunFlag == 0) && (createStageFlag == 1)){
    isClickMouse = false;
  }
}

function moveMouse(e) {
  if ((programRunFlag == 0) && (createStageFlag == 1)){
    beforeMouseY = mouseY;
    beforeMouseX = mouseX;
    mouseY = !isNaN(e.offsetY) ? e.offsetY : e.touches[0].clientY;
    mouseX = !isNaN(e.offsetX) ? e.offsetX : e.touches[0].clientX;

    if ((Math.floor(mouseX / stage.tileSize) != Math.floor(beforeMouseX / stage.tileSize))
    || (Math.floor(mouseY / stage.tileSize) != Math.floor(beforeMouseY / stage.tileSize))) {
      if (isClickMouse == true) {
        changeTile();
      }
    }
  }
}

function changeTile() {
  if ((programRunFlag == 0) && (createStageFlag == 1)){
    var yy = Math.floor(mouseY / stage.tileSize);
    var xx = Math.floor(mouseX / stage.tileSize);

    switch (currentMouseValue) {
      case 0x1:
      if (!(yy == 0 || yy == stageData.length-1) && !(xx == 0 || xx == stageData[yy].length-1)) { //外周1マス分は固定
        if ((stageData[yy][xx] == 0) || (stageData[yy][xx] == 1)){
          stageData[yy][xx] ^= currentMouseValue;
        }
      }
       checkUpload = 0;
      break;
      case 0x2:
      if (!(yy == 0 || yy == stageData.length-1) && !(xx == 0 || xx == stageData[yy].length-1)) { //外周1マス分は固定
        if ((stageData[yy][xx] != 0) && !(stageData[yy][xx] & 0x4)) {
          stageData[pm.currentY][pm.currentX] ^= currentMouseValue;
          pm.init(yy, xx);
        }
      }
       checkUpload = 0;
      break;
      case 0x4:
      if (!(yy == 0 || yy == stageData.length-1) && !(xx == 0 || xx == stageData[yy].length-1)) { //外周1マス分は固定
        if ((stageData[yy][xx] != 0) && !(stageData[yy][xx] & 0x2)) {
          stageData[yy][xx] ^= currentMouseValue;
        }
      }
       checkUpload = 0;
      break;
      case 5:
      var rad = Math.atan2(yy - pm.currentY, xx - pm.currentX);
      if ((0 <= rad) && (rad < 1/4 * Math.PI)) {
        pm.init(pm.initY, pm.initX, 0);
      } else if ((1/4 * Math.PI <= rad) && (rad < 3/4 * Math.PI)) {
        pm.init(pm.initY, pm.initX, 1/2);
      } else if ((3/4 * Math.PI <= rad) || (rad < -3/4 * Math.PI)) {
        pm.init(pm.initY, pm.initX, 1);
      } else if ((-3/4 * Math.PI <= rad) && (rad < -1/4 * Math.PI)) {
        pm.init(pm.initY, pm.initX, 3/2);
      } else if ((-1/4 * Math.PI <= rad) && (rad < 0)) {
        pm.init(pm.initY, pm.initX, 0);
      }
       checkUpload = 0;
      break;
      default:
      break;
    }
    stage.repaint();
  }
}

// function changeSelectPuzzle() {
//   if (programRunFlag == 0) {
//     var selectedItem = this.options[this.selectedIndex];
//     puzzleNum = Number(selectedItem.value);
//     stage.init(puzzleNum);
//     stage.repaint();
//   }
// }
//
// function changeSelectBasePuzzle() {
//   if ((programRunFlag == 0) && (createStageFlag == 1)) {
//     var selectedItem = this.options[this.selectedIndex];
//     puzzleNum = Number(selectedItem.value);
//     stage.init(puzzleNum, 1);
//     pm.init(Math.floor(stageData[0].length / 2), Math.floor(stageData[0].length / 2));
//     stage.repaint();
//   }
// }

function changeSelectPuzzle() {
  if (programRunFlag == 0) {
    checkUpload = 0;
    var selectedItem = this.options[this.selectedIndex];
    console.log(selectedItem);
    if (selectedItem.value != 1000) {
      puzzleNum = Number(selectedItem.value);
      console.log(puzzleNum);
      stage.init(puzzleNum);
      if (this == selectBasePuzzle) {
        pm.init(Math.floor(stageData[0].length / 2), Math.floor(stageData[0].length / 2));
      }
      workspace.clear();
      onchange();
      stage.repaint();
      // モードチェンジ中にステージを選択してもモード処理をする
      if(createStageFlag == 0) {
        createStageFlag = 1;
      } else {
        createStageFlag = 0;
      }
      changeStageMode();
    }
  }
}

var DP = "";  //消すステージのグローバル変数
function deleteSelectPuzzle() {
  if (programRunFlag == 0) {
    var selectedItem = this.options[this.selectedIndex];
    // selectedItem = undefined;
    // console.log(selectedItem);
    if (selectedItem.value != 1000) {
      puzzleNum = Number(selectedItem.value);
      // stage.init(puzzleNum);
      if(this == deletePuzzle) {
        //ステージデータ取得
        // stage.generateStage();
        // stage.valueStage();
        // console.log(document.getElementById("deletePuzzle").value - BASE);
        // dvalue = document.getElementById("deletePuzzle").value;
        var dp = document.getElementById("deletePuzzle").value;
        DP = dp;
        // console.log(puzzlevalue);
        // stage.valueStage();
        // console.log(iwakami);
        // console.log(value);
        //削除実行
        // var value = iwakami;
          YesNoDialog({title:"かくにん",
          body:"<div style='padding-top: 50px; padding-left: 70px;'>ステージ「" + puzzle[dp].stagename + "」をさくじょしますか？</div>",
          close: function() {
            console.log("確認ダイアログ(削除)を閉じました。");
            document.getElementById("deletePuzzle").value = "6";
          }});
      }
      // puzzle[0] = puzzle[puzzle.length-1];
      // puzzle[dp] = undefined;
      // puzzleNum = 0;
      // // stage.init(0);
      // addSelectPuzzleBox();
      // addDeletePuzzleBox();
      // stage.repaint();
    }
  }
  // location.reload();
}



function changeStageMode() {
  if (programRunFlag == 0) {
    var visibleButton = document.getElementsByClassName("buttonToUseInCreateMode");
    if (createStageFlag == 0) {
      document.getElementById("stageMode").innerText = "クリエイトモード";
      createStageFlag = 1;
      for (var i = 0; i < visibleButton.length; i++) {
        visibleButton[i].style.visibility = "visible";
      }
      // モード処理
      workspace.options.maxBlocks = Infinity;
      onchange();
      let newToolbox = '<xml id="toolbox" style="display:none">\n';
      for (var i = 0; i < puzzle[6].block.length; i++) {
        newToolbox += "  <block type='" + puzzle[6].block[i] + "'></block>\n";
      }
      newToolbox += "</xml>\n";
      workspace.updateToolbox(newToolbox);
      console.log("aaaaaa");
       checkUpload = 0;
    } else {
      setCursorMode();
      document.getElementById("stageMode").innerText = "プレイモード";
      createStageFlag = 0;
      for (var i = 0; i < visibleButton.length; i++) {
        visibleButton[i].style.visibility = "hidden";
      }
      // モード処理
      dont = document.getElementById("selectPuzzle").value;
      stage.init(dont);
      stage.repaint();
      workspace.clear();
      onchange();
    }
  }
}

function debug() {
  if(window.File && window.FileReader) {
    //File API
    alert("File API:OK");
  }else{
    alert("File API:NG");
  }
}

function addSelectPuzzleBox() {
  var item;
  while (selectPuzzle.childNodes.length > 0) {
    selectPuzzle.removeChild(selectPuzzle.firstChild);
  }
  for (var i = 7; i < puzzle.length; i++) {
    item = document.createElement("option");
    item.value = i;

    if(i > 20 && puzzle[i] != undefined) {
      item.innerText = puzzle[i].stagename;
      selectPuzzle.appendChild(item);
    } else if(i <= 20) {
      item.innerText = "ステージ" + (i - 6);
      selectPuzzle.appendChild(item);
    }

  }

}


function addDeletePuzzleBox() {
  var item;
  while (deletePuzzle.childNodes.length > 0) {
    deletePuzzle.removeChild(deletePuzzle.firstChild);
  }
  for (var i = 6; i < puzzle.length; i++) {
    // console.log(puzzle[i]);
    item = document.createElement("option");
    console.log(item);
    item.value = i;
    if(i == 6) {
      item.innerText = "えらぶ";
      deletePuzzle.appendChild(item);
    }
    if(i > 20 && puzzle[i] != undefined) {
      item.innerText = puzzle[i].stagename;
      console.log(i);
      deletePuzzle.appendChild(item);
    }
  }
}


function changeExecSpeed() {
  if (programRunFlag == 0) {
    var selectedItem = this.options[this.selectedIndex];
    value = Number(selectedItem.value);
    console.log(value)
    speed = value;
  }
}

function generate(block) {
  eval(block);
  pm.code += block + "\n";
}

function loadCreateStage() {
  console.log(puzzle.length);
  // console.log(puzzle[20].main);

  eval(evalstage);  // 現在のステージ情報
  console.log(puzzle[puzzle.length-1].main);
  console.log(puzzle[puzzle.length-1].dir);
  console.log(puzzle[puzzle.length-1].clear);
  console.log(puzzle[puzzle.length-1].block);
  console.log(puzzle[puzzle.length-1].maxBlocks);
  // console.log(document.getElementById('formInputStageData').value);
  // console.log(puzzle.length-1);
  //データベースに保存
  // var value = document.getElementById("formInputStageData").value;
  $.ajax({
    type: "POST",
    url: "./php/storage.php",
    data: { "puzzle": puzzle.length-1,
    "main": puzzle[puzzle.length-1].main,
    "dir": puzzle[puzzle.length-1].dir ,
    "clear": puzzle[puzzle.length-1].clear ,
    "block": puzzle[puzzle.length-1].block ,
    "maxBlocks": $("#UseNumber").val()
  },
  success: function(html) {
    console.log(html);
    var sd = [];
    $.ajax({
      //リクエストの内容
      url: './php/result.php',
      dataType: "json",
      data: sd,
    })
    .done(function (responce) {
      for(i = 0; i < responce.length; i++) {
        puzzle[JSON.parse(responce[i]).puzzle] = JSON.parse(responce[i]);
        console.log(JSON.parse(responce[i]).puzzle);
      }
      console.log(puzzle.length -1);
      puzzle[0] = puzzle[puzzle.length-1];
      // stage.repaint();

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

      puzzleNum = 7;
      stage.init(puzzleNum);
      addSelectPuzzleBox();
      addDeletePuzzleBox();
      defaultStageLog();
      changeStageMode();
      stage.repaint();
    })
    .fail(function() {
      console.log("fail");
    });
  }
});
}

function setCursorMode(img) {
  if ((programRunFlag == 0) && (createStageFlag == 1)){
    switch (img) {
      case "imgFloor":
      img = "url(imgMouseCursor/imgFloor.png) 25 25, auto";
      currentMouseValue = 0x1;
      break;
      case "imgRunningMan":
      console.log(1);
      img = "url(imgMouseCursor/imgRunningMan.png) 25 25, auto";
      currentMouseValue = 0x2;
      break;
      case "runDog":
      console.log(1);
      img = "url(imgMouseCursor/runDog.png) 25 25, auto";
      currentMouseValue = 0x2;
      console.log(1);
      break;
      case "runCat":
      img = "url(imgMouseCursor/runCat.png) 25 25, auto";
      currentMouseValue = 0x2;
      break;
      case "runKatatsumuri":
      img = "url(imgMouseCursor/runKatatsumuri.png) 25 25, auto";
      currentMouseValue = 0x2;
      break;
      case "Flag1":
      img = "url(imgMouseCursor/Flag1.png) 11 25,auto";
      currentMouseValue = 0x4;
      break;
      case "markArrowBackward":
      img = "url(imgMouseCursor/markArrowBackward.png) 25 25, auto";
      currentMouseValue = 5;
      break;
      default:
      img = "default";
      currentMouseValue = 0;
      break;
    }
    document.getElementById("stageArea").style.cursor = img;
  }
}

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
    width: 500,
    height:400,
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
        $(this).dialog("close");
        console.log("q");
        $.ajax({
          type: "POST",
          url: "./php/delete.php",
          data: {"item": DP},
        })
        .done(function (responce) {
          console.log("done");
          alertDialog({title:"かくにん",
          body:"<div style='padding-top: 50px; padding-left: 50px;'>ステージ「" + puzzle[DP].stagename + "」がさくじょされました。</div>",
          close: function(){
            console.log("確認ダイアログ(ダウンロード)を閉じました。");
            $.ajax({
              type: "POST",
              url: "./php/deleteCleateUpdate.php",
              data: {"value": DP}
            })
            .done(function() {
              console.log("done");
            })
            .fail(function() {
              console.log("fail");
            });
            document.getElementById("deletePuzzle").value = "6";
          }});
          console.log(puzzle.length -1);
          puzzle[0] = puzzle[puzzle.length-1];
          puzzle[DP] = undefined;
          // stage.repaint();
          puzzleNum = 7;
          stage.init(puzzleNum);
          addSelectPuzzleBox();
          addDeletePuzzleBox();
          defaultStageLog();
          if(createStageFlag == 0) {
            createStageFlag = 1;
          } else {
            createStageFlag = 0;
          }
          changeStageMode();
          stage.repaint();
        })
        .fail(function() {
          console.log("fail");
        });
      },
      "いいえ": function() {
        $(this).dialog("close");
        document.getElementById("deletePuzzle").value = "6";
      }
    }
  });
};

function defaultStageLog() {
	$.ajax({
		//リクエストの内容
		url: './php/defaultStageLog.php',
		dataType: "json",
		data: sd,
	})
	.done(function (responce) {
		console.log("done");
	console.log(responce);
	if(responce[0].stage1 == 1) {
		var txt = document.getElementById("selectPuzzle").options[0].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[0].text = txt;
		console.log(document.getElementById("selectPuzzle").options[0].text);
  }
	}
	if(responce[0].stage2 == 1) {
		var txt = document.getElementById("selectPuzzle").options[1].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[1].text = txt;
  }
	}
	if(responce[0].stage3 == 1) {
		var txt = document.getElementById("selectPuzzle").options[2].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[2].text = txt;
  }
	}
	if(responce[0].stage4 == 1) {
		var txt = document.getElementById("selectPuzzle").options[3].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[3].text = txt;
	}
	if(responce[0].stage5 == 1) {
		var txt = document.getElementById("selectPuzzle").options[4].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[4].text = txt;
  }
	}
	if(responce[0].stage6 == 1) {
		var txt = document.getElementById("selectPuzzle").options[5].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[5].text = txt;
  }
	}
	if(responce[0].stage7 == 1) {
		var txt = document.getElementById("selectPuzzle").options[6].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[6].text = txt;
  }
	}
	if(responce[0].stage8 == 1) {
		var txt = document.getElementById("selectPuzzle").options[7].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[7].text = txt;
  }
	}
	if(responce[0].stage9 == 1) {
		var txt = document.getElementById("selectPuzzle").options[8].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[8].text = txt;
  }
	}
	if(responce[0].stage10 == 1) {
		var txt = document.getElementById("selectPuzzle").options[9].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[9].text = txt;
	}
}
	if(responce[0].stage11 == 1) {
		var txt = document.getElementById("selectPuzzle").options[10].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[10].text = txt;
  }
	}
	if(responce[0].stage12 == 1) {
		var txt = document.getElementById("selectPuzzle").options[11].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[11].text = txt;
  }
	}
	if(responce[0].stage13 == 1) {
		var txt = document.getElementById("selectPuzzle").options[12].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[12].text = txt;
  }
	}
	if(responce[0].stage14 == 1) {
		var txt = document.getElementById("selectPuzzle").options[13].text;
    if(txt.slice(-1) != "〇") {
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[13].text = txt;
  }
	}
	})
	.fail(function() {
		console.log("fail");
	});
  $.ajax({
		//リクエストの内容
		url: './php/defaultCleateLog.php',
		dataType: "json",
		data: sd
	})
  .done(function(responce) {
    for(i = 0; i < responce.length; i++) {

      // console.log(document.getElementById('selectPuzzle').responce.puzzle);
      var txt = document.getElementById("selectPuzzle").options[i + 14].text;
      console.log(txt);
      if(responce[i].flag == 1) {
      if(txt.slice(-1) != "〇") {
  		txt = txt + "〇";
  		console.log(txt);
  		document.getElementById("selectPuzzle").options[i + 14].text = txt;
    }
  }
    }
  })
  .fail(function() {
    console.log("fail");
  });
};
