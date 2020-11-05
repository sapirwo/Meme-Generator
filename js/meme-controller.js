'use-strict'
var gIsDraging = false

function onOpenMemeEditor(imgId) {
    memeRestartMeme()
    memeSetImg(imgId)
    gCanvas = document.getElementById('main-canvas');
    gCtx = gCanvas.getContext('2d');
    var elMemePanelsContainer = document.querySelector('.meme-panels-container');
    var elMainGalleryContainer = document.querySelector('.main-gallery-container');
    var elSearchBar = document.querySelector('.search-bar');
    var elAbout = document.querySelector('.about');
    elAbout.style.display = "none"
    elMemePanelsContainer.style.display = "flex";
    elMainGalleryContainer.style.display = "none"
    elSearchBar.style.display = "none"
    var elGalleryBtn = document.querySelector('.gallery-btn-main-header')
    elGalleryBtn.classList.remove('active')
    drawImg(document.querySelector('.main-gallery-container'));
    memeSetLineCoorX()
    memeSetLineCoorY(gFirstLineY)
    memeSetLineTxt()
    //---adding events listeners for drag&drop abillity--//
    gCanvas.addEventListener('mousedown', () => gIsDraging = true);
    gCanvas.addEventListener('mousemove', dragAndDropLine);
    gCanvas.addEventListener('mouseup', () => gIsDraging = false);
    gCanvas.addEventListener('mouseout', () => gIsDraging = false);
}

//----- RENDERING-----//

//----- canvas-maker-----//

function drawImg() {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
    img.src = gImgs[memeGetImg()].url;
}

//-----canvas render-----//

function renderMeme() {
    drawImg()
    renderSwitchLineBtn(memeGetSelectedLine())
    setTimeout(function () { drawAllLinesText(); }, 0.01)
}
//-----selected-line render btn-----//

function renderSwitchLineBtn(lineIdx) {
    var elSwitchLineBtn = document.querySelector('.btn-switch-line-focus')
    elSwitchLineBtn.innerHTML = `${lineIdx + 1}<img
    src="btn-icons/up-and-down-opposite-double-arrows-side-by-side.png"
    alt="Up or down line">`
}

//-------------ON CANVAS-------------//

//--trigger by event listener--//
function dragAndDropLine(ev) {
    if (!isDragLinePossible()) return
    const { offsetX, offsetY } = ev;
    memeSetSelectedLine(memeGetSelectedLine())
    memeSetLineCoorX(offsetX)
    memeSetLineCoorY(offsetY)
    renderMeme()
}

//-----ON CONTROL PANNEL (BUTTONS)-----//

//text-typing//
function onSetLineTxt(text) {
    memeSetLineTxt(text)
    renderMeme()
}

//take line up btn//
function onTakeLineUp() {
    var coorY = memeGetLineCoorY();
    memeSetLineCoorY(coorY - 4);
    renderMeme();
}
//take line down btn//
function onTakeLineDown() {
    var coorY = memeGetLineCoorY()
    memeSetLineCoorY(coorY + 4)
    renderMeme();
}

//switch line btn//
function onSwitchLine() {
    var numOfLines = memeGetlinesLength()
    var selectedLine = memeGetSelectedLine()
    if (numOfLines <= 1) return
    else if (selectedLine < numOfLines - 1) memeSetSelectedLine(selectedLine + 1)
    else memeSetSelectedLine(0)
    cleanUserInput()
    renderMeme()
}

//add line btn//
function onAddLine() {
    if (!memeIsAddLinePossible()) return
    var lastLineCoorY = memeGetLineCoorY()
    var selectedLine = memeGetSelectedLine()
    memeSetNewLine()
    memeSetSelectedLine(selectedLine + 1)
    memeSetLineCoorX()
    memeSetLineCoorY(lastLineCoorY + gSecondLineY)
    cleanUserInput()
    renderMeme()
}

//Remove line btn//
function onRemoveLine() {
    var numOfLines = memeGetlinesLength();
    if (numOfLines < 2) {
        cleanUserInput()
        memeSetLineTxt('')
        cleanUserInput()
        renderMeme()
    } else {
        var selectedLineIdx = memeGetSelectedLine()
        memeRemoveLine(selectedLineIdx)
        memeSetSelectedLine(0)
        renderMeme()
    }
}

//increase text-size btn//
function onIncreaseFontBtn() {
    var fontSize = memeGetLineFontSize();
    memeSetLineFontSize(fontSize + 4)
    renderMeme();
}

//decrease text-size btn//
function onDecreaseFontBtn() {
    var fontSize = memeGetLineFontSize();
    memeSetLineFontSize(fontSize - 4)
    renderMeme();
}

//align-left btn//
function onAlignLeftBtn() {
    memeSetLineAlign('left')
    memeSetLineCoorX(30)
    renderMeme();
}

//align-center btn//
function onAlignCenterBtn() {
    memeSetLineAlign('center')
    memeSetLineCoorX(200)
    renderMeme();
}

//align right btn//
function onAlignRightBtn() {  
    memeSetLineAlign('rigth')
    memeSetLineCoorX(280)
    // gCanvas.setAttribute('dir', 'rtl');
    renderMeme();
}

//font selector btn//
function onFontSelectBtn(fontType) {
    memeSetLineFont(fontType + '')
    renderMeme()
}

//stroke color select btn//
function onStrokeColorBtn(color) {
    memeSetLineStrokeColor(color + '')
    renderMeme()
}
//fill color select btn//
function onFillColorBtn(color) {
    memeSetLineFillColor(color + '')
    renderMeme()
}
//load btn//
function onLoadBtn() {
    var htmlStr = '';
    if (getNumOfSavedMemes() === 0) {
        setModalContent('Sorry, no saved memes')

    } else {
        for (var i = 0; i < getNumOfSavedMemes(); i++) {
            htmlStr += `<p><a onmousedown="onLoadSavedMeme(this.innerText)">Meme ${i + 1}</a></p>`
        }
        setModalContent('Saved Memes', htmlStr)
        document.querySelector('.down-uplod-share').style.display = 'none';
    }
    toggleInfoModal()
}
//load specific meme btn//
function onLoadSavedMeme(key) {
    loadMemeFromStorage(key)
    return false
}

//save btn//
function onSaveMeme() {
    var isSaved = saveMemeToStorage()
    if (isSaved) setModalContent('Meme Saved!')
    else setModalContent('Sorry, no more free space',
        '<a onmousedown="onSaveInsteadLastItem()">Click</a> to save instead last item')
    document.querySelector('.down-uplod-share').style.display = 'none';
    toggleInfoModal()
}

//save instead last item btn//
function onSaveInsteadLastItem() {
    saveMemeInsteadLastItem()
    setModalContent('Meme Saved!')
}
//save instead last item btn//
function onSaveInsteadLastItem() {
    saveMemeInsteadLastItem()
    setModalContent('Meme Saved!')
}

//show share up/download btn//
function onShareBtn() {
    setModalContent()
    toggleInfoModal()
    document.querySelector('.down-uplod-share').style.display = 'block';
    document.querySelector('.info-modal-header').innerText = ''
    document.querySelector('.info-modal-paragraph').innerText = ''
}


//-----TEXT WRITING-----//

function drawAllLinesText() {
    for (var i = 0; i < memeGetlinesLength(); i++) {
        var currLineText = memeGetLineTxt(i)
        var currCoorX = memeGetLineCoorXForDisplay(i)
        var currCoorY = memeGetLineCoorYForDisplay(i)
        var curFontSize = memeGetLineFontSize(i)
        var curTextAlign = memeGetLineAlign(i)
        var curfontType = memeGetLineFont(i)
        var curStrokeColor = memeGetLineStrokeColor(i)
        var curFillColor = memeGetLineFillColor(i)
        drawText(currCoorX, currCoorY, currLineText,
            curFontSize, curfontType, curTextAlign,
            curStrokeColor, curFillColor)
    }
    document.querySelector('#main-canvas').style = 'cursor: pointer;'
}

function drawText(x, y, text, fontSize, fontType,
    align, strokeColor, fillColor) {
    ctxSetFont(fontSize, fontType)
    ctxSetAlign(align)
    ctxSetStrokeStyle(strokeColor)
    ctxSetFillStyle(fillColor)
    ctxSetLineWidth(2)
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


//-----USER INPUT-----//

function cleanUserInput() {
    var elInputTxt = document.querySelector('.input-text')
    elInputTxt.value = '';
}

function setFocusToUserInput() {
    debugger
    document.querySelector('.input-text').focus();
}

function setUserInputDirection(direction) {  // BUG!
    var elInputTxt = document.querySelector('.input-text')
    elInputTxt.style.direction = direction;
}

//-----INFO MODAL-----//

function toggleInfoModal() {
    var elModal = document.querySelector('.info-modal')
    if (elModal.style.display === 'none' ||
        elModal.style.display.length === 0) elModal.style.display = 'block'
    else elModal.style.display = 'none'
}

function setModalContent(headerTxt, paragTxt) {
    var elModalHeader = document.querySelector('.info-modal-header')
    var elModalParagraph = document.querySelector('.info-modal-paragraph')
    if (!headerTxt || headerTxt.length === 0) {
        elModalHeader.innerText = ''
        return
    }
    else elModalHeader.innerText = headerTxt;
    if (!paragTxt || paragTxt.length === 0) {
        elModalParagraph.innerHTML = ''
        return
    } else {
        elModalParagraph.innerHTML = paragTxt
    }
}




