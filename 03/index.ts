const file = Bun.file("./03/data.txt");
const input = await file.text();
const data = []
for(const line of input.split("\r\n")){
	data.push(line)
}
// ------------------------------------
// Task 1
// ------------------------------------

const mul = [[], []]
const re = new RegExp(/mul\(\d+,\d+\)/)
const bannedChars = ["m", "u", "l", "(", ")"]

for(let i=0; i < data.length; i++){
	const line = data[i]
	const all_matches = [...data[i].matchAll(/mul\(\d+,\d+\)/g)]

	all_matches.forEach(match_array => {
		let clean = Array.from(match_array[0])
			.filter(char => !bannedChars.includes(char))
			.join('');

		mul[0].push(clean.split(",")[0]);
		mul[1].push(clean.split(",")[1]);
	})
}

// Multiply both arrays
let answer_one = 0; //183669043
for(let i=0; i < mul[0].length; i++) {
    answer_one += mul[0][i] * mul[1][i];
}
console.log("Task 1:", answer_one)

// ------------------------------------
// Task 2
// ------------------------------------

const mul_conditional = [[], []]
let doing = true;

for(let i=0; i < data.length; i++){
	const line = data[i]
	const all_matches = [...data[i].matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)]

	all_matches.forEach(match_array => {
		if(match_array[0] === "don't()"){
			doing = false;
			return
		}else if(match_array[0] === "do()"){
			doing = true;
			return
		}

		if(doing){
			let clean = Array.from(match_array[0])
				.filter(char => !bannedChars.includes(char))
				.join('');

			mul_conditional[0].push(clean.split(",")[0]);
			mul_conditional[1].push(clean.split(",")[1]);
		}
	})
}

// Multiply both arrays
let answer_two = 0; //183669043
for(let i=0; i < mul_conditional[0].length; i++) {
    answer_two += mul_conditional[0][i] * mul_conditional[1][i];
}
console.log("Task 2:", answer_two)