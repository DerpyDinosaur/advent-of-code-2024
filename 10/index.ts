import { load_data } from '../lib'
import { type Pos, Direction } from './tools'
import { render, direction_offsets, rotate_direction, Grid } from './tools'

const demo_data = (
	await load_data("./10/demo-data.txt")).map(x => x.split('').map(Number)
)
const visual = (
	await load_data("./10/demo-data.txt")).map(x => x.split('')
)

// Part One
const grid = new Grid(demo_data);
const pos: Pos = {x:0, y:0};
const diff = direction_offsets.get(Direction.S);
let next: Pos = {
	x: pos.x + diff.x,
	y: pos.y + diff.y,
};

// console.log(grid.value(pos.x, pos.y))
// console.log(grid.isSafeCoord(0, 0))
// grid.render()
// grid.setValue(0, 0, ".")
// grid.render()

function walk(x: number, y: number, grid: Grid){
	let current_direction = Direction.N;
	let current_step = 1;
	let pos: Pos = {x, y};
	let backtrack = new Set([`${pos.x},${pos.y}`])

	while(current_step !== 9){
		const diff = direction_offsets.get(current_direction);
		const next: Pos = {
			x: pos.x + diff.x,
			y: pos.y + diff.y,
		};

		if(grid.value(next.x, next.y) === current_step+1){
			if(current_direction === Direction.N){
				grid.setValue(next.x, next.y, "^")
			}else if(current_direction === Direction.E){
				grid.setValue(next.x, next.y, ">")
			}else if(current_direction === Direction.S){
				grid.setValue(next.x, next.y, "v")
			}else if(current_direction === Direction.W){
				grid.setValue(next.x, next.y, "<")
			}
			
			current_direction = Direction.N
			pos = next;
			current_step++;
			backtrack.add(`${next.x},${next.y}`)
		}else{
			current_direction = rotate_direction(current_direction)
			
			if(!backtrack.has(`${next.x},${next.y}`)){
				grid.setValue(next.x, next.y, ".")
			}
		}
	}
}

walk(3, 0, grid)
grid.render()
// for (let x = 0; x < grid.width; x++){
// 	for (let y = 0; y < grid.height; y++){
// 		if(grid.value(x, y) === 1){
// 			walk(x, y, grid)
// 		}
// 	}
// }