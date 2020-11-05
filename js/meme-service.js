'use-strict'
var gFirstLineY = 50
var gSecondLineY = 150
var gThirdLineY = 170

var gCanvas = {
    width: 400 + 'px',
    height: 400 + 'px'
}
var gCtx = {
    lineWidth: '2',
    strokeStyle: 'black',
    fillStyle: 'white',
    font: '40px Ariel',
    direction: 'ltr'
}
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 40,
        align: 'left',
        strokeColor: 'black',
        fillColor: 'white',
        font: 'impact',
        coorX: 0,
        coorY: 0
    }]
}

// ---CTX SETTER ----//
function ctxSetFont(size = 40, font = 'impact') {
    gCtx.font = `${size}px ${font}`;
}

function ctxSetAlign(textAlign = 'left') {
    gCtx.textAlign = textAlign;
}

function ctxSetStrokeStyle(strokeStyle = 'black') {
    gCtx.strokeStyle = strokeStyle
}

function ctxSetFillStyle(fillStyle = 'white') {
    gCtx.fillStyle = fillStyle;
}

function ctxSetLineWidth(widthNum = '2') {
    gCtx.lineWidth = widthNum
}



// ---MEME SETTER----//

function memeSetImg(id) {
    gMeme.selectedImgId = id;
}

function memeSetSelectedLine(idx = 0) {
    gMeme.selectedLineIdx = idx;
}

function memeSetNewLine() {
    var line = {
        txt: '',
        size: 40,
        align: 'left',
        strokeColor: 'black',
        fillColor: 'white',
        font: 'impact',
        coorX: 0,
        coorY: 0
    }
    gMeme.lines.push(line);
}

function memeSetLineTxt(txt = '') {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function memeSetLineFontSize(sizeNum) {
    gMeme.lines[gMeme.selectedLineIdx].size = sizeNum;
}

function memeSetLineAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function memeSetLineStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function memeSetLineFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
}

function memeSetLineFont(fontName) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontName;
}

function memeSetLineCoorX(coorX = 30) {
    gMeme.lines[gMeme.selectedLineIdx].coorX = coorX;
}

function memeSetLineCoorY(coorY = 50) {
    gMeme.lines[gMeme.selectedLineIdx].coorY = coorY;
}

function memeRemoveLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1);
}

function memeRestartMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [{
            txt: '',
            size: 40,
            align: 'left',
            strokeColor: 'black',
            fillColor: 'white',
            font: 'impact',
            coorX: 0,
            coorY: 0
        }]
    }
}

// ---MEME GETTER----//

function memeGetImg() {
    return gMeme.selectedImgId;
}

function memeGetSelectedLine() {
    return gMeme.selectedLineIdx;
}

function memeGetLineTxt(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].txt;
}

function memeGetLineFontSize(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].size;
}

function memeGetLineAlign(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].align;
}

function memeGetLineStrokeColor(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].strokeColor;
}

function memeGetLineFillColor(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].fillColor;
}

function memeGetLineFont(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].font;
}

function memeGetLineCoorX(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].coorX;
}

function memeGetLineCoorY(lineIdx = gMeme.selectedLineIdx) {
    return gMeme.lines[lineIdx].coorY;
}

// ---------MEME UTILLS-----------//

function memeGetLineCoorXForDisplay(lineIdx) {
    return gMeme.lines[lineIdx].coorX;
}

function memeGetLineCoorYForDisplay(lineIdx) {
    return gMeme.lines[lineIdx].coorY;
}

function memeGetlinesLength() {
    return gMeme.lines.length;
}

function memeIsAddLinePossible() {
    var memeTxt = memeGetLineTxt();
    var numOfLines = memeGetlinesLength();
    if (!memeTxt || memeTxt.length === 0 || numOfLines >= 3) return false;
    else return true;
}

function isDragLinePossible() {
    if (!gIsDraging) return false
    var linesLength = memeGetlinesLength()
    if (linesLength === 1) {
        if (!memeGetLineTxt(0) || memeGetLineTxt(0).length === 0) return false
    }
    return true
}