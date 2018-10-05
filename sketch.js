function setup() {
  createCanvas(800,800);
  maze = new Maze(800,800,40,[0,0,255],[0,255,0]);//los arreglos estos no estan respetando RGB
}

function draw() {
	maze.generate()
	maze.show()
}