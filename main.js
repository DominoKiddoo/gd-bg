import * as htmlToImage from 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.13/+esm';

const div = document.getElementById('imgContainer');


var bg = document.getElementById("finbg");

const imgW = 2048; 



async function downloadImage(imageSrc) { // stolen from some random website lol
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'final-bg.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


async function copyPicture(imageSrc) { // again, stolen from some random website lmao
  try {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
    alert("image copied!");
  } catch (err) {
    console.error(err.name, err.message);
  }
};


async function getAndDownload() {
  const ogDivWidth = div.style.width;
  div.style.width = imgW + 'px';

  htmlToImage.toPng(div)
  .then(dataUrl => {
    downloadImage(dataUrl);
    div.style.width = ogDivWidth;
  })
}


async function getAndCopy() {
  const ogDivWidth = div.style.width;
  div.style.width = imgW + 'px';

  htmlToImage.toPng(div)
  .then(dataUrl => {
    copyPicture(dataUrl);
    div.style.width = ogDivWidth;
  })
}


function populateImages() {
  const selection = document.getElementById("selection");

  for (let i = 1; i < 60; i++) {
    // make option
    var option = document.createElement("option");
    option.value = "bg" + i;

    // image option
    var image =  document.createElement("img");
    image.id = "optionImage";

    var formattedNum = i.toString().padStart(2, '0');
    image.src = "resources/bg/game_bg_" + formattedNum + "_001-uhd.png";
    image.style.width = "50px";
    image.style.height = "auto";
    image.alt = "BG " + i;
    option.appendChild(image);

    // make span
    var span = document.createElement("span");
    span.className = "selectText";

    span.textContent = "bg " + i;
    option.appendChild(span);

    // add option
    selection.appendChild(option);

    selection.appendChild(document.createElement("br"));


  }
}

populateImages();

// setting events

const colInput = document.getElementById('colourInput');
const bgInput = document.getElementById('selection');

colInput.addEventListener('input', function(event) {
  console.log("hha skividi");
  var r = document.querySelector(':root');
  r.style.setProperty('--selected-colour', colInput.value);
});

bgInput.addEventListener('input', function(event) {
  var image = this.options[this.selectedIndex].querySelector('img').src;

  console.log(image);
  var r = document.querySelector(':root');
  r.style.setProperty('--selected-url', `url("${image}")`);
});


// buttons!

const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const resetBtn = document.getElementById('resetBtn');

downloadBtn.addEventListener('click', function() {
  getAndDownload();
});


copyBtn.addEventListener('click', function() {
  getAndCopy();
})

resetBtn.addEventListener('click', function() {
  colInput.value = '#287dff';
  var r = document.querySelector(':root');
  r.style.setProperty('--selected-colour', colInput.value);
})