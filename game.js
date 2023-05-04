const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
//w = oben, s = unten, d = rechts, a = links

class Field {
  constructor(field, startY, startX) {
    this.field = field;
    this.posY = startY; //positionen nach unten/oben
    this.posX = startX; //positionen nach rechts/links
  }

  print() {
  this.field.forEach(element => console.log(element.join('')));
  }

  movePlayer(move) {
    let newPosY = this.posY;
    let newPosX = this.posX
    if (move === 'w') {
      newPosY -= 1;
    } else if (move === 's') {
      newPosY += 1;
    } else if (move === 'd') {
      newPosX += 1;
    } else if (move === 'a') {
      newPosX -= 1;
    } else {
      console.log('please take w, s, d or a');
    }
    if (newPosY < 0 || newPosY >= this.field.length || newPosX < 0 || newPosX >= this.field.length) {
      console.log('You are out of field!');
      return;
  }

  this.posY = newPosY;
  this.posX = newPosX;

  if (this.field[this.posY][this.posX] === hole) {
      console.log('You lose!');
      return;
 } else if (this.field[this.posY][this.posX] === hat) {
      console.log('You won!');
      return;
 } else {
  this.field[this.posY].splice(this.posX, 1, pathCharacter);
  } 
 }

 gameStatus() {
   if (this.field[this.posY][this.posX] === hole) {
     return false;
   } else if (this.field[this.posY][this.posX] === hat) {
     return false;
   } else {
     return true;
   }
 }

 playGame() {
   while (this.gameStatus()) {
     this.print();
     const move = prompt('w = oben, s = unten, d = rechts, a = links');
     this.movePlayer(move);
    }
  }

static generateField(height, width, holePercentage) {
     const field = [];
     for (let i = 0; i < height; i++) {
       const row = [];
       for (let j = 0; j < width; j++) {
         const randomNumber = Math.random();
         if (randomNumber < holePercentage) {
           row.push(hole);
         } else {
           row.push(fieldCharacter);
         }
       }
       field.push(row);
     }
     const startY = Math.floor(Math.random() * height);
     const startX = Math.floor(Math.random() * width);
     field[startY][startX] = pathCharacter;

     let hatY, hatX;
     do {
       hatY = Math.floor(Math.random() * height);
       hatX = Math.floor(Math.random() * width);
     } while (hatY === startY && hatX === startX);
     field[hatY][hatX] = hat;
     return {
       field: field,
       startY: startY,
       startX: startX
     };
  }
};


//height = Hoehe des Spielfeldes
//width = Breite des Spielfeldes
//holePercentage = 0.1 => 10% ... 1 => 100%
// Waehle selbst!!!
const generateField = Field.generateField(5, 5, 0.2)
const myField = new Field(generateField.field, generateField.startY, generateField.startX);

myField.playGame();