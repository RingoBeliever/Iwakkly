<?php
ini_set('display_errors',1);
session_start();
require_once(dirname(__FILE__)."/php/mysql2.php");
//MySQLクラスインスタンスの作成
$mysql = new MySQL;
if(strlen($_SESSION["my_name"]) == 0) {
  $usr = "ゲスト";
} else {
  $usr = $_SESSION["my_name"];
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Iwakkly</title>
  <script>
  // 0:ゲスト 1:ログインユーザー
  var my_login = <?php echo $_SESSION["my_login"]; ?>;
  </script>
  <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <script type="text/javascript" src="js/dialog.js"></script>
  <script type="text/javascript" src="js/ajax.js"></script>
  <script type="text/javascript" src="puzzle/puzzle.js"></script>
  <script type="text/javascript" src="puzzle/puzzles.js"></script>
  <script type="text/javascript" src="js/test.js"></script>
  <script type="text/javascript" src="js/test_jquery.js"></script>
  <script>
  // ヘッダーファイル読み込み
  $(function() {
    var login = "<?php echo $_SESSION["my_login"]; ?>";
    if(login == 0) {
      $("#header").load("header/gestHeader.php");
    } else {
      $("#header").load("header/loginHeader.php");
    }
  });
  </script>
  <link rel="stylesheet" href="css/style.css" type="text/css">
  <link rel="stylesheet" type="text/css" href="css/home.css">

  <!--本体モジュール-->
  <script src="blockly/blockly_compressed.js"></script>
  <!--Blockモジュール-->
  <script src="blockly/blocks_compressed.js"></script>
  <!--Block定義モジュール-->
  <!-- <script src="blockly/blocks/logic.js"></script>
  <script src="blockly/blocks/math.js"></script>
  <script src="blockly/blocks/lists.js"></script> -->
  <script src="blockly/test.js"></script>
  <script src="blockly/javascript_compressed.js"></script>
  <!-- ソースコードジェネレーターモジュール-->
  <!-- <script src="blockly/generators/javascript/logic.js"></script>
  <script src="blockly/generators/javascript/math.js"></script>
  <script src="blockly/generators/javascript/lists.js"></script> -->
  <!-- <script src="blockly/generators/javascript/test_generators.js"></script> -->
  <!--翻訳-->

  <!--よくわからん定義-->
  <!--<script src="blockly/msg/js/ja.js"></script>-->

</head>
<!--<body>-->
<body onload="init()">
  <div id="header">
  </div>

<!--Blockly埋め込みエリア-->
<table id=IwakklyArea>
  <tbody>
    <tr>
      <td colspan="6">
        <p id="stageMode">プレイモード</p>
      </td>
    </tr>
    <tr>
      <td rowspan="2"><img class="btn-push" src="picture/markPlay.png" alt="実行ボタン" title="実行する"></td>
      <td>ステージをえらぶ</td>
      <td>スピードをかえる</td>
      <td>ステージをさくじょ</td>
      <td rowspan="2"><img class="btn-push" src="picture/tonkachi_hasami.png" alt="モードチェンジボタン" title="モードを変える" onclick="changeStageMode()" id="modechange"></td>
      <td class="buttonToUseInCreateMode" style="visibility:hidden;">ステージの大きさをえらぶ</td>
      <td rowspan="2"><img data-target="changeTileTarget" class="btn-push modal-open buttonToUseInCreateMode" src="picture/bunbougu_enpitsu.png" alt="アイテムせんたくボタン" title="アイテムをせんたくする" style="visibility:hidden;"></button></td>
      <td rowspan="2"><img data-target="generateStage" class="btn-push buttonToUseInCreateMode" src="picture/test_print_mondaiyoushi.png" alt="ほぞんボタン" title="ほぞんする" onclick="storageNote()" style="visibility:hidden;">
        <div id="storageNamedialog" title="ほぞん(作ったステージに名前を付けよう！)">
          <table>
            <tr>
              <th>ステージの名前</th>
              <td><input type="text" id="storageStageName" size="20" maxlength="30" /></td>
            </tr>
          </table>
          <div id="storagenameerror" style="margin-left: 70px;"></div>
        </div>
      </td>
    </tr>
    <tr>
      <td><select id="selectPuzzle"></select></td>
      <td><select id="selectExecSpeed">
        <option value="900">すごくおそい</option>
        <option value="700">おそい</option>
        <option value="500" selected>ふつう</option>
        <option value="200">はやい</option>
      </select></td>
      <td><select id="deletePuzzle">
        <option value="999" selected>えらぶ</option>
      </select></td>
      <td><select id="selectBasePuzzle" class="buttonToUseInCreateMode" style="visibility:hidden;">
        <option value="1000" selected>えらぶ</option>
        <option value="1">3x3</option>
        <option value="2">5x5</option>
        <option value="3">7x7</option>
        <option value="4">9x9</option>
        <option value="5">11x11</option>
        <option value="6">13x13</option>
      </select></td>
      <!-- <td><select id="changeMouse" disabled="true">
      <option value="0x1" selected>床&lt;-&gt;穴</option>
      <option value="0x2">人</option>
      <option value="0x4">旗</option>
      <option value="5">方向</option>
    </select></td> -->
  </tr>
  <tr>
    <td colspan="4">
      <!-- <div class="canvas" -->
        <canvas id="stageArea" width="550px" height="550px"></canvas>
      <!-- </div> -->
    </td>
    <td colspan="4" rowspan="2">
      <div id="blocklyDiv"></div>
    </td>
  </tr>
  <td colspan="4">
    <div id="ServerArea">
      <div id = "capacity"></div>
      <div id="playGetAllBlocks"></div>
      <div id = "capacity2">
        <table id="bblock" style="text-align: left;">
          <tr>
            <td style="text-align: right;">つかえるブロックの数：</td>
            <td><input id="UseNumber" type="text" name="UseNumber" maxlength="3" value="10"></td>
            <!-- <td>(ブロックは何個でも使えるよ)</td> -->
          </tr>
        </table>
      </div>
      <div id="createGetAllBlocks"></div>
      <table id="serverButton">
        <tr>
          <td class="buttonToUseInCreateMode" style="visibility:hidden;"><button id="download">ダウンロード</button>
            <div id="downloaddialog" title="ダウンロード(ステージをえらんで遊んでみよう！)">
              <table border = "1" cellspacing = "0" cellpadding = "3" width = "100%" bordercolor = "#666666">
                  <h3>サンプルステージ</h3>
                  <?php
                  $count = 0; //while変数
                  echo "<ul id='dropdownsample'>";
                  $mysql->query("SELECT DISTINCT id, username, stagename FROM publicstage WHERE id='71' OR id='72' ORDER BY id");
                  while($row = $mysql->fetch()) {
                    $id = $row["id"];
                    $username = $row["username"];
                    $stagename = $row["stagename"];
                    if($count == 0) {
                      echo "<li class='parentsample' style='width:200px;'>
                      <a style='display:inline-block;width:200px;'>".$username."</a>
                      <ul class='childsample'>
                      <li>".$stagename."</li>";
                      $i = $id;
                      $count++;
                    } else if($i == $id) {
                      echo "<li>".$stagename."</li>";
                    } else {
                      echo "</ul>
                      </li>
                      <br>
                      <li class='parentsample' style='width:200px;'>
                      <a style='display:inline-block;width:200px;'>".$username."</a>
                      <ul class='childsample'>
                      <li>".$stagename."</li>";
                      $i = $id;
                    }
                  }
                  echo "</ul>
                  </li>
                  </ul>";
                  ?>

              </table>
              <table border = "1" cellspacing = "0" cellpadding = "3" width = "100%" bordercolor = "#666666">
                <h3>ユーザ</h3>
                <?php
                $count = 0; //while変数
                echo "<ul class='dropdownuser' style='float: left'>";
                $mysql->query("SELECT DISTINCT id, username, stagename FROM publicstage WHERE id not in ('71') AND id not in ('72') ORDER BY id");
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
                <div id = "search">
                  <input type="search" name="q" value="" placeholder="ユーザ名"><input type="submit" name="btn_search" value="さがす">
                  <br>
                  <input type="submit" name="search_chansel" value="キャンセル">
                </div>
              </table>
            </div>
          </td>
          <td class="buttonToUseInCreateMode" style="visibility:hidden;"><button id="upload">アップロード</button>
            <div id="uploaddialog" title="アップロード(作ったステージに名前を付けよう！)">
              <table>
                <tr>
                  <th>ステージの名前</th>
                  <td><input type="text" id="inputStageName" size="20" maxlength="30" /></td>
                </tr>
              </table>
              <div id="nameerror" style="margin-left: 70px;"></div>
            </div>
          </td>
          <td class="buttonToUseInCreateMode" style="visibility:hidden;">
            <button id="DeleteUpload">アップロードしたステージをさくじょ</button>
            <div id="DeleteUploadDialog" title="さくじょするステージをえらんでね">
              <table>
                <?php
                $id = $_SESSION['my_id'];
                echo "<ul class='itiran'>";
                $mysql->query("SELECT * FROM publicstage WHERE id = $id");
                while($row = $mysql->fetch()) {
                  $stagename = $row["stagename"];
                  echo "<li class='CriateStageName' style='width:200px;'>
                  <a style='display:inline-block;width:200px;'>".$stagename."</a></li><br>";
                }
                echo "</ul>";
                ?>
              </table>
            </div>
          </td>
        </tr>
      </table>

      <div id="PuzzleManChange">
        <p>キャラクタを変える</p>
        <table id="changeCharacter">
          <tr>
            <td>
              <input id="selectRunningMan" type="image" src="picture/imgRunningMan.png" onclick="runningman()" alt="人" title="人" width="70" height="70" style="border:solid 2px #a4c6ff">
            </td>
            <td>
              <input id="selectRunDog" type="image" src="picture/runDog.png" onclick="dog()" alt="犬" title="犬" width="70" height="70">
            </td>
            <td>
              <input id="selectRunCat" type="image" src="picture/runCat.png" onclick="cat()" alt="ねこ" title="ねこ" width="70" height="70">
            </td>
            <td>
              <input id="selectRunKatatsumuri" type="image" src="picture/runKatatsumuri.png" onclick="snail()" alt="かたつむり" title="かたつむり" width="70" height="70">
            </td>
          </tr>
        </table>
      </div>
    </div>
  </td>
</tbody>
</table>

<img id="imgFloor" src="picture/imgFloor.png" alt="ゆか" title="ゆか" style="display:none" />
<img id="imgRunningMan" src="picture/imgRunningMan.png" alt="キャラクター" title="キャラクター" style="display:none" />
<img id="markArrowUp" src="picture/direction/markArrowUp.png" alt="上向き" title="上向き" style="display:none" />
<img id="markArrowDown" src="picture/direction/markArrowDown.png" alt="下向き" title="下向き" style="display:none" />
<img id="markArrowLeft" src="picture/direction/markArrowLeft.png" alt="左向き" title="左向き" style="display:none" />
<img id="markArrowRight" src="picture/direction/markArrowRight.png" alt="右向き" title="右向き" style="display:none" />
<img id="Flag1" src="picture/Flag1.png" alt="はた" title="はた" style="display:none" />

<!--ツールボックス-->
<xml id="toolbox" style="display: none">
  <!-- <category name="Math">
  </category> -->
  <block class="block" id="procBlock" type="procBlock"></block>
  <block class="block" id="stepForwardBlock" type="stepForwardBlock"></block>
  <!-- <block class="block" id="stepBackwardBlock" type="stepBackwardBlock"></block> -->
  <!-- <block class="block" id="stepLeftBlock" type="stepLeftBlock"></block> -->
  <!-- <block class="block" id="stepRightBlock" type="stepRightBlock"></block> -->
  <block class="block" id="turnLeftBlock" type="turnLeftBlock"></block>
  <block class="block" id="turnRightBlock" type="turnRightBlock"></block>
  <block class="block" id="turnBackwardBlock" type="turnBackwardBlock"></block>
  <block class="block" id="callProcBlock" type="callProcBlock"></block>
  <block class="block" id="ifBlock" type="ifBlock"></block>
  <block class="block" id="ifElseBlock" type="ifElseBlock"></block>
  <block class="block" id="existBlock" type="existBlock"></block>
  <block class="block" id="loopBlock" type="loopBlock"></block>
</xml>

<!-- <div id="generateStage" class="modal-content"> -->
<!-- <form> -->
<!-- <textarea id="formInputStageData" cols="50" rows="30"></textarea> -->
<!-- </form> -->
<!-- <br><br>
<button class="modal-close" onclick="loadCreateStage()">ステージデータをよみこむ</button>
<button class="modal-close">もどる</button>
</div> -->

<div id="changeTileTarget" class="modal-content">
  <p>えらんだあとにステージのマスをクリックすると変えることができるよ</p>
  <img class="btn-push modal-close" src="picture/imgFloor.png" alt="ゆか" title="ゆか" width="50" height="50" onclick="setCursorMode('imgFloor');">
  <img class="btn-push modal-close imgRunningMan" id="modalImgSelector" src="picture/imgRunningMan.png" alt="キャラクター" title="キャラクター" width="50" height="50" onclick="imgSelector();">
  <img class="btn-push modal-close" src="picture/Flag1.png" alt="はた" title="はた" width="50" height="50" onclick="setCursorMode('Flag1');">
  <img class="btn-push modal-close" src="picture/markArrowBackward.png" alt="向きをかえる" title="向きをかえる" width="50" height="50" onclick="setCursorMode('markArrowBackward');">
  <br><br>
  <button class="modal-close" onclick="setCursorMode();">もどる</button>
</div>

<div id="modalIsStageCleared" class="modal-content">
  <p></p>
  <br>
  <button class="clear-modal-close">もどる</button>
</div>

<script>
var options = {
  toolbox : document.getElementById("toolbox"),
  collapse : false,
  comments : false,
  disable : true,
  maxBlocks : puzzle[puzzleNum].maxBlocks,
  trashcan : true,
  horizontalLayout : false,
  toolboxPosition : 'start',
  css : true,
  media : 'https://blockly-demo.appspot.com/static/media/',
  rtl : false,
  scrollbars : true,
  sounds : true,
  oneBasedIndex : true,
  grid : {
    spacing : 20,
    length : 1,
    colour : '#888',
    snap : false
  },
  zoom : {
    controls: true,
    wheel: true,
    startScale: 0.8,
    maxScale: 2,
    minScale: 0.3,
    scaleSpeed: 1.2
  }
};
var imageSelector = "imgRunningMan";  //現在のキャラクタ
var workspace = Blockly.inject('blocklyDiv', options);

var action = document.getElementsByClassName('btn-push')[0];
var cnt = 0;
var actionflag = 0;
var buttonclick = false;
var timerId;
var i = 0;
var stopFlag = 0;
console.log(i);

var highlightBlock = function(id) {
  workspace.highlightBlock(id);
}

var onResize = function(e) {
  // blocklyDiv.style.width = 700 + 'px';
  // blocklyDiv.style.height = 750 + 'px';
  Blockly.svgResize(workspace);
};
onResize();
console.log(i);

// var changecanvas = document.getElementById("stageArea");
// if($(window).height() > 900) {
//   changecanvas.setAttribute("width", 550);
//   changecanvas.setAttribute("height", 550)
// } else {
//   changecanvas.setAttribute("width", 350);
//   changecanvas.setAttribute("height", 350);
// }

function onchange(event) {
  var countBlocks = workspace.remainingCapacity();
  if (countBlocks == Infinity) {
    document.getElementById("capacity2").style.display ="block";
    document.getElementById("createGetAllBlocks").style.display ="block";
    document.getElementById("capacity").style.display = "none";
    document.getElementById("playGetAllBlocks").style.display ="none";
  document.getElementById('createGetAllBlocks').innerHTML = "ブロックの数：" + workspace.getAllBlocks().length;
    // document.getElementById('capacity').textContent = "何個でもブロックを使えるよ";
    // document.getElementById('capacity').innerHTML = "使えるブロックの数を決めてね";
  } else {
    document.getElementById("capacity2").style.display ="none";
    document.getElementById("createGetAllBlocks").style.display ="none";
    document.getElementById("capacity").style.display = "block";
    document.getElementById("playGetAllBlocks").style.display = "block";
    document.getElementById('capacity').innerHTML = "つかえるブロックはあと " + workspace.remainingCapacity() + "こ";
    document.getElementById('playGetAllBlocks').innerHTML = "ブロックの数：" + workspace.getAllBlocks().length;
  }
  console.log(countBlocks)
}

workspace.addChangeListener(onchange);
onchange();

action.onclick = function() {
  console.log("aa");
  if (programRunFlag == 0) {
    proc0 = undefined;
    proc1 = undefined;
    proc2 = undefined;
    a = 0;
    loop_i = [];
    loopNum = 0;
    pm.code = "";
    programRunFlag = 1;
    stage.tmpStage();
    programFlag = 0;
    console.log(i);

    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    //Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    //Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    console.log(a++);
    console.log(code);
    eval(code);
    console.log(a++);
    if (proc0 == undefined) {
      console.log("proc0が宣言されていません");
    } else {

      //タイマー設置
      proc0();
      console.log(a++);
    }
    console.log(code);
    console.log(pm.code);
    splitCode = pm.code.split("\n");

    splitCode[splitCode.length-1] = undefined;
    pm.init(pm.initY, pm.initX, pm.initDir);
    stage.init(puzzleNum);
    console.log(splitCode);
    console.log(i);


    /*
    i = 0;
    var j = 0;
    function loop() {
    var timerId = setTimeout(loop, speed);
    if (splitCode[i] != undefined) {
    console.log(i + ", " + splitCode[i]);
    eval(splitCode[i++]);
    stage.repaint();
    if(j == 9) {
    programRunFlag = 0;
    stage.checkClear();
    clearTimeout(timerId);
  }
  j++;
} else {
programRunFlag = 0;
stage.checkClear();
clearTimeout(timerId);
}
}
loop();
*/

/*
var timerId = setInterval(function() {
if (splitCode[i] != undefined) {
console.log(i + ", " + splitCode[i]);
eval(splitCode[i++]);
stage.repaint();
} else {
programRunFlag = 0;
stage.checkClear();
clearInterval(timerId);
}
}, speed);

*/
}

console.log("aaaaa");
console.log(actionflag);
console.log(splitCode[0]);
console.log(i);
// i = 0;  //謎にiの値が変わる
clearInterval(timerId);
if(actionflag == 0 ) {
  action.src = "picture/markStop.png";
  clearInterval(timerId);
  timerId = setInterval(function() {
    console.log(splitCode[i]);
    if (splitCode[stopFlag] != undefined) {
      actionflag = 1;
      console.log(actionflag);
      console.log(stopFlag + ", " + splitCode[stopFlag]);
      eval(splitCode[stopFlag++]);
      console.log(stageData[pm.currentY][pm.currentX]);
      if(stageData[pm.currentY][pm.currentX] == 2) {
        let parent = document.getElementById("modalIsStageCleared").children;
        parent[0].innerText = "しっぱい……\nもういちどちょうせん！";
        programRunFlag = 0;
        actionflag = 0;
        stopFlag = 0;
        cnt = 0;
        action.src = "picture/markPlay.png";
        stage.checkClear();
        clearInterval(timerId);
        clearModalOpen();
      }
      stage.repaint();
    } else {
      programRunFlag = 0;
      actionflag = 0;
      stopFlag = 0;
      cnt = 0;
      action.src = "picture/markPlay.png";
      stage.checkClear();
      clearInterval(timerId);
    }
  }, speed);
} else if(actionflag == 1){
  action.src = "picture/markPlay.png";
  clearInterval(timerId);
  timerId = setInterval(function() {
    cnt += 1;
    // console.log(cnt);
    actionflag = 0;
  }, 100);
}
}

function imgSelector() {
  console.log(1);
  setCursorMode(imageSelector);
}

function runningman() {
  img = "imgRunningMan";
  imageSelector = "imgRunningMan";
  document.getElementById("selectRunDog").style = "border:none";
  document.getElementById("selectRunCat").style = "border:none";
  document.getElementById("selectRunKatatsumuri").style = "border:none";
  document.getElementById("selectRunningMan").style = "border:solid 2px #a4c6ff";
  document.getElementById("imgRunningMan").src = "picture/imgRunningMan.png";
  document.getElementById("modalImgSelector").src = "picture/imgRunningMan.png";
  setCursorMode();
  stage.repaint();
  console.log("imgRunningMan");
}
function dog() {
  img = "runDog";
  imageSelector = "runDog";
  document.getElementById("selectRunningMan").style = "border:none";
  document.getElementById("selectRunCat").style = "border:none";
  document.getElementById("selectRunKatatsumuri").style = "border:none";
  document.getElementById("selectRunDog").style = "border:solid 2px #a4c6ff";
  document.getElementById("imgRunningMan").src = "picture/runDog.png";
  document.getElementById("modalImgSelector").src = "picture/runDog.png";
  setCursorMode();
  stage.repaint();
  console.log("dog");
}
function cat() {
  img = "runCat";
  imageSelector = "runCat";
  document.getElementById("selectRunningMan").style = "border:none";
  document.getElementById("selectRunDog").style = "border:none";
  document.getElementById("selectRunKatatsumuri").style = "border:none";
  document.getElementById("selectRunCat").style = "border:solid 2px #a4c6ff";
  document.getElementById("imgRunningMan").src = "picture/runCat.png";
  document.getElementById("modalImgSelector").src = "picture/runCat.png";
  setCursorMode();
  stage.repaint();
  console.log("cat");
}
function snail() {
  img = "runKatatsumuri";
  imageSelector = "runKatatsumuri";
  document.getElementById("selectRunningMan").style = "border:none";
  document.getElementById("selectRunDog").style = "border:none";
  document.getElementById("selectRunCat").style = "border:none";
  document.getElementById("selectRunKatatsumuri").style = "border:solid 2px #a4c6ff";
  document.getElementById("imgRunningMan").src = "picture/runKatatsumuri.png";
  document.getElementById("modalImgSelector").src = "picture/runKatatsumuri.png";
  setCursorMode();
  stage.repaint();
  console.log("snail");
}

// ゲストかログインユーザーか
function storageNote() {
  // console.log(my_login);
  // if(my_login == 0) {
  //   storageNoteDialog({title:"かくにん",
  //   body:"ログインしてね。",
  //   close: function(){
  //     console.log("確認ダイアログ(ゲストユーザー保存)を閉じました。");
  //   }});
  // } else {
  //   stage.generateStage();
  // }
  var uploadNote = my_login;

  if(uploadNote == 0) {
    storageNoteDialog({title:"かくにん",
    body:"<div id='storageNoteMessage'>ログインしてね。</div>",
    close: function(){
      console.log("確認ダイアログ(ゲストユーザ保存)を閉じました。");
    }});
    // 使えるブロックの数を入力していない時
  } else if($("#UseNumber").val() == 0){
    storageNoteDialog({title:"かくにん",
    body:"使えるブロックの数を入力してね",
    close: function(){
      console.log("確認ダイアログ(保存)を閉じました。");
    }});
    // errorMessage("使えるブロックの数を入力してね");
  } else if(!$("#UseNumber").val().match(/^[\x20-\x7e]*$/)) {
    storageNoteDialog({title:"かくにん",
    body:"使えるブロックの数は半角で入力してね",
    close: function(){
      console.log("確認ダイアログ(保存)を閉じました。");
    }});
    // errorMessage("使えるブロックの数は半角で入力してね");
  } else if(!document.getElementById("UseNumber").value.match(/^([1-9]\d*|0)$/)){
    storageNoteDialog({title:"かくにん",
    body:"使えるブロックの数は数字を入力してね",
    close: function(){
      console.log("確認ダイアログ(保存)を閉じました。");
    }});
  } else {
    // ダイアログを表示する
    $("#storageNamedialog").dialog("open");
  }
}

//uploadダイアログ
$("#storageNamedialog").dialog({
  autoOpen: false,
  modal: true,
  width: 500,
  height:350,
  //クローズイベント発生時、入力値とエラーメッセージを空にする
  close: function () {
    $("#storagenameerror").empty();
    $("#storageStageName").val("");
    console.log("保存ダイアログを閉じました。");
  },
  buttons: {
    //OKボタンが押された時
    "ＯＫ": function() {
      //名前が入力されていない時
      if($("#storageStageName").val() == 0) {
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
          data: {"stagename": $("#storageStageName").val(),
                  "storageFlag": 1}
        })
        .done(function (done) {
          //戻り値を代入（noなら重複無し）
          console.log(done);
          responce = done;
          nowStage();
          eval(evalstage);
          //mysqlのusersdataテーブルに同じステージの名前がなければ保存
          if(responce == 'true') {
            console.log("11");
            console.log(puzzle.length-1);
              puzzle[puzzle.length-1].stagename = $("#storageStageName").val();
            $.ajax({
              type: "POST",
              url: "./php/storage.php",
              data: { "stagename": puzzle[puzzle.length-1].stagename,
              "puzzle": puzzle.length-1,
              "main": puzzle[puzzle.length-1].main,
              "dir": puzzle[puzzle.length-1].dir ,
              "clear": puzzle[puzzle.length-1].clear ,
              "block": puzzle[puzzle.length-1].block ,
              "maxBlocks": $("#UseNumber").val()
            },
            success: function(html) {
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
              storageNoteDialog({title:"かくにん",
              body:html,
              close: function(){
                // puzzle[puzzle.length-1].stagename = $("#storageStageName").val();
                console.log("確認ダイアログ(保存)を閉じました。");
                location.reload();
              }});
            }
          });
          $("#storageNamedialog").dialog("close");
        } else {
          errorMessage($("#storageStageName").val() + "はすでにあるよ");
        }
      })
      .fail(function() {
        console.log("fail(保存)");
      });
    }
  },
  //キャンセルボタンが押された時
  "キャンセル": function() {
    $(this).dialog("close");
    $("#storagenameerror").empty();
    $("#storageStageName").val("");
  }
}
});

//保存エラーメッセージ
function errorMessage(str) {
  $("#storagenameerror").html(str);
  $("#storagenameerror").css("color", "red");
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


//確認ダイアログ
function storageNoteDialog(_options){
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
        console.log("確認ダイアログ（ゲストユーザー保存）を閉じました。")
      }
    }]
  });
};

</script>
</body>
</html>
