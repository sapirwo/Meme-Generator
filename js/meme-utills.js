'use strict';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-----Storage Service-----//

function saveToStorage(key, val) {
  var str = JSON.stringify(val);
  localStorage.setItem(key, str)
}

function loadFromStorage(key) {
  var str = localStorage.getItem(key);
  var val = JSON.parse(str)
  return val;
}

// ---------MEME STORAGE-----------//

// ----saved memes for display---//
function getNumOfSavedMemes() {
  var numOfSavedMemes = 0;
  for (var i = 0; i < 3; i++) {
    var loadedMeme = loadFromStorage(`Meme ${i + 1}`)
    if (!loadedMeme || loadedMeme.length === 0) continue
    else {
      numOfSavedMemes++
    }
  }
  return numOfSavedMemes
}

function getFreeKey() {
  var numOfSavedMemes = getNumOfSavedMemes()
  if (numOfSavedMemes >= 3) return
  else return `Meme ${numOfSavedMemes + 1}`
}

// ----save meme---//
function saveMemeToStorage() {
  var numOfSavedMemes = getNumOfSavedMemes()
  if (numOfSavedMemes >= 3) {
    return false
  } else {
    var key = getFreeKey()
    saveToStorage(key, gMeme);
    return true
  }
}

function loadMemeFromStorage(key) {
  var loadedMeme = loadFromStorage(key)
  gMeme = loadedMeme
  renderMeme()
}

function emoveMemeFromStorage(key) {
  localStorage.removeItem(key)
}

function saveMemeInsteadLastItem() {
  saveToStorage('Meme 3', gMeme)
}

// ---------MEME UPLOAD/ DOWNLOAD / SHARE-----------//

function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share   
      </a>`
  }
  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch('http://ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
    })
    .then(function (res) {
      return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err)
    })
}

function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
  document.querySelector('.share-container').innerHTML = ''
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result;
  }
  reader.readAsDataURL(ev.target.files[0]);
}