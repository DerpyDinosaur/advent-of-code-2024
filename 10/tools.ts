export type Pos = {
    x: number;
    y: number;
}


type Bounds = {
    width: number;
    height: number;
}


export enum Direction {
  N,
  E,
  S,
  W,
  NE,
  SE,
  SW,
  NW,
}


export const direction_offsets = new Map<Direction, Pos>([
	[Direction.N, { x: 0, y: -1 }],
	[Direction.E, { x: 1, y: 0 }],
	[Direction.S, { x: 0, y: 1 }],
	[Direction.W, { x: -1, y: 0 }],
	[Direction.NE, { x: 1, y: -1 }],
	[Direction.SE, { x: 1, y: 1 }],
	[Direction.SW, { x: -1, y: 1 }],
	[Direction.NW, { x: -1, y: -1 }]
]);


export const rotate_direction = (direction: Direction) => {
	// Only rotates 90 degrees
    direction = (direction + 1) % 4;
    return direction
}


export class Grid {
	constructor(grid: number[][]){
		this.grid = grid
		this.visual = structuredClone(grid)
	}

	get width(){
		return this.grid[0].length
	}

	get height(){
		return this.grid.length
	}

	isSafeCoord(x: number, y: number){
		return x >= 0 && x < this.width && y >= 0 && y < this.height;
	}

	value(x: number, y: number){
		if(this.isSafeCoord(x, y)){
			return this.grid[y][x]
		}
		return null
	}

	setValue(x: number, y: number, char: string|number){
		if(this.isSafeCoord(x, y)){
			this.visual[y][x] = char
		}
		return null
	}

	render() {
		this.visual.forEach(line => console.log(line.join('')))
	}
}