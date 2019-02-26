//グローバル変数
//var gc, stage;
var evalstage;
var stagearray = [];

PuzzleMan = (function() {  //キャラクター

  PuzzleMan = function() { //コンストラクタ
    this.currentY;
    this.currentX;
    this.currentDir;
    this.flagGetCount;

    this.initY;
    this.initX;
    this.initDir;

    this.code;
  }

  var p = PuzzleMan.prototype;

  /*init(初期値y, 初期値x, 初期方向)
    引数を渡さなければデフォルト引数を設定
    同時にステージ上にPuzzleManの位置情報を設定
  */
  p.init = function(y, x, dir = this.initDir) { //デフォルト引数
    this.initY = y;
    this.initX = x;
    this.initDir = dir;
    stageData[this.initY][this.initX] |= 0x2;
    this.flagGetCount = 0;

    this.currentY = y;
    this.currentX = x;
    this.currentDir = dir;
    /*console.log(this.initX);
    console.log(this.initY);
    console.log(this.currentX);
    console.log(this.currentY);*/
  }

  p.setPosition = function(y, x, dir = this.currentDir) {
  //console.log(y);
  //console.log(stageData.length);
  //配列外参照対策
    if(y == -1) {
      y = 0;
    }
    if(y == stageData.length) {
      y = stageData.length - 1;
    }

if(x == -1) {
  x = 0;
}
if(x == stageData.length) {
  x = stageData.length - 1;
}

    stageData[this.currentY][this.currentX] ^= 2; //二桁目をビット反転(XOR)
    this.currentY = y;
    this.currentX = x;
    this.currentDir = dir;
    stageData[this.currentY][this.currentX] |= 2;
  }

  /*move(進むマス数, 進む方向)
    PuzzleManの現在の向きに対しての「進む方向」に「進むマス数」進む
    基本引数には「1」を想定
    到達予定地点に床がなければ進まない(1か-1以外を引数として指定していて先に床があれば穴を飛び越える)
  */
  p.move = function(step, dir) {
    //SinとCosの誤差発生についてhttp://blogs.wankuma.com/yaju/archive/2012/04/07/265067.aspx
    //論理和を取ることで三角関数の誤差を修正
    //ただ論理和を取ると少数以下が正負に関わらず切り捨てられるので0度、90度、180度、270度のとき以外はダメ
    //将来的には斜め方向も検討するために三角関数を利用したが、この方法だとダメか……。せめて45度の移動くらいは……。
    var tmpY = this.currentY + step * (Math.sin((this.currentDir + dir) * Math.PI) | 0);
    // console.log(this.currentY);
    // console.log(tmpY);
    var tmpX = this.currentX + step * (Math.cos((this.currentDir + dir) * Math.PI) | 0);
    this.setPosition(tmpY, tmpX);
    //console.log(tmpX);
    console.log(stageData[pm.currentY][pm.currentX]);
    // if(stageData[pm.currentY][pm.currentX] == 2) {
    //   var parent = document.getElementById("modalIsStageCleared").children;
    //   parent[0].innerText = "しっぱい……\nもういちどちょうせん！";
    //   actionflag = 1;
    //   clearModalOpen();
    // }
    // pm.checkFlag();
  }

  // /*PuzzleManを方向転換、詳しくはcheckAroundを参照*/
  // p.changeDir = function(direction) {
  //   this.currentDir = this.checkAround(direction, true);
  // }

  p.turn = function(dir) {
    this.currentDir = (this.currentDir + dir) % 2;
  }

  /*checkAround(PuzzleManから見た向き, 方向転換するかどうか)
    PuzzleManから見た方向1マス先のチェックと方向転換の機能は分けたかったけど、まとめちゃいました
    戻り値はchangeFlag==trueなら転換後の方向、changeFlag==falseなら1マス先のtarget
  */
  p.checkAround = function(dir) {
    var checkY, checkX;
    var checkDir = (this.currentDir + dir) % 2;
    var target;

    checkY = this.currentY + (Math.sin(checkDir * Math.PI) | 0);
    checkX = this.currentX + (Math.cos(checkDir * Math.PI) | 0);
    if (stageData[checkY][checkX] & 0x1) { //001とのAND演算,床
      target = "floor";
    } else {                           //穴
      target = "hole";
    }
    if (stageData[checkY][checkX] & 0x4) { //100とのAND演算,旗
      target = "flag";
    }
    return target;
  }

  /*checkFlag()
    PuzzleManの現在地点にflagがあるかどうかのチェック
    あればstageDataからflagを取り除く
  */
  p.checkFlag = function() {
    if (stageData[this.currentY][this.currentX] & 0x4) {//100とのAND演算,旗
      stageData[this.currentY][this.currentX] ^= 0x4;
      this.flagGetCount++;
      return true;
    } else {
      return false;
    }
  }

  return PuzzleMan;
})();


//ステージ
Stage = (function() {
  Stage = function() {
    this.tileSize;
    this.tile;
    this.flagCount;
    return this;
  }

  var p = Stage.prototype;

  /*stageDataを初期化*/
  p.init = function(num) {
    this.flagCount = 0;
    stageData.splice(0, stageData.length-1); //stageDataを初期化
    for (var i = 0; i < puzzle[num].main.length; i++) {
      stageData[i] = puzzle[num].main[i].concat();
      for (var j = 0; j < puzzle[num].main[0].length; j++) {
        if (stageData[i][j] & 0x2) {
          pm.init(i, j, puzzle[num].dir);
        }
        if (stageData[i][j] & 0x4) {
          this.flagCount++;
        }
      }
    }
  //   if($(window).height() < 900) {
  //   this.tileSize = 350 / stageData[0].length;
  //   } else {
  //   this.tileSize = 550 / stageData[0].length;
  // }
  if($(window).height() > 900) {
  this.tile = 350 / stageData[0].length;
  this.tileSize = 550 / stageData[0].length;
  } else if($(window).height() > 750) {
    this.tileSize = 450 / stageData[0].length;
  } else {
    this.tileSize = 350 / stageData[0].length;
  }

    var newToolbox = '<xml id="toolbox" style="display:none">\n';
    if(createStageFlag == 1) {
    for (var i = 0; i < puzzle[1].block.length; i++) {
      newToolbox += "  <block type='" + puzzle[1].block[i] + "'></block>\n";
    }
  } else {
    for (var i = 0; i < puzzle[num].block.length; i++) {
      newToolbox += "  <block type='" + puzzle[num].block[i] + "'></block>\n";
    }
  }
    newToolbox += "</xml>\n";
    workspace.updateToolbox(newToolbox);

    workspace.options.maxBlocks = puzzle[num].maxBlocks;
  }

  $(window).resize(function(){
    if($(window).height() < 900 && $(window).height() >= 750) {
    stage.tileSize = 450 / stageData[0].length;
    console.log(stageData[0].length);
  } else if($(window).height() < 750) {
    stage.tileSize = 350 / stageData[0].length;
    console.log(stageData[0].length);
  } else {
    stage.tileSize = 550 / stageData[0].length;
  }
    stage.repaint();
 });

  /*stageDataの描画*/
  p.repaint = function() {
    var changecanvas = document.getElementById("stageArea");
    if($(window).height() > 900) {
      changecanvas.setAttribute("width", 550);
      changecanvas.setAttribute("height", 550);
      gc.clearRect(0, 0, 550, 550);
      gc.fillStyle = "black";
      gc.fillRect(0, 0, 550, 550);
    } else if($(window).height() > 750) {
      changecanvas.setAttribute("width", 450);
      changecanvas.setAttribute("height", 450);
      gc.clearRect(0, 0, 450, 450);
      gc.fillStyle = "black";
      gc.fillRect(0, 0, 450, 450);
    } else {
      changecanvas.setAttribute("width", 350);
      changecanvas.setAttribute("height", 350);
      gc.clearRect(0, 0, 350, 350);
      gc.fillStyle = "black";
      gc.fillRect(0, 0, 350, 350);
    }
    var ts = this.tileSize;
    // if($(window).height() < 900) {
    //   gc.clearRect(0, 0, 350, 350);
    //   gc.fillStyle = "black";
    //   gc.fillRect(0, 0, 350, 350);
    // } else {
    // gc.clearRect(0, 0, 550, 550);
    // gc.fillStyle = "black";
    // gc.fillRect(0, 0, 550, 550);
  // }

    for (var y = 0; y < stageData.length; y++) {
      for (var x = 0; x < stageData[y].length; x++) {
        if (stageData[y][x] & 0x1) { //001とのAND演算, 床
          gc.drawImage(imgFloor, x * ts, y * ts, ts, ts);
        }
        if (stageData[y][x] & 0x4) { //100とのAND演算,旗
          gc.drawImage(Flag1, x * ts, y * ts, ts, ts);
        }
      }
    }
    for (var y = 0; y < stageData.length; y++) {
      for (var x = 0; x < stageData[y].length; x++) {
        if (stageData[y][x] & 0x2) { //010とのAND演算,人
          gc.drawImage(imgRunningMan, x * ts, y * ts, ts, ts);
          if (pm.currentDir == 0) {
            gc.drawImage(markArrowRight, (x + 0.9) * ts, (y + 0.25) * ts, ts / 2, ts / 2);
          }
          if (pm.currentDir == 1/2) {
            gc.drawImage(markArrowDown, (x + 0.25) * ts, (y + 0.9) * ts, ts / 2, ts / 2);
          }
          if (pm.currentDir == 1) {
            gc.drawImage(markArrowLeft, (x - 0.4) * ts, (y + 0.25) * ts, ts / 2, ts / 2);
          }
          if (pm.currentDir == 3/2) {
            gc.drawImage(markArrowUp, (x + 0.25) * ts, (y - 0.4) * ts, ts / 2, ts / 2);
          }
        }
      }
    }
    /* canvas要素のノードオブジェクト */
    	var l=document.getElementsByClassName("canvassample").length;
      // console.log(l);
      var canvas,  ctx, stagename, publicname, username, dresponce;
    	for(var j = 0; j < l; j++) {
      canvas = document.getElementsByClassName('canvassample')[j];
      // console.log(canvas);
      /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
      if ( ! canvas || ! canvas.getContext ) {
    		console.log("false");
        return false;
      }
    	canvas.setAttribute("width", 350);
      canvas.setAttribute("height", 350);
    	ctx = canvas.getContext('2d');
    	ctx.clearRect(0, 0, 350, 350);
    	ctx.fillStyle = "black";
    	ctx.fillRect(0, 0, 350, 350);

    	// stage.tile = 350 / stageData[j].length;
    	// var stagetile = stage.tile;
    	// console.log(stagetile);
      stagename = document.getElementsByClassName("canvassample")[j].parentElement.children.canvasname.innerHTML;
      publicname =  document.getElementsByClassName("canvassample")[j].parentElement.parentElement.parentElement.children.parentuser.innerHTML;
      username = publicname.slice(0, -2 );
      // console.log(stagename);
      // console.log(username);
      $.ajax({
        url: './php/test.php',
        type: 'POST',
        dataType: 'json',
        async: false,
        data: {"stagename": stagename,
        "username": username,
        "my_login": my_login
      },
    })
    .done(function (download) {
      // console.log(download);
      document.getElementsByClassName('downloadMaxBlock')[j].innerHTML = "つかえるブロックの数： " + download.maxBlocks;
      stage.tile = 350 / download.main.length;
      for (var y = 0; y < download.main.length; y++) {
    		for (var x = 0; x < download.main[y].length; x++) {
    			if (download.main[y][x] & 0x1) { //001とのAND演算, 床
    				ctx.drawImage(imgFloor, x * stage.tile, y * stage.tile, stage.tile, stage.tile);
    			}
    			if (download.main[y][x] & 0x4) { //100とのAND演算,旗
    				ctx.drawImage(Flag1, x * stage.tile, y * stage.tile, stage.tile, stage.tile);
    			}
    		}
    	}
    	for (var y = 0; y < download.main.length; y++) {
    		for (var x = 0; x < download.main[y].length; x++) {
    			if (download.main[y][x] & 0x2) { //010とのAND演算,人
    				ctx.drawImage(imgRunningMan, x * stage.tile, y * stage.tile, stage.tile, stage.tile);
    				if (pm.currentDir == 0) {
    					ctx.drawImage(markArrowRight, (x + 0.9) * stage.tile, (y + 0.25) * stage.tile, stage.tile / 2, stage.tile / 2);
    				}
    				if (pm.currentDir == 1/2) {
    					ctx.drawImage(markArrowDown, (x + 0.25) * stage.tile, (y + 0.9) * stage.tile, stage.tile / 2, stage.tile / 2);
    				}
    				if (pm.currentDir == 1) {
    					ctx.drawImage(markArrowLeft, (x - 0.4) * stage.tile, (y + 0.25) * stage.tile, stage.tile / 2, stage.tile / 2);
    				}
    				if (pm.currentDir == 3/2) {
    					ctx.drawImage(markArrowUp, (x + 0.25) * stage.tile, (y - 0.4) * stage.tile, stage.tile / 2, stage.tile / 2);
    				}
    			}
    		}
    	}
    })
    .fail(function() {
      console.log("fail(ダウンロード)");
    });

    }
  }
//クリア時ポップアップ
  p.checkClear = function() {
    var parent = document.getElementById("modalIsStageCleared").children;
    //
    if (!(stageData[pm.currentY][pm.currentX] & 0x1)) {
      parent[0].innerText = "しっぱい……\nもういちどちょうせん！";
    } else {
      if(this.flagCount != 0) {
      if (this.flagCount == pm.flagGetCount) {
        parent[0].innerText = "クリア！\nつぎのもんだいにちょうせん！";
        if(createStageFlag == 0) {
        console.log(document.getElementById("selectPuzzle").value);
        var idx = document.getElementById("selectPuzzle").selectedIndex;
        var txt = document.getElementById("selectPuzzle").options[idx].text;
        console.log(idx);
        console.log(txt);
        // cssで〇を作りたい
        var clear = document.createElement("div");
        clear.id = "clear-icon";
        console.log(txt.slice(-1));
        if(txt.slice(-1) != "〇") {
          stagearray[idx] = 1;
        txt = txt + "〇";
        console.log(txt);
        document.getElementById("selectPuzzle").options[idx].text = txt;
        // document.getElementById("selectPuzzle").value = 10;
        // idx = document.getElementById("selectPuzzle").selectedIndex;
        // txt = document.getElementById("selectPuzzle").options[idx].text;
        // console.log(idx);
        // console.log(txt);

        // ログインしてるか確認
        // ログインしていたらmysqlにクリアログを追加
        if(document.getElementById("selectPuzzle").value <= 20) {
        $.ajax({
          url: './php/clearAppend.php',
          type: 'POST',
          data: {"clearValue": document.getElementById("selectPuzzle").value
        },
      })
      .done(function() {
        console.log("done");
      })
      .fail(function() {
        console.log("fail");
      })
    } else {
      //クリエイトステージ
      $.ajax({
        url: './php/cleateUpdate.php',
        type: 'POST',
        data: {"clearValue": document.getElementById("selectPuzzle").value
      },
    })
    .done(function() {
      console.log("done");
    })
    .fail(function() {
      console.log("fail");
    })
    }
  }
} else {
  checkUpload = 1;
}
        console.log(createStageFlag);
        // document.getElementById("selectPuzzle").value.style.color;
      } else {
        parent[0].innerText = "しっぱい……\nもういちどちょうせん！";
      }
    } else {
      parent[0].innerText = "しっぱい……\nもういちどちょうせん！";
      console.log("sipai");
    }
    }
    clearModalOpen();
  }

  p.tmpStage = function() {
    if (createStageFlag == 1) {
      puzzleNum = 0;
      puzzle[puzzleNum].main.splice(0, stageData.length-1); //tmp用puzzleを空に
      for (var i = 0; i < stageData.length; i++) {
        puzzle[puzzleNum].main[i] = stageData[i].concat();
      }
      puzzle[puzzleNum].dir = pm.currentDir;
    }
  }

  /*stageDataを配列で出力
    出力先はhtml上、これをコピーしてソースに貼り付ければパズル作成が楽になるよねっていう発想
  */
  //stagetextがJavascript形式のソースコード
  p.generateStage = function(){
    if(document.getElementById("UseNumber").value == 0){
      alertDialog({title:"かくにん",
      body:"使えるブロックの数を入力してね",
      close: function(){
        console.log("確認ダイアログ(保存)を閉じました。");
      }});
    } else if(!document.getElementById("UseNumber").value.match(/^[\x20-\x7e]*$/)) {
      alertDialog({title:"かくにん",
      body:"<div id='UseNumberMessage'>使えるブロックの数は半角で入力してね</div>",
      close: function(){
        console.log("確認ダイアログ(保存)を閉じました。");
      }});
    } else if(!document.getElementById("UseNumber").value.match(/^([1-9]\d*|0)$/)) {
      alertDialog({title:"かくにん",
      body:"使えるブロックの数は数字を入力してね",
      close: function(){
        console.log("確認ダイアログ(保存)を閉じました。");
      }});
    } else {
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
    console.log(stageText);
    storageDialog({title:"かくにん",
    body:"<div style='padding-top: 50px; padding-left:120px;'>ステージをほぞんしますか？</div>",
    close: function() {
      console.log("確認ダイアログ(保存)を閉じました。");
    }});
  }
}

  return Stage;
})();

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
function storageDialog(_options){
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
        loadCreateStage();
        alertDialog({title:"かくにん",
        body:"<div style='padding-top: 50px; padding-left: 170px;'>ほぞんしました。</div>",
        close: function(){
          console.log("確認ダイアログ(保存)を閉じました。");
        }});
      },
      "いいえ": function() {
        $(this).dialog("close");
      }
    }
  });
};
