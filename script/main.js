/**
 * INITIALISATION VARIABLES
 * */
var image = new Image();
var ctx;
var canvas;
var filtres;
var text;
/**
 * INITIALISATION EVENT
 * */
if (window.addEventListener) {
  document
    .querySelector("#aspect input")
    .addEventListener("change", getTof, true);
  document.querySelector(".sobel").addEventListener("click", drawCanv, true);
  document.querySelector(".netete").addEventListener("click", drawCanv, true);
  document.querySelector(".reset").addEventListener("click", reset, true);
  document
    .querySelector("input.rotate")
    .addEventListener("change", drawCanv, true);
  var textform = document.querySelectorAll(".texte input");
  textform.forEach(inputText => {
    inputText.addEventListener("input", addText, true);
  });
  var textformSelect = document.querySelectorAll(".texte select");
  textformSelect.forEach(selectText => {
    selectText.addEventListener("change", addText, true);
  });
} else if (window.attachEvent) {
  document.querySelector("#aspect input").attachEvent("change", getTof);
  document.querySelector(".sobel").attachEvent("click", drawCanv);
  document.querySelector(".netete").attachEvent("click", drawCanv);
  document.querySelector(".reset").attachEvent("click", reset);
  document.querySelector("input.rotate").attachEvent("change", drawCanv);
  var textform = document.querySelectorAll(".texte input");
  textform.forEach(inputText => {
    inputText.attachEvent("input", addText);
  });
  var textformSelect = document.querySelectorAll(".texte select");
  textformSelect.forEach(selectText => {
    selectText.attachEvent("change", addText);
  });
}

/**
 * MISE EN PLACE CANVAS
 * */
function canvasStart() {
  if (window.addEventListener) {
    window.addEventListener("resize", initCanvas, true);
    addEventListener("load", initCanvas, true);

    document.querySelector("#aspect input").addEventListener("change", getTof);
  } else if (window.attachEvent) {
    window.attachEvent("onresize", initCanvas);
    attachEvent("load", initCanvas);

    document.querySelector("#aspect input").attachEvent("change", getTof);
  }
  initCanvas();
}
function initCanvas() {
  section = document.getElementById("aspect");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = section.clientWidth;
  canvas.height = section.clientHeight;
  image.displayWidth = image.naturalWidth * (canvas.width / image.naturalWidth);
  image.displayHeight =
    image.naturalHeight * (canvas.width / image.naturalWidth);
  if (image.displayHeight > canvas.height) {
    image.displayWidth =
      image.displayWidth * (canvas.height / image.displayHeight);
    image.displayHeight =
      image.displayHeight * (canvas.height / image.displayHeight);
  }
  drawCanv();
}

/**
 * IMPORT DE L'IMAGE
 * */
function getTof() {
  readURL(this);
  document.querySelector("#aspect input").style.display = "none";
  document.querySelector("#canvas").style.display = "block";

  var inputs = document.querySelectorAll(".filter input");
  inputs.forEach(input => {
    input.addEventListener("input", addFilter);
  });
}
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      image.src = e.target.result;
      canvasStart();
    };

    reader.readAsDataURL(input.files[0]);
  }
}

/**
 * EXPORT DE L'IMAGE
 * */
function download() {
  var download = document.getElementById("export");
  var image = canvas.toDataURL();
  var aLink = document.getElementById("download");
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click");
  aLink.download = "image.jpg";
  aLink.href = image;
  console.log("i");
}

/**
 * TRAITEMENT DE L'IMAGE
 * */
function addFilter() {
  ctx.clearRect(0, 0, image.displayWidth, image.displayHeight);

  var inputs = document.querySelectorAll(".filter .rangeContainer input");
  filtres = "";
  inputs.forEach(input => {
    if (input.name == "hue-rotate") {
      filtres += input.name + "(" + input.value + "deg) ";
    } else if (input.name == "blur") {
      filtres += input.name + "(" + input.value + "px) ";
    } else {
      filtres += input.name + "(" + input.value + "%) ";
    }
  });
  drawCanv();
}
function addMatrice(matrice) {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  var pixelListe = [];
  var newPixelListe = [];
  for (let i = 0; i < data.length; i += 4) {
    let pixelItem = new Pixel(data[i], data[i + 1], data[i + 2], data[i + 3]);
    pixelListe.push(pixelItem);
  }
  for (var numLigne = 0; numLigne < imageData.height; numLigne++) {
    for (var numCollone = 1; numCollone <= imageData.width; numCollone++) {
      var newPixel = applyMatrice(
        numCollone,
        numLigne,
        matrice,
        imageData.width,
        pixelListe
      );
      newPixelListe.push(newPixel);
    }
  }

  var newData = [];
  newPixelListe.forEach(PixelItem => {
    newData.push(PixelItem.rouge);
    newData.push(PixelItem.vert);
    newData.push(PixelItem.bleu);
    newData.push(255);
  });
  var newImageData = ctx.createImageData(imageData);
  for (let index = 0; index < newData.length; index++) {
    newImageData.data[index] = newData[index];
  }
  ctx.putImageData(newImageData, 0, 0);
}
function applyMatrice(x, y, matric, widthCanv, array) {
  var PixelResult = new Pixel();
  x += 10;
  y += 10;
  matric.forEach(matricItem => {
    var tmpX = x + matricItem.posx;
    var tmpY = y + matricItem.posy;
    var pixelForMatrice = getPixelByCoord(tmpX, tmpY, widthCanv, array);
    PixelResult.rouge += pixelForMatrice.rouge * matricItem.value;
    PixelResult.vert += pixelForMatrice.vert * matricItem.value;
    PixelResult.bleu += pixelForMatrice.bleu * matricItem.value;
    PixelResult.opacite += pixelForMatrice.opacite * matricItem.value;
  });
  return PixelResult;
}
function getPixelByCoord(x, y, width, array) {
  let numpix = y * width - 1 + x;
  if (array[numpix] != undefined && array[numpix] != null) {
    return array[numpix];
  }
  return new Pixel();
}
function addText() {
  text = new Texte(
    document.querySelector(".texte input[name=text]").value,
    (document.querySelector(".texte input[name=posx]").value *
      image.displayWidth) /
      100,
    (document.querySelector(".texte input[name=posy]").value *
      image.displayHeight) /
      100,
    document.querySelector(".texte input[name=size]").value,
    document.querySelector(".texte input[name=color]").value,
    document.querySelector(".texte select#font").value,
    document.querySelector(".texte select#align").value
  );
  drawCanv();
}
function drawCanv() {
  if (document.querySelector("input[name=rotate]").value != 0) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(image.displayWidth / 2, image.displayHeight / 2);
    ctx.rotate(
      (document.querySelector("input[name=rotate]").value * Math.PI) / 180
    );
    ctx.translate(-image.displayWidth / 2, -image.displayHeight / 2);
  }
  ctx.filter = filtres;
  ctx.drawImage(image, 0, 0, image.displayWidth, image.displayHeight);
  if (document.querySelector("input[name = sobel]").checked) {
    addMatrice(matriceSobelHoriz);
    addMatrice(matriceSobelVert);
  }
  if (document.querySelector("input[name = netete]").checked) {
    addMatrice(matricenetete);
  }
  if (typeof text == "object" && text != null) {
    text.print(ctx);
  }
}
function reset() {
  document.querySelector("input[name=rotate]").value = 0;
  document.querySelector("input[name=text]").value = "";
  text = null;
  filtres = "";
  initCanvas();
}
