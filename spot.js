class Spot
{
	constructor(x,y,w,spotColor,i,j)
	{
		this.x = x
		this.y = y
		this.w = w
		this.i = i
		this.j = j
		this.spotColor = spotColor
		this.neighbors = []
		this.unvisitedNeighbors = []
		this.visited = false
		this.up = true
		this.down = true
		this.left = true
		this.right = true
	}

	addNeighbors(neighbors)
	{
		this.neighbors = neighbors		
	}

	show()
	{
		noStroke()
		if(this.visited) fill(255,0,0)
		else fill(this.spotColor[0],this.spotColor[1],this.spotColor[2])
		rect(this.x,this.y,this.w,this.w)
		this.showWalls()
	}

	showWalls()
	{
		stroke(255);
		if(this.up) line(this.x,this.y,this.x + this.w,this.y)
		if(this.down) line(this.x,this.y + this.w,this.x + this.w,this.y + this.w)
		if(this.left) line(this.x,this.y,this.x,this.y + this.w)
		if(this.rigth) line(this.x + this.w,this.y,this.x + this.w,this.y + this.w)
	}

	showCurrent(currentColor)
	{
		fill(currentColor[0],currentColor[1],currentColor[2])
		rect(this.x,this.y,this.w,this.w)
	}

	hasNeighbors()
	{
		for (let i = 0; i < this.neighbors.length; i++) 
		{
			if (!this.neighbors[i].visited) return true;
		}
		return false
	}

	//NEGRADA
	chooseNeighbor()
	{
		this.selectUnvisitedNeighbors()
		let i = floor(random(0, this.unvisitedNeighbors.length))
		return this.unvisitedNeighbors[i]
	}
	
	selectUnvisitedNeighbors()
	{
		this.unvisitedNeighbors = []
		
		for (let i = 0; i < this.neighbors.length; i++) 
		{
			if (!this.neighbors[i].visited) this.unvisitedNeighbors.push(this.neighbors[i]);
		}
	}	

	visit()
	{
		this.visited = true
	}

	destroyUpWall()
	{
		this.up = false
	}

	destroyDownWall()
	{
		this.down = false
	}

	destroyLeftWall()
	{
		this.left = false
	}

	destroyRightWall()
	{
		this.right = false
	}
}