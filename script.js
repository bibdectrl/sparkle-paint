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
                if (this.grid[i][j] == 1){
                    fill(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 1);//Math.random());
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

function setup(){
    width = 100;
    height = 50;
    cellsize = 10;
    createCanvas(width*cellsize, height*cellsize);
    colorMode(HSB);
    antWorld = new AntWorld(width, height);
    reset = createButton('reset');
    erase = createButton('erase');
    paint = createButton('paint');
    reset.position(20, 600);
    reset.mousePressed(function(){ antWorld.reset() });
    erase.position(90, 600);
    paint.position(90, 600);
    paint.hide();
    erase.mousePressed(function(){ antWorld.toggle() });
    paint.mousePressed(function(){ antWorld.toggle() });

}

function draw(){
    background(0);
    if (mouseIsPressed){
        var x = Math.max(0, Math.floor(mouseX / cellsize));
        var y = Math.max(0, Math.floor(mouseY / cellsize));
        if (antWorld.painting){ 
            if (antWorld.grid[x][y] == 0){
            antWorld.grid[x][y] = 1;
            }
        } else {
            if (antWorld.grid[x][y] == 1){
              antWorld.grid[x][y] = 0;
            }

        }
    }
    antWorld.draw();
}
