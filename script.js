function AntWorld(width, height){
    this.width = width;
    this.height = height;
    this.grid = [];
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
var button;

function setup(){
    width = 100;
    height = 50;
    cellsize = 10;
    createCanvas(width*cellsize, height*cellsize);
    colorMode(HSB);
    antWorld = new AntWorld(width, height);
    button = createButton('reset');
    button.position(20, 600);
    button.mousePressed(function(){ antWorld.reset() });
}

function draw(){
    background(0);
    if (mouseIsPressed){
        var x = Math.max(0, Math.floor(mouseX / cellsize));
        var y = Math.max(0, Math.floor(mouseY / cellsize));
        try { 
            antWorld.grid[x][y] = 1;
        } catch (e) { console.log(e)}
    }
    antWorld.draw();
}