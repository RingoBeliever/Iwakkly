var sd = [];
$(function() {
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
		init();
	})
	.fail(function() {
		console.log("b");
	});

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
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[0].text = txt;
		console.log(document.getElementById("selectPuzzle").options[0].text);
	}
	if(responce[0].stage2 == 1) {
		var txt = document.getElementById("selectPuzzle").options[1].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[1].text = txt;
	}
	if(responce[0].stage3 == 1) {
		var txt = document.getElementById("selectPuzzle").options[2].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[2].text = txt;
	}
	if(responce[0].stage4 == 1) {
		var txt = document.getElementById("selectPuzzle").options[3].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[3].text = txt;
	}
	if(responce[0].stage5 == 1) {
		var txt = document.getElementById("selectPuzzle").options[4].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[4].text = txt;
	}
	if(responce[0].stage6 == 1) {
		var txt = document.getElementById("selectPuzzle").options[5].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[5].text = txt;
	}
	if(responce[0].stage7 == 1) {
		var txt = document.getElementById("selectPuzzle").options[6].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[6].text = txt;
	}
	if(responce[0].stage8 == 1) {
		var txt = document.getElementById("selectPuzzle").options[7].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[7].text = txt;
	}
	if(responce[0].stage9 == 1) {
		var txt = document.getElementById("selectPuzzle").options[8].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[8].text = txt;
	}
	if(responce[0].stage10 == 1) {
		var txt = document.getElementById("selectPuzzle").options[9].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[9].text = txt;
	}
	if(responce[0].stage11 == 1) {
		var txt = document.getElementById("selectPuzzle").options[10].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[10].text = txt;
	}
	if(responce[0].stage12 == 1) {
		var txt = document.getElementById("selectPuzzle").options[11].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[11].text = txt;
	}
	if(responce[0].stage13 == 1) {
		var txt = document.getElementById("selectPuzzle").options[12].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[12].text = txt;
	}
	if(responce[0].stage14 == 1) {
		var txt = document.getElementById("selectPuzzle").options[13].text;
		txt = txt + "〇";
		console.log(txt);
		document.getElementById("selectPuzzle").options[13].text = txt;
	}
	})
	.fail(function() {
		console.log("fail");
	});
};

});
