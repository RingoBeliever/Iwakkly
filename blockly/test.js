Blockly.Blocks['stepForwardBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["8", "8"]]), "step")
        .appendField("マスまえにすすむ")
        .appendField(new Blockly.FieldImage("picture/direction/markArrowUp.png", 25, 25, "downArrow"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stepBackwardBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["8", "8"]]), "step")
        .appendField("マスうしろにさがる")
        .appendField(new Blockly.FieldImage("picture/direction/markArrowDown.png", 25, 25, "upArrow"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stepLeftBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["8", "8"]]), "step")
        .appendField("マスひだりにすすむ")
        .appendField(new Blockly.FieldImage("picture/direction/markArrowLeft.png", 25, 25, "upArrow"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stepRightBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["8", "8"]]), "step")
        .appendField("マスみぎにすすむ")
        .appendField(new Blockly.FieldImage("picture/direction//markArrowRight.png", 25, 25, "upArrow"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['turnLeftBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ひだりをむく")
        .appendField(new Blockly.FieldImage("picture/direction/markArrowCounterclockwise.png", 25, 25, "counterclockwiseArrow"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['turnRightBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("みぎをむく")
        .appendField(new Blockly.FieldImage("picture/direction/markArrowClockwise.png", 25, 25, "clockwiseArrow"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['turnBackwardBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("うしろをむく")
        .appendField(new Blockly.FieldImage("picture/markArrowBackward.png", 25, 25, "backward"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['ifBlock'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("もし");
    this.appendDummyInput()
        .appendField("なら");
    this.appendStatementInput("process1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("をする");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['ifElseBlock'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("もし");
    this.appendDummyInput()
        .appendField("だったら");
    this.appendStatementInput("process1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("をして、ちがっていたら");
    this.appendStatementInput("process2")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("をする");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['loopBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["8", "8"]]), "i")
        .appendField("かい　おなじことをする");
    this.appendStatementInput("process1")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['callProcBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("プログラム")
        .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["メイン", "0"]]), "number")
        .appendField("をよぶ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['existBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["まえ", "0"], ["うしろ", "1"], ["ひだり", "3/2"], ["みぎ", "1/2"]]), "choose_direction");
    this.appendDummyInput()
        .appendField("に");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["あな", "hole"], ["ゆか", "floor"], ["はた", "flag"]]), "target");
    this.appendDummyInput()
        .appendField("がある");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['procBlock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("プログラム")
        .appendField(new Blockly.FieldDropdown([["メイン", "0"], ["1", "1"], ["2", "2"]]), "number");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("はじめ");
    this.appendStatementInput("process1")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("おわり");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
