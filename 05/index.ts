const rules_file = Bun.file("./05/rules.txt");
// const rules_file = Bun.file("./05/demo-rules.txt");
const rules_text = await rules_file.text();
const rules = rules_text.split("\r\n").map(x => 
	x.split('|').map(num => parseInt(num))
)

const print_spool_file = Bun.file("./05/print-spool.txt");
// const print_spool_file = Bun.file("./05/demo-print-spool.txt");
const print_spool_text = await print_spool_file.text();
const print_spool = print_spool_text.split("\r\n").map(x => 
	x.split(',').map(num => parseInt(num))
)

const rules_directory = new Map();
for (const [left, right] of rules){

	if (!rules_directory.has(left)){
		rules_directory.set(left, []);
	}

	rules_directory.get(left).push(right);
}

// ------------------------------------
// Task 1
// ------------------------------------

const is_safe_update = (spool, rules) => {
	for (let i = 0; i < spool.length-1; i++){
		for (let next = i+1; next < spool.length; next++){
			if(
				rules.get(spool[next]) &&
				rules.get(spool[next]).includes(spool[i])
			){
				return false;
			}
		}
	}
	return true
}

let answer_one = 0
for (const spool of print_spool){
	if(is_safe_update(spool, rules_directory)){
		answer_one += spool[Math.floor(spool.length / 2)]
	}
}

console.log("Task 1:", answer_one)

// ------------------------------------
// Task 2
// ------------------------------------

const shift_spool = (spool, rules) => {
	for (let i = 0; i < spool.length-1; i++){
		for (let next = i+1; next < spool.length; next++){
			if(
				rules.get(spool[next]) &&
				rules.get(spool[next]).includes(spool[i])
			){
				[spool[i], spool[next]] = [spool[next], spool[i]];
			}
		}
	}
}

let answer_two = 0
for (const spool of print_spool){
	if(!is_safe_update(spool, rules_directory)){
		shift_spool(spool, rules_directory)
		answer_two += spool[Math.floor(spool.length / 2)]
	}
}

console.log("Task 2:", answer_two)