function placeButton(x, y, id) {
  //https://stackoverflow.com/questions/4814997/javascript-absolute-positioning 
  var button1 = document.createElement('button');
      button1.id = id;
      button1.style.position = 'absolute';
      button1.style.left = x;
      button1.style.top = y;
      button1.style.width = '50px';
      button1.style.height = '20px';
      button1.innerHTML = id
      document.body.appendChild(button1);
}

var board = {
  //https://www.w3schools.com/graphics/game_intro.asp 
  //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
    start : function() {
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      ctx.strokeRect(20, 20, 120, 460);
      ctx.strokeRect(1190, 20, 120, 460);

      ctx.strokeRect(170, 40, 140, 160);
      ctx.strokeRect(170, 290, 140, 160);
      placeButton("225px", "360px", "A1");
      placeButton("225px", "400px", "B1");


      ctx.strokeRect(340, 40, 140, 160);
      ctx.strokeRect(340, 290, 140, 160);
      placeButton("395px", "360px", "A2");
      placeButton("395px", "400px", "B2");

      ctx.strokeRect(510, 40, 140, 160);
      ctx.strokeRect(510, 290, 140, 160);
      placeButton("565px", "360px", "A3");
      placeButton("565px", "400px", "B3");

      ctx.strokeRect(680, 40, 140, 160);
      ctx.strokeRect(680, 290, 140, 160);
      placeButton("735px", "360px", "A4");
      placeButton("735px", "400px", "B4");

      ctx.strokeRect(850, 40, 140, 160);
      ctx.strokeRect(850, 290, 140, 160);
      placeButton("905px", "360px", "A5");
      placeButton("905px", "400px", "B5");

      ctx.strokeRect(1020, 40, 140, 160);
      ctx.strokeRect(1020, 290, 140, 160);
      placeButton("1075px", "360px", "A6");
      placeButton("1075px", "400px", "B6");

      
    }    
}
function endGame() {
  if (checkWinner()) {
    document.getElementById("turn").innerHTML = "Game over!";
    let r = getTotals();
    document.getElementById("ranking").innerHTML = "Current ranking (A:B) =  " +r[0] +  " to " + r[1];
    if (r[0] > r[1]) {
      window.alert("Game over! Player A wins " + r[0] +  " to " + r[1]);
    }
    else if (r[0] == r[1]){
      window.alert("Game over! It's a tie " + r[0] +  " to " + r[1]);
    }
    else {
      window.alert("Game over! Player B wins " + r[0] +  " to " + r[1]);
    }
    document.getElementById("B1").disabled = true;
    document.getElementById("B2").disabled = true;
    document.getElementById("B4").disabled = true;
    document.getElementById("B3").disabled = true;
    document.getElementById("B5").disabled = true;
    document.getElementById("B6").disabled = true;
    document.getElementById("A1").disabled = true;
    document.getElementById("A2").disabled = true;
    document.getElementById("A4").disabled = true;
    document.getElementById("A3").disabled = true;
    document.getElementById("A5").disabled = true;
    document.getElementById("A6").disabled = true;
  }
}

function switchTurn(p1) {
  let r = getTotals();
  document.getElementById("ranking").innerHTML = "Current ranking (A:B) =  " +r[0] +  " to " + r[1];
  if (checkWinner()) {
    endGame();
  }
  else {
    if (p1) {
      checkWinner();

      document.getElementById("turn").innerHTML = "Currently Player A's turn";
      document.getElementById("A1").disabled = false;
      document.getElementById("A2").disabled = false;
      document.getElementById("A4").disabled = false;
      document.getElementById("A3").disabled = false;
      document.getElementById("A5").disabled = false;
      document.getElementById("A6").disabled = false;
      document.getElementById("B1").disabled = true;
      document.getElementById("B2").disabled = true;
      document.getElementById("B4").disabled = true;
      document.getElementById("B3").disabled = true;
      document.getElementById("B5").disabled = true;
      document.getElementById("B6").disabled = true;

    }
    else {
      checkWinner();

      document.getElementById("turn").innerHTML = "Currently Player B's turn";
      document.getElementById("B1").disabled = false;
      document.getElementById("B2").disabled = false;
      document.getElementById("B4").disabled = false;
      document.getElementById("B3").disabled = false;
      document.getElementById("B5").disabled = false;
      document.getElementById("B6").disabled = false;
      document.getElementById("A1").disabled = true;
      document.getElementById("A2").disabled = true;
      document.getElementById("A4").disabled = true;
      document.getElementById("A3").disabled = true;
      document.getElementById("A5").disabled = true;
      document.getElementById("A6").disabled = true;


    }
  }

}

class Slot {
  constructor(name, position, button) {
    this.num = 0;
    this.name = name;
    this.position = position;
    this.button = button;
    this.marbles = new Array (0);
  }
  increment() {
    this.num = this.num + 1;
  }
  getCount() {
    return this.num;
  }
  addMarble(m) {
    this.increment();
    let n = this.getCount();
    this.marbles[n-1] = m;
  }
  getMarbles() {
    return this.marbles;
  }
  start4(m1, m2, m3, m4) {
    this.addMarble(m1);
    this.addMarble(m2);
    this.addMarble(m3);
    this.addMarble(m4);
  }
  emptyContents() {
    this.num = 0;
    this.marbles = new Array(0);
  }
  getOpposite() {
     return 14 - this.position;
  }
}

function marble(x, y, radius, red, green, blue) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    this.red = red;
    this.green = green;
    this.blue = blue; 
    this.reload = function() {
      // let canvas = document.getElementById('canvas');
      // let ctx = canvas.getContext('2d');
      if (canvas.getContext) {
        ctx.fillStyle = 'rgb('+ red + ','+ green + ',' + blue +')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
      }
      else {
        alert("oops, canvas not loading");
      }
    },
    this.reload();
    this.clear = function() {
      ctx.clearRect(this.x - this.radius-1, this.y-this.radius-1, this.radius*2+2, this.radius*2+2);
    },
    this.move = function(x2,y2) {
      
      this.clear();
      this.x = x2;
      this.y = y2
      //window.setTimeout(()=> this.reload(), 1000);
      this.reload();

    },
    this.shift = function(x2,y2) {
      this.clear();
      this.x = this.x + x2;
      this.y = this.y + y2
      this.reload();

    }


}

function newColor() {
  return Math.floor(Math.random() * 255);
}

function movep2(slot) {
  var num = slot.getCount();
  var i;
  var playAgain = false;
  let mArr = slot.getMarbles();
  let loop = false;
  for (i = 1; i<= num; i++) {
    let position = slot.position;
    //console.log("position is " + position);
    let slotIndex = (position + i) % 14;
    if (slotIndex != 0 && loop === false) {
      var tempSlot = slotArr[slotIndex];
      tempSlot.addMarble(mArr[i-1]);

      if (tempSlot.position < 7) {
        //console.log(tempSlot.button);
        var coor = getCoor(false, tempSlot.button, tempSlot.getCount());
        //console.log(coor);
      } else  {
        var coor = getCoor(true, tempSlot.button, tempSlot.getCount());
      }
      // console.log(coor);
      mArr[i-1].move(coor[0], coor[1]);
      
    }
    else if (slotIndex == 0 || loop === true) {
      loop = true;
      let tempIndex = slotIndex + 1;
      var tempSlot = slotArr[tempIndex];
      tempSlot.addMarble(mArr[i-1]);
      let coor = getCoor(true, tempSlot.button, tempSlot.getCount());
      mArr[i-1].move(coor[0], coor[1]);

    }
    if(i == num) {
      if (slotIndex == 7)
      {
        playAgain = true;
      }
      else if (slotArr[slotIndex].getCount() == 1 && slotIndex < 7)
      {
        let pocket = slotArr[slotIndex];
        if (slotArr[pocket.getOpposite()].getCount() != 0) { 
          window.setTimeout(function(){
            let pocket = slotArr[slotIndex];
            let opposite = slotArr[pocket.getOpposite()]; //opposite is the pocket you just stole
            let n = opposite.getCount();
            var mArrO = opposite.getMarbles();
            let j = 0;
            for(j=1; j<= n; j++) {
              slotArr[7].addMarble(mArrO[j-1]);
              let coor2 = getCoor(true, b_pocket.button, b_pocket.getCount());
              mArrO[j-1].move(coor2[0], coor2[1]);
            }
            opposite.emptyContents();
  
            let temp = slotArr[slotIndex].getMarbles()
            slotArr[7].addMarble(temp[0]);
            let coor2 = getCoor(true, b_pocket.button, b_pocket.getCount());
            temp[0].move(coor2[0], coor2[1]);
            slotArr[slotIndex].emptyContents();
  
          } , 1000);       
          window.alert("You stole Player A's marbles!");
          if(checkWinner()){
            endGame();
          }
        }        
      }
    }
  }
  let r = getTotals();
  document.getElementById("ranking").innerHTML = "Current ranking (A:B) =  " +r[0] +  " to " + r[1];
  slot.emptyContents();
  turn1 = !playAgain
  if (!playAgain) {
    checkWinner();
    switchTurn(true);
  }
}

function movep1(slot) {
  var num = slot.getCount();
  var playAgain = false;
  var i;
  let mArr = slot.getMarbles();
  let loop = false;
  for (i = 1; i<= num; i++) {
    let position = slot.position;
    //console.log("position is " + position);
    let slotIndex = (position + i) % 14;
    if (slotIndex != 7 && loop === false) {
      var tempSlot = slotArr[slotIndex];
      tempSlot.addMarble(mArr[i-1]);

      if (tempSlot.position <=7 ) {
        var coor = getCoor(false, tempSlot.button, tempSlot.getCount());
      } else  {
        var coor = getCoor(true, tempSlot.button, tempSlot.getCount());
      }
      // console.log(coor);
      mArr[i-1].move(coor[0], coor[1]);
    }
    else if (slotIndex == 7 || loop === true) {
      loop = true;
      let tempIndex = slotIndex + 1;
      var tempSlot = slotArr[tempIndex];
      tempSlot.addMarble(mArr[i-1]);
      let coor = getCoor(true, tempSlot.button, tempSlot.getCount());
      mArr[i-1].move(coor[0], coor[1]);

    }
    if(i == num) {
      if (slotIndex == 0)
      {
        playAgain = true;
      }
      else if (slotArr[slotIndex].getCount() == 1 && slotIndex > 7)
      {
        let pocket = slotArr[slotIndex];
        if (slotArr[pocket.getOpposite()].getCount() != 0) { 
          window.setTimeout(function(){
            let pocket = slotArr[slotIndex];
            let opposite = slotArr[pocket.getOpposite()]; //opposite is the pocket you just stole
            let n = opposite.getCount();
            var mArrO = opposite.getMarbles();
            let j = 0;
            for(j=1; j<= n; j++) {
              slotArr[0].addMarble(mArrO[j-1]);
              let coor2 = getCoor(false, a_pocket.button, a_pocket.getCount());
              mArrO[j-1].move(coor2[0], coor2[1]);
            }
            opposite.emptyContents();
            let temp = slotArr[slotIndex].getMarbles();
            slotArr[0].addMarble(temp[0]);
            let coor2 = getCoor(false, a_pocket.button, a_pocket.getCount());
            temp[0].move(coor2[0], coor2[1]);
            slotArr[slotIndex].emptyContents();
          } , 1000);       
          window.alert("You stole Player B's marbles!");
          if(checkWinner()){
            endGame();
          }
        }
      }
    }
    
  }
  let r = getTotals();
  document.getElementById("ranking").innerHTML = "Current ranking (A:B) =  " +r[0] +  " to " + r[1];
  slot.emptyContents();
  turn1 = playAgain;
  if (!playAgain) {
    checkWinner();
    switchTurn(false);
  }
}

function getCoor(p1, slot, marble) {
  coor = new Array(2);
  if (p1) {
    if (slot === 0) {
      if (marble <= 18){
        coor[0] = 1220 + 50 * ((marble-1)%2) + 10 * Math.floor(marble/19);
        coor[1] = 450 - 50 * Math.floor((marble-1)/2) - 10 * Math.floor(marble/19);
      }
      else {
        let temp = marble - 18;
        coor[0] = 1220 + 50 * ((marble-1)%2) + 10 * Math.floor(marble/19);
        coor[1] = 450 - 50 * Math.floor((temp-1)/2) - 10 * Math.floor(temp/19);
      }
    }
    else {
      if (marble < 7){
        coor[0] =  170 * slot + 30 + 50 * ((marble-1)%2);
        coor[1] = (Math.floor((marble-1)/2)) * 50 + 70;
        // console.log("he" + slot);
      }
      else {
        coor[0] =  170*slot + 60 + 50 * ((marble-1)%2);
        coor[1] = (Math.floor((marble-7)/2)) * 50 + 70;
      }
    }
    
  }
  else {
    if (slot == 0) {
      if (slot === 0) {
        if (marble <= 18){
          coor[0] = 50 + 50 * ((marble-1)%2) + 10 * Math.floor(marble/19);
          coor[1] = 450 - 50 * Math.floor((marble-1)/2) - 10 * Math.floor(marble/19);
        }
        else {
          let temp = marble - 18;
          coor[0] = 50 + 50 * ((marble-1)%2) + 10 * Math.floor(marble/19);
          coor[1] = 450 - 50 * Math.floor((temp-1)/2) - 10 * Math.floor(temp/19);
        }
      }
    }
    else {
      if (marble < 7){
        coor[0] =  170*slot + 30 + 50 * ((marble-1)%2);
        coor[1] = (Math.floor((marble-1)/2)) * 50 + 70 + 250;
      }
      else {
        coor[0] =  170*slot + 60 + 50 * ((marble-1)%2);
        coor[1] = (Math.floor((marble-7)/2)) * 50 + 70 + 250;
      }
    }
  }
  return coor;
}

function getTotals() {
  var total = new Array(2)
  total[0] = a_pocket.getCount();
  total[1] = b_pocket.getCount();
  return total;
}

function checkWinner() {
  var i = 1;
  var a_marb = 0;
  var b_marb = 0;
  for (i=1; i< 7; i++) {
    b_marb += slotArr[i].getCount();
  }
  for (i=8; i< 14; i++) {
    a_marb += slotArr[i].getCount();
  }

  if (a_marb == 0) {
    for (i=1; i< 7; i++) {
      var n = slotArr[i].getCount();
      var mArr = slotArr[i].getMarbles();
      var j;
      for (j=1; j<=n; j++) {
        slotArr[7].addMarble(mArr[j-1]);
        let coor = getCoor(true, b_pocket.button, b_pocket.getCount());
        mArr[j-1].move(coor[0], coor[1]);
      }
      slotArr[i].emptyContents();
    }
    //console.log("b was moved");
    return true;
  }
  else if (b_marb == 0) {
    for (i=8; i<= 13; i++) {
      var n = slotArr[i].getCount();
      var mArr = slotArr[i].getMarbles();
      var j;
      for (j=1; j<=n; j++) {
        slotArr[0].addMarble(mArr[j-1]);
        let coor = getCoor(false, a_pocket.button, a_pocket.getCount());
        mArr[j-1].move(coor[0], coor[1]);
      }
      slotArr[i].emptyContents();
    }
    //console.log("a was moved");

    return true;
  }
  else {
    return false;
  }

}

function setUp(){
    document.getElementById("A1").addEventListener("click", () => movep1(s13));
    document.getElementById("A2").addEventListener("click", () => movep1(s12));
    document.getElementById("A3").addEventListener("click", () => movep1(s11));
    document.getElementById("A4").addEventListener("click", () => movep1(s10));
    document.getElementById("A5").addEventListener("click", () => movep1(s9));
    document.getElementById("A6").addEventListener("click", () => movep1(s8));
    document.getElementById("B1").addEventListener("click", () => movep2(s1));
    document.getElementById("B2").addEventListener("click", () => movep2(s2));
    document.getElementById("B3").addEventListener("click", () => movep2(s3));
    document.getElementById("B4").addEventListener("click", () => movep2(s4));
    document.getElementById("B5").addEventListener("click", () => movep2(s5));
    document.getElementById("B6").addEventListener("click", () => movep2(s6)); 
}

board.start();
var x = 200;
var y = 70;
//test = new marble(x + 80, y+20, 20, 0, 0, 0);
a11 = new marble(x, y, 20, newColor(), newColor(), newColor());
a12 = new marble(x+50, y, 20,newColor(), newColor(), newColor());
a13 = new marble(x, y+50, 20, newColor(), newColor(), newColor());
a14 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b11 = new marble(x, y+250, 20, newColor(), newColor(), newColor());
b12 = new marble(x+50, y+250, 20,newColor(), newColor(), newColor());
b13 = new marble(x, y+300, 20, newColor(), newColor(), newColor());
b14 = new marble(x+50, y+300, 20, newColor(), newColor(), newColor());
x+= 170;
a21 = new marble(x, y, 20, newColor(), newColor(), newColor());
a22 = new marble(x+50, y, 20,newColor(), newColor(), newColor());
a23 = new marble(x, y+50, 20, newColor(), newColor(), newColor());
a24 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b21 = new marble(x, y+250, 20, newColor(), newColor(), newColor());
b22 = new marble(x+50, y+250, 20,newColor(), newColor(), newColor());
b23 = new marble(x, y+300, 20, newColor(), newColor(), newColor());
b24 = new marble(x+50, y+300, 20, newColor(), newColor(), newColor());

x+= 170;
a31 = new marble(x, y, 20, newColor(), newColor(), newColor());
a32 = new marble(x+50, y, 20,newColor(), newColor(), newColor());
a33 = new marble(x, y+50, 20, newColor(), newColor(), newColor());
a34 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b31 = new marble(x, y+250, 20, newColor(), newColor(), newColor());
b32 = new marble(x+50, y+250, 20,newColor(), newColor(), newColor());
b33 = new marble(x, y+300, 20, newColor(), newColor(), newColor());
b34 = new marble(x+50, y+300, 20, newColor(), newColor(), newColor());



x+= 170;
a41 = new marble(x, y, 20, newColor(), newColor(), newColor());
a42 = new marble(x+50, y, 20,newColor(), newColor(), newColor());
a43 = new marble(x, y+50, 20, newColor(), newColor(), newColor());
a44 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b44 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b41 = new marble(x, y+250, 20, newColor(), newColor(), newColor());
b42 = new marble(x+50, y+250, 20,newColor(), newColor(), newColor());
b43 = new marble(x, y+300, 20, newColor(), newColor(), newColor());
b44 = new marble(x+50, y+300, 20, newColor(), newColor(), newColor());

x+= 170;
a51 = new marble(x, y, 20, newColor(), newColor(), newColor());
a52 = new marble(x+50, y, 20,newColor(), newColor(), newColor());
a53 = new marble(x, y+50, 20, newColor(), newColor(), newColor());
a54 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b54 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b51 = new marble(x, y+250, 20, newColor(), newColor(), newColor());
b52 = new marble(x+50, y+250, 20,newColor(), newColor(), newColor());
b53 = new marble(x, y+300, 20, newColor(), newColor(), newColor());
b54 = new marble(x+50, y+300, 20, newColor(), newColor(), newColor());

x+= 170;
a61 = new marble(x, y, 20, newColor(), newColor(), newColor());
a62 = new marble(x+50, y, 20,newColor(), newColor(), newColor());
a63 = new marble(x, y+50, 20, newColor(), newColor(), newColor());
a64 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b64 = new marble(x+50, y+50, 20, newColor(), newColor(), newColor());
b61 = new marble(x, y+250, 20, newColor(), newColor(), newColor());
b62 = new marble(x+50, y+250, 20,newColor(), newColor(), newColor());
b63 = new marble(x, y+300, 20, newColor(), newColor(), newColor());
b64 = new marble(x+50, y+300, 20, newColor(), newColor(), newColor());

var s13 = new Slot("A1", 13, 1);
var s12 = new Slot("A2", 12, 2);
var s11= new Slot("A3", 11, 3);
var s10= new Slot("A4", 10, 4);
var s9= new Slot("A5", 9, 5);
var s8 = new Slot("A6", 8, 6);
var s1 = new Slot("B1", 1,1 );
var s2 = new Slot("B2", 2, 2);
var s3 = new Slot("B3", 3, 3);
var s4 = new Slot("B4", 4, 4);
var s5 = new Slot("B5", 5, 5);
var s6 = new Slot("B6", 6, 6);
var a_pocket = new Slot("AP", 0, 0);
var b_pocket = new Slot("BP", 7, 0);

s13.start4(a11, a12, a13, a14);
s12.start4(a21, a22, a23, a24);
s11.start4(a31, a32, a33, a34);
s10.start4(a41, a42, a43, a44);
s9.start4(a51, a52, a53, a54);
s8.start4(a61, a62, a63, a64);

s1.start4(b11, b12, b13, b14);
s2.start4(b21, b22, b23, b24);
s3.start4(b31, b32, b33, b34);
s4.start4(b41, b42, b43, b44);
s5.start4(b51, b52, b53, b54);
s6.start4(b61, b62, b63, b64);

var slotArr = [a_pocket, s1, s2, s3, s4, s5, s6, b_pocket, s8, s9, s10, s11, s12, s13];
var turn1 = true;
setUp();
switchTurn(true);



