import { load_data } from '../lib'
// const data = (await load_data("./06/data.txt")).map(x => x.split(''))
const data = (await load_data("./06/demo-data.txt")).map(x => x.split(''))

// Dimentions of sim
// 130 x 130
let sim = data;

// Guard starting position
// x=74 | y=76
// x=5  | y=7
const startX = 5-1
const startY = 7-1

const valid_coord = (x:number, y:number, max_grid_x:number, max_grid_y:number) => {
    return (x >= 0 && x < max_grid_x && y >= 0 && y < max_grid_y);
}

let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const vis_1 = structuredClone(sim);
const vis_2 = structuredClone(sim);

let x = startX;
let y = startY;
let guard_facing = 0

// ------------------------------------
// Task 1
// ------------------------------------
const answer_1 = new Set()

do {
    const [dir_y, dir_x] = directions[guard_facing];
    const next_x = x + dir_x;
    const next_y = y + dir_y;

    if (valid_coord(next_x, next_y, sim.length, sim.length) && sim[next_y][next_x] === "#") {
        // Turn right
        guard_facing = (guard_facing + 1) % directions.length;
    } else {
        answer_1.add(`${x},${y}`)
        // Move forward
        x = next_x;
        y = next_y;
    }
} while(valid_coord(x, y, sim.length, sim.length))

// Print Small Scale
for(const line of vis_1){
    console.log(line.join(''))
}
console.log("Task 1:", answer_1.size) // 4665


// ------------------------------------
// Task 2
// ------------------------------------
const answer_2 = new Set()

// const run_sim = (struct_xy:number[]) => {
// }

const state_history = new Set();

for (let x = 0; x < sim.length; x++){
    for (let y = 0; y < sim.length; y++){
        do {
            const [dir_y, dir_x] = directions[guard_facing];
            const next_x = x + dir_x;
            const next_y = y + dir_y;

            if (valid_coord(next_x, next_y, sim.length, sim.length) && ["#", "O"].includes(sim[next_y][next_x])) {
                // Turn right
                guard_facing = (guard_facing + 1) % directions.length;
            } else {
                answer_1.add(`${x},${y}`)
                // Move forward
                x = next_x;
                y = next_y;
            }
        } while(true)
    }
}






// const answer_2 = new Set()
// const history = [...answer_1.map(x => x.split('|').map(Number))]

// Create coords for possible locations of new box
// const new_obj_coords = []
// for(const corrd of history){
//     const [x, y] = corrd

//     if(x !== startX && y !== startY){
//         new_obj_coords.push([x, y])
//     }

//     for(const d of directions){
//         const [dy, dx] = d;
//         if(valid_coord(x+dx, y+dy, sim.length, sim.length) && sim[y+dy][x+dx] !== "#"){
//             if(x+dx === startX && y+dy === startY) continue;
//             new_obj_coords.push([x+dx, y+dy])
//         }
//     }
// }


// for(const new_obj_coord of new_obj_coords){
//     const new_sim = structuredClone(sim);
//     const [ox, oy] = new_obj_coord;
//     const state_history = new Set();

//     new_sim[oy][ox] = "O"
//     x = startX;
//     y = startY;
//     previous_x = x;
//     previous_y = y;
//     guard_facing = 0;

//     while(valid_coord(x, y, new_sim.length, new_sim.length)){
//         const state = `${x},${y},${guard_facing}`;
//         if (state_history.has(state)){
//             console.log("Loop Found")
//             answer_2.add([ox, oy])
//             break
//         }
//         state_history.add(state);

//         if(new_sim[y][x] !== "#" && new_sim[y][x] !== "O"){
//             vis_2[y][x] = guard_facing == 'up' || guard_facing == 'down' ? "|" : "-"
//         }else{
//             guard_facing = guard_facing < directions.length-1 ? guard_facing + 1 : 0;
//             x = previous_x;
//             y = previous_y;
//             vis_2[y][x] = "+"
//         }

//         let [dir_y, dir_x] = directions[guard_facing]
//         previous_x = x;
//         previous_y = y;
//         x = x + dir_x
//         y = y + dir_y
//     }
// }

// for(const new_obj_coord of new_obj_coords){
//     const new_sim = sim.slice();
//     const [ox, oy] = new_obj_coord;
//     new_sim[oy][ox] = "O"

//     const state_history = new Set();
//     x = startX;
//     y = startY;
//     previous_x = x;
//     previous_y = y;
//     guard_facing = 0;

//     if(isLooping())
// }

// console.log("Task 2:", answer_2.size)

// FAILED
// const answer_2 = new Set();
// const history = [...answer_1.map(x => x.split('|').map(Number))];

// // Create coords for possible locations of new box
// let new_obj_coords = []
// for(const corrd of history){
//     const [x, y] = corrd

//     if(x !== startX && y !== startY){
//         new_obj_coords.push([x, y])
//     }

//     for(const d of directions){
//         const [dy, dx] = d;
//         if(valid_coord(x+dx, y+dy, sim.length, sim.length) && sim[y+dy][x+dx] !== "#"){
//             if(x+dx === startX && y+dy === startY) continue;
//             new_obj_coords.push([x+dx, y+dy])
//         }
//     }
// }
// new_obj_coords = [...new Set(new_obj_coords)]

// for (const new_obj_coord of new_obj_coords) {
//     const new_sim = structuredClone(sim);
//     const [ox, oy] = new_obj_coord
//     const state_history = new Set();

//     new_sim[oy][ox] = "O";
//     console.log("Sim after placing obstruction at:", ox, oy);
//     console.log(new_sim.map(row => row.join("")).join("\n"));

//     let x = startX;
//     let y = startY;
//     let guard_facing = 0; // Start facing "up"

//     while (valid_coord(x, y, new_sim.length, new_sim[0].length)) {
//         const state = `${x},${y},${guard_facing}`;
//         if (state_history.has(state)) {
//             console.log("Loop found with obstruction at:", ox, oy);
//             answer_2.add(`${ox},${oy}`);
//             break;
//         }
//         state_history.add(state);

//         if (new_sim[y][x] !== "#" && new_sim[y][x] !== "O") {
//             vis_2[y][x] = guard_facing % 2 === 0 ? "|" : "-";
//         } else {
//             guard_facing = (guard_facing + 1) % directions.length;
//         }

//         const [dir_y, dir_x] = directions[guard_facing];
//         x += dir_x;
//         y += dir_y;
//     }
// }

// console.log("Number of valid loop-causing obstructions:", answer_2);

