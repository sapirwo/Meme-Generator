'use-strict';

function onInit() {
    onGallery()
    getImgesForDisplay()
    renderImges()
    renderKeywordsInputSuggest()
    setKeywordsRating()
    renderTopKeywords()
}

function onGallery() {
    var elMemePanelsContainer = document.querySelector('.meme-panels-container');
    var elMainGalleryContainer = document.querySelector('.main-gallery-container');
    var elSearchBar = document.querySelector('.search-bar');
    var elAbout = document.querySelector('.about');
    var elGalleryBtn = document.querySelector('.gallery-btn-main-header')
    elGalleryBtn.classList.add("active")
    elMemePanelsContainer.style.display = "none";
    elMainGalleryContainer.style.display = "grid";
    elSearchBar.style.display = "block"
    elAbout.style.display = "grid"
    cleanUserInput()
}

function onKeywordSelect(keyword) {
    renderImges(keyword)
}

// ------------RENDERING---------------//

function renderImges(keyword) {
    // renderTopKeywords()
    var elMainGalleryContainer = document.querySelector('.main-gallery-container');
    const imgs = getImgesForDisplay(keyword)
    var htmlStr = ``;
    for (var i = 0; i < imgs.length; i++) {
        htmlStr += `<img src="${imgs[i].url}" onclick="onOpenMemeEditor(${imgs[i].id})" alt="Meme Photo"></img>`
    }
    elMainGalleryContainer.innerHTML = htmlStr;
}

function renderKeywordsInputSuggest() {
    var htmlStr = '';
    for (const key in gKeywords) {
        htmlStr += `<option value="${key}"</option>`
    }
    document.querySelector('#key-words').innerHTML = htmlStr;
}

function renderTopKeywords() {
    var elFavSearchWords = document.querySelector('.favorite-search-words')
    var htmlStr = '';
    var top3Words = getTop3Keywords()
    for (var i = 0; i < 3; i++) {
        htmlStr += `<span class="top-keyword top-word-${i + 1}" onclick="renderImges('${top3Words[i][0]}')">${top3Words[i][0]}</span>`
    }
    htmlStr += `<span class="top-keyword see-all-photos" onclick="renderImges()">All</span>`
    elFavSearchWords.innerHTML = htmlStr;
    setTopKeywordsFontSize(top3Words)
}

function setTopKeywordsFontSize(top3Words) {
    for (var i = 0; i < 3; i++) {
        var fontSize = 2;
        var currRate = top3Words[i][1];
        if (currRate > 10) fontSize = 0
        document.querySelector(`.top-word-${i + 1}`).style.fontSize = `${currRate / fontSize}rem`
    }
}