class Pixel {
  constructor(rouge = 0, vert = 0, bleu = 0, opacite = 0) {
    this.rouge = rouge;
    this.bleu = bleu;
    this.vert = vert;
    this.opacite = opacite;
  }
}
class MatricCoef {
  constructor(value, posx, posy) {
    this.value = value;
    this.posx = posx;
    this.posy = posy;
  }
}
class Texte {
  constructor(
    text,
    posx = 10,
    posy = 10,
    taille = 12,
    color = "#000",
    fontFamily = "sans-serif",
    align = "start"
  ) {
    this.text = text;
    this.posx = posx;
    this.posy = posy;
    this.taille = taille;
    this.color = color;
    this.fontFamily = fontFamily;
    this.align = align;
  }
  print(ctx) {
    ctx.font = this.taille + "px "+ this.fontFamily;
    ctx.fillStyle = this.color;
    ctx.textAlign=this.align;
    ctx.fillText(this.text, this.posx, this.posy);
  }
}
