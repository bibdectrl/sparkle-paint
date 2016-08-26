function Pixel(x, y) {
    this.x = x;
    this.y = y;
    this.maxR = redSlider.value();
    this.maxG = greenSlider.value();
    this.maxB = blueSlider.value();
    
    this.show = function(){
        fill(Math.floor(Math.random() * this.maxR), Math.floor(Math.random() * this.maxG), Math.floor(Math.random() * this.maxB));
        rect(this.x * cellsize, this.y*cellsize, cellsize, cellsize);
    }
    
}



function AntWorld(width, height){
    this.width = width;
    this.height = height;
    this.grid = [];
    this.painting = true;
    for (var i = 0; i < this.width; i++){
        this.grid.push([]);
        for (var j = 0; j < this.height; j++){
            this.grid[i][j] = 0;
        }
    }
    
    this.draw = function(){
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                if (this.grid[i][j] !== 0){
                    this.grid[i][j].show();
                    rect(i*cellsize, j*cellsize, cellsize, cellsize);
                }
            }
        }
    };
    
    this.toggle = function(){
        if (this.painting){
          this.painting = false;
          erase.hide();
          paint.show()
        } else {
          this.painting = true;
          paint.hide();
          erase.show();

        }
    };
    
    this.reset = function(){
        var newGrid = [];
        for (var i = 0; i < this.width; i++){
            newGrid.push([]);
            for (var j = 0; j < this.height; j++){
                newGrid[i][j] = 0;
            }
        }
        this.grid = newGrid;
    };
    
}

var antWorld;
var reset;
var erase;
var paint;
var width;
var height;
var cellssize;
var redSlider;
var greenSlider;
var blueSlider;

function setup(){
    width = 100;
    height = 50;
    cellsize = 10;
    createCanvas(width*cellsize, height*cellsize).parent("canvasGoesHere");
    colorMode(RGB);
    noStroke();
    antWorld = new AntWorld(width, height);
    reset = createButton('reset');
    erase = createButton('erase');
    paint = createButton('paint');
    reset.parent("resetButton");
    reset.mousePressed(function(){ antWorld.reset() });
    erase.parent("eraseButton");
    paint.parent("paintButton");
    paint.hide();
    erase.mousePressed(function(){ antWorld.toggle() });
    paint.mousePressed(function(){ antWorld.toggle() });
    redSlider = createSlider(0, 255, 255);
    greenSlider = createSlider(0, 255, 255);
    blueSlider = createSlider(0, 255, 255);
    redSlider.parent("red");
    greenSlider.parent("green");
    blueSlider.parent("blue");

}

function draw(){
    background(0);
    if (mouseIsPressed){
        var x = Math.max(0, Math.floor(mouseX / cellsize));
        var y = Math.max(0, Math.floor(mouseY / cellsize));
        if (antWorld.painting){
            antWorld.grid[x][y] = new Pixel(x, y);
        } else {
            if (antWorld.grid[x][y] !== 0){
              antWorld.grid[x][y] = 0;
            }

        }
    }
    antWorld.draw();
}
