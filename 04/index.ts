const file = Bun.file("./04/data.txt");
const input = await file.text();
const data = input.split("\r\n").map(x => x)

let puzzle = data.map(line => line.split(''));

// ------------------------------------
// Task 1
// 
// NOTES:
// Lines of 140
// ------------------------------------

const valid_coord = (x:number, y:number, max_grid_x:number, max_grid_y:number) => {
    return (x >= 0 && x < max_grid_x && y >= 0 && y < max_grid_y);
}

const search_word = (index: number, grid: string[][], word: string, x: number, y: number, dirX: number, dirY: number) => {
	if(index == word.length) return true;

	if (valid_coord(x, y, 140, 140) && word[index] === grid[x][y])
		return search_word(index+1, grid, word, x + dirX, y + dirY, dirX, dirY)

	return false;
}

const word = "XMAS"

let coords = []
// Directions
const direction_x = [-1, -1, -1,  0, 0,  1, 1, 1];
const direction_y = [-1,  0,  1, -1, 1, -1, 0, 1];

for(let row = 0; row < puzzle.length; row++){
	for(let col = 0; col < puzzle.length; col++){
		// Directions
		for (let d = 0; d < 8; d++) {
			if(search_word(0, puzzle, word, row, col, direction_x[d], direction_y[d])){
				coords.push([row, col])
			}
		}
	}
}

console.log("Task 1:", coords.length)
// ------------------------------------
// Task 2
// ------------------------------------

coords = []
const directions = [
	[-1, -1],	// Top Left
	[-1,  1],	// Top Right
	[ 1,  1],	// Down Left
	[ 1, -1] 	// Down Right
]


for (let row = 0; row < puzzle.length; row++){
	for (let col = 0; col < puzzle.length; col++){
		if(puzzle[row][col] == "A"){
			if(
				valid_coord(row - 1, col - 1, 140, 140) &&
				valid_coord(row - 1, col + 1, 140, 140) &&
				valid_coord(row + 1, col + 1, 140, 140) &&
				valid_coord(row + 1, col - 1, 140, 140)
			){
				const bak = puzzle[row-1][col-1] + puzzle[row+1][col+1]
				const fwd = puzzle[row-1][col+1] + puzzle[row+1][col-1]

				if(
					(bak === "MS" || bak === "SM") &&
					(fwd === "MS" || fwd === "SM")
				){
					coords.push([row, col])
				}
			}
		}
	}
}

console.log("Task 2:", coords.length)

// ---------------------------------
// REFERENCES
// Word Search Algorithm 
// 		https://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/
// ---------------------------------