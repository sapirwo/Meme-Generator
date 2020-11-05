'use-strict';

var gKeywords = { 'happy': 12, 'funny': 1, 'cool': 2, 'amazing': 3, 'boring': 2, 'confusing': 2, 'excited': 2 }
var gPhotosNum = 18;
var gImgs = [];
var gIsMobileMenu = false;
var gMobileMenuToggle = false;

// ---------MODAL SETTER-------//

function getImgesForDisplay(keyword) {
    if (!gImgs || gImgs.length === 0) {
        createImges()
        return gImgs
    }
    else {
        if (keyword) {
            gKeywords[keyword]++
            return gImgs.filter(img => img.keywords.includes(keyword))
        }
        else return gImgs
    }
}


function createImges(photosNum = gPhotosNum) {
    for (var i = 0; i < photosNum; i++)
        createImg(i, `img/meme-imgs (square)/${i + 1}.jpg`)
}

function createImg(id, url, keywords = [getRandomKeyword()]) {
    var img = {
        id,
        url,
        keywords,
    }
    gImgs.push(img);
}


function setKeywordsRating() {
    var allKeywords = [];
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            allKeywords.push(gImgs[i].keywords[j])
        }
    }
    var keywords = {}
    for (var i = 0; i < allKeywords.length; i++) {
        var curKeyword = allKeywords[i]
        if (!keywords[curKeyword]) keywords[curKeyword] = 1
        else keywords[curKeyword]++


    }
    gKeywords = keywords
}

// ---------MODAL GETTER-------//

function getRandomKeyword() {
    var randomKeywordIdx = getRandomIntInclusive(0, Object.keys(gKeywords).length - 1);
    return Object.keys(gKeywords)[randomKeywordIdx];
}



// --------MOBILE MENU-----------//


// --------check width-----------//
function setMobileMenu(maxWidth) {
    if (maxWidth.matches) gIsMobileMenu = true;
    else {
        gIsMobileMenu = false;
        document.querySelector('.main-menu-wrapper ul').style.transform = 'none';
    }
}

var maxWidth = window.matchMedia("(max-width: 750px)")
setMobileMenu(maxWidth)
maxWidth.addListener(setMobileMenu)

// --------toggle menu-----------//
function toggleMobileMenu() {
    if (!gIsMobileMenu) return
    if (!gMobileMenuToggle) {
        document.querySelector('.main-menu-wrapper ul').style.transform = 'translateY(2.6%)';
        gMobileMenuToggle = true;
    } else {
        document.querySelector('.main-menu-wrapper ul').style.transform = 'translateY(-110%)';
        gMobileMenuToggle = false;
    }
}

// --------KeyWords-----------//
function getTop3Keywords() {
    var keywordsByRate = []
    for (key in gKeywords) {
        keywordsByRate.push([key, gKeywords[key]])
    }
    keywordsByRate.sort(function (rate, nextRate) {
        return rate[1] - nextRate[1];
    })
    var top3Rated = []
    for (var i = 0; i < 3; i++) {
        top3Rated.push(keywordsByRate[keywordsByRate.length - (i + 1)])
    }
    return top3Rated
}

