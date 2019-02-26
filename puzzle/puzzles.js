var BASE = 6;
var puzzle = [[[]]];
/*
puzzleはマス目の状態を保持
マス目の状態は二進数で表現
1桁目が1なら床
2桁目が1ならrunningManの現在位置
3桁目が1なら旗
つまり床とrunningManがあるなら十進数で3になる

クリア条件一覧
  ・"get flag" 旗をすべて回収すればクリア
*/

//phpからデータベースに保存されているデータを読み込む

puzzle[BASE+14] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 5, 1, 1, 5, 1, 1, 5, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 5, 1, 1, 3, 1, 1, 5, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 5, 1, 1, 5, 1, 1, 5, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 0,
  'clear' : 'get flag',
  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

'maxBlocks' : 7
};
// ステージネタ
// puzzle[BASE+14] = {
//   'main' : [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 0, 1, 3, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   ],
//
//   'dir' : 1.5,
//   'clear' : 'get flag',
//   'block' : [
//     'procBlock',
//     'stepForwardBlock',
//     // 'stepBackwardBlock',
//     // 'stepLeftBlock',
//     // 'stepRightBlock',
//     'turnLeftBlock',
//     'turnRightBlock',
//     'turnBackwardBlock',
//     'callProcBlock',
//     'ifBlock',
//     'ifElseBlock',
//     'existBlock',
//     'loopBlock'
//   ],
//
// 'maxBlocks' : 7
// };


puzzle[BASE+13] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 3, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 1,
  'clear' : 'get flag',
  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

'maxBlocks' : 12
};


puzzle[BASE+12] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 5, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 5, 0, 3, 1, 5, 0],
    [0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 1.5,
  'clear' : 'get flag',
  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

'maxBlocks' : 10
};


puzzle[BASE+11] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 1, 5, 0, 5, 1, 5, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 5, 1, 1, 1, 3, 1, 5, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 5, 1, 1, 1, 1, 1, 5, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 5, 1, 5, 0, 5, 1, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 1.5,
  'clear' : 'get flag',

  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'ifBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : 8
};

puzzle[BASE+10] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 5, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 5, 1, 3, 1, 5, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 5, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 1.5,
  'clear' : 'get flag',

  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'ifBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : 6
};

puzzle[BASE+9] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 5, 1, 5, 1, 5, 0],
    [0, 1, 0, 1, 0, 1, 0],
    [0, 5, 1, 5, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0],
    [0, 3, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 0,
  'clear' : 'get flag',

  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'ifBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : 6
}

puzzle[BASE+8] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 3, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 0,
  'clear' : 'get flag',
  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'callProcBlock',
  ],

'maxBlocks' : 18
};

puzzle[BASE+7] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 1, 1, 1, 5, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 0,
  'clear' : 'get flag',
  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

'maxBlocks' : 7
};


puzzle[BASE+6] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 1.5,
  'clear' : 'get flag',
  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnRightBlock',
    'ifBlock',
    'existBlock',
    'loopBlock'
  ],

'maxBlocks' : 6
};


puzzle[BASE+5] = {
  'main' : [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 5, 1, 5, 1, 1, 0],
    [0, 1, 1, 5, 1, 5, 1, 1, 0],
    [0, 1, 1, 5, 1, 5, 1, 1, 0],
    [0, 1, 1, 5, 1, 5, 1, 1, 0],
    [0, 1, 1, 1, 3, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  'dir' : 1.5,
  'clear' : 'get flag',
  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'loopBlock'
  ],

'maxBlocks' : 12
};

puzzle[BASE+4] = { //ステージ4
  'main' : [
    [0,0,0,0,0],
    [0,5,1,5,0],
    [0,1,0,1,0],
    [0,3,1,5,0],
    [0,0,0,0,0]
  ],

  'dir' : 1.5, //上向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'loopBlock'
  ],

  'maxBlocks' : 4
};

puzzle[BASE+3] = { //ステージ3
  'main' : [
    [0,0,0,0,0],
    [0,5,1,5,0],
    [0,1,0,1,0],
    [0,3,1,5,0],
    [0,0,0,0,0]
  ],

  'dir' : 1.5, //上向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnLeftBlock',
    'turnRightBlock'
  ],

  'maxBlocks' : 6
};

puzzle[BASE+2] = { //ステージ2
  'main' : [
    [0,0,0,0,0],
    [0,1,1,5,0],
    [0,1,1,1,0],
    [0,3,1,1,0],
    [0,0,0,0,0],
  ],

  'dir' : 1.5, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    'turnRightBlock'
  ],

  'maxBlocks' : 6
};

puzzle[BASE+1] = { //ステージ1
  'main' : [
    [0,0,0,0,0],
    [0,1,5,1,0],
    [0,1,1,1,0],
    [0,1,3,1,0],
    [0,0,0,0,0]
  ],

  'dir' : 1.5, //上向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock'
  ],

  'maxBlocks' : 3
};


/*以下basePuzzle*/
puzzle[6] = {
  'main' : [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  'dir' : 0, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : Infinity
};

puzzle[5] = {
  'main' : [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],

  'dir' : 0, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : Infinity
};

puzzle[4] = {
  'main' : [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0]
  ],

  'dir' : 0, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : Infinity
};

puzzle[3] = {
  'main' : [
    [0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0]
  ],

  'dir' : 0, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : Infinity
};

puzzle[2] = {
  'main' : [
    [0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,1,1,1,1,1,0],
    [0,0,0,0,0,0,0]
  ],

  'dir' : 0, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : Infinity
};

puzzle[1] = {
  'main' : [
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,1,1,1,0],
    [0,0,0,0,0]
  ],

  'dir' : 0, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : Infinity
};

/*tmp用*/
puzzle[0] = {
  'main' : [
    []
  ],

  'dir' : 0, //右向きスタート
  'clear' : "get flag", //

  'block' : [
    'procBlock',
    'stepForwardBlock',
    // 'stepBackwardBlock',
    // 'stepLeftBlock',
    // 'stepRightBlock',
    'turnLeftBlock',
    'turnRightBlock',
    'turnBackwardBlock',
    'callProcBlock',
    'ifBlock',
    'ifElseBlock',
    'existBlock',
    'loopBlock'
  ],

  'maxBlocks' : Infinity
};
