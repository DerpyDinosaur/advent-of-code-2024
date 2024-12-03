const file = Bun.file("./01/data.txt");
const input = await file.text();

// ------------------------------------
// Task 1
// ------------------------------------

let coord = [[], []]

input.split("\r\n").forEach(line => {
	const [left, right] = line.split(/\s\s\s/).map(x => parseInt(x.trim()))

	coord[0].push(left)
	coord[1].push(right)
})

coord[0] = coord[0].sort()
coord[1] = coord[1].sort()

let distance = []

for(let i=0; i < coord[0].length; i++){
	const left = coord[0][i]
	const right = coord[1][i]
	distance.push(left > right ? left - right : right - left)
}

const answer1 = distance.reduce(
	(acc, curr) => acc + curr,
	0
)
console.log("Task 1:", answer1)

// ------------------------------------
// Task 2
// ------------------------------------

let similarity = []
let count = {}
for (const num of coord[1]) {
	count[num] = count[num] ? count[num] + 1 : 1;
}
for (const num of coord[0]){
	similarity.push(count[num] ? num * count[num] : 0)
}

const answer2 = similarity.reduce(
	(acc, curr) => acc + curr,
	0
)
console.log("Task 2:", answer2)