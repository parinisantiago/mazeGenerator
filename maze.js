class Maze
{	
	constructor(x,y,w,spotColor,currentSpotColor)
	{
		this.spotColor = spotColor
		this.currentSpotColor = currentSpotColor
		this.spotStack = []
		this.rows = floor(x / w)
		this.cols = floor(y / w)
		this.w = w
		this.spots = new Array(this.rows)
		this.buildSpots()
		this.addNeighbors()
		this.current = this.spots[0][0]
		this.neighbor = this.spots[0][0]
		this.current.visited = true;
		this.end = this.spots[this.rows - 1][this.cols - 1]
	}

	buildSpots()
	{

		for (let i = 0; i < this.rows; i++)
		{
			this.spots[i] = new Array(this.cols)
			for (let j = 0; j < this.cols; j++)
			{
				this.spots[i][j] = new Spot(i * this.w,j * this.w,this.w,this.spotColor,i,j)
			}
		}

	}

	addNeighbors()
	{
		for (let i = 0; i < this.rows; i++)
		{
			for (let j = 0; j < this.cols; j++)
			{
				let neighbors = []
				if (i+1 < this.rows) neighbors.push(this.spots[i+1][j])
				if (i-1 > -1) neighbors.push(this.spots[i-1][j])
				if (j-1 > -1) neighbors.push(this.spots[i][j-1])
				if (j+1 < this.cols) neighbors.push(this.spots[i][j+1])
				this.spots[i][j].addNeighbors(neighbors)
			}
		}
	}

	show()
	{
		for (let i = 0; i < this.rows; i++)
		{
			for (let j = 0; j < this.cols; j++)
			{
				this.spots[i][j].show()
			}
		}
		this.current.showCurrent(this.currentSpotColor)
	}	
	
	//REFACTORING URGENTE
	generate()
	{	
			if(this.currentIsLast())
			{
				noLoop(); 
				this.spots[this.rows - 1][this.cols - 1].visit()
				//estaria piola pasar el laberinto a json
			}
			else
			{
				this.current.visit();
				//se puede borrar previoyus
				if (this.current.hasNeighbors())
				{
					this.neighbor =  this.current.chooseNeighbor()
					this.destroyWalls()
					this.spotStack.push(this.current)
					this.current = this.neighbor
				}
				else this.current = this.spotStack.pop()
			}
	}

	//Los case son feos
	destroyWalls()
	{
		let coorX = this.current.i - this.neighbor.i
		let coorY = this.current.j - this.neighbor.j

		switch(true)
		{
			case (coorX == 0 && coorY == 1): 
				this.current.destroyUpWall()
				this.neighbor.destroyDownWall()
				break
			case (coorX == 0 && coorY == -1): 
				this.current.destroyDownWall()
				this.neighbor.destroyUpWall()
				break
			case (coorX == 1 && coorY == 0): 
				this.current.destroyLeftWall()
				this.neighbor.destroyRightWall()
				break
			case (coorX == -1 && coorY == 0):
			    this.current.destroyRightWall()
			    this.neighbor.destroyLeftWall()
			    break
		}
	}
	
	currentIsLast()
	{
		return (this.current.i == (this.rows - 1) &&  this.current.j == (this.cols - 1))
	}
}