import { load_data } from '../lib'
import { type Pos, Direction } from './tools.ts'
import { search_grid, rotate_guard, direction_coord, valid_coord } from './tools.ts'

// Load Data
// const data = (await load_data("./06/data.txt")).map(x => x.split(''))
const data = (await load_data("./06/demo-data.txt")).map(x => x.split(''))
const grid = JSON.parse(JSON.stringify(data)); // Deep Copy

// TASK 1
let visited = new Set();
let visual = JSON.parse(JSON.stringify(data)); // Deep Copy
let guard: Pos = search_grid(grid, "^");
let current_direction = Direction.N;

while(valid_coord(guard.x, guard.y, grid.length, grid.length)){
    visited.add(`${guard.x},${guard.y}`)
    visual[guard.y][guard.x] = "X"
    let diff = direction_coord(current_direction);

    let next: Pos = {
      x: guard.x + diff.x,
      y: guard.y + diff.y,
    };

    if (valid_coord(next.x, next.y, grid.length, grid.length) && grid[next.y][next.x] === "#") {
        current_direction = rotate_guard(current_direction);
    } else {
        guard = next;
    }
}

// Print Small Scale
for(const line of visual){
    console.log(line.join(''))
}
console.log("Part 1:", visited.size)

// TASK 2
const isLoop = (grid) => {
    let visited = new Set();
    let visual = JSON.parse(JSON.stringify(data)); // Deep Copy
    let guard: Pos = search_grid(grid, "^");
    let current_direction = Direction.N;

    while(valid_coord(guard.x, guard.y, grid.length, grid.length)){
        const key = `${guard.x},${guard.y},${current_direction}`
        if(visited.has(key)) return true;
        visited.add(key)

        visual[guard.y][guard.x] = "X"
        let diff = direction_coord(current_direction);

        let next: Pos = {
          x: guard.x + diff.x,
          y: guard.y + diff.y,
        };

        if (valid_coord(next.x, next.y, grid.length, grid.length) && (grid[next.y][next.x] === "#" || grid[next.y][next.x] === "O") ) {
            current_direction = rotate_guard(current_direction);
        } else {
            guard = next;
        }
    }

    return false
}

const obj_locations = new Set();
for (let x = 0; x < grid[0].length; x++){
    for (let y = 0; y < grid.length; y++){
        if(grid[y][x] !== ".") continue;


        let new_grid = JSON.parse(JSON.stringify(data));
        new_grid[y][x] = "O"
        
        //====
        // console.clear();
        // console.log(`${x}/${grid[0].length-1}\n${y}/${grid.length-1}`)
        // for(const line of new_grid) console.log(line.join(''));
        // console.log()
        //====
        
        if(isLoop(new_grid)){
            obj_locations.add(`${x},${y}`)
        }
    }
}

console.log("Part 2:", obj_locations.size)