var matriceSobelHoriz = [
  //Ligne1
  new MatricCoef(-1, -1, -1),
  new MatricCoef(-2, 0, -1),
  new MatricCoef(-1, 1, -1),
  //Ligne2
  new MatricCoef(0, -1, 0),
  new MatricCoef(0, 0, 0),
  new MatricCoef(0, 1, 0),
  //Ligne3
  new MatricCoef(1, -1, 1),
  new MatricCoef(2, 0, 1),
  new MatricCoef(1, 1, 1)
];
var matriceSobelVert = [
  //Ligne1
  new MatricCoef(-1, -1, -1),
  new MatricCoef(0, 0, -1),
  new MatricCoef(1, 1, -1),

  //Ligne2
  new MatricCoef(-2, -1, 0),
  new MatricCoef(0, 0, 0),
  new MatricCoef(2, 1, 0),

  //Ligne3
  new MatricCoef(-1, -1, 1),
  new MatricCoef(0, 0, 1),
  new MatricCoef(1, 1, 1)
];
var matricenetete = [
  //Ligne1
  new MatricCoef(0, -1, -1),
  new MatricCoef(-1, 0, -1),
  new MatricCoef(0, 1, -1),

  //Ligne2
  new MatricCoef(-1, -1, 0),
  new MatricCoef(5, 0, 0),
  new MatricCoef(-1, 1, 0),

  //Ligne3
  new MatricCoef(0, -1, 1),
  new MatricCoef(-1, 0, 1),
  new MatricCoef(0, 1, 1)
];
