const file = Bun.file("./02/data.txt");
const input = await file.text();

// ------------------------------------
// Task 1
// ------------------------------------

const safe_report = (report: number[]) => {
	let increasing = false;
	let decreasing = false;

	for(let i = 1; i < report.length; i++){
	    const diff = Math.abs(report[i] - report[i - 1]);
	    if (diff === 0 || diff > 3) return false;

	    if (report[i] > report[i - 1]) increasing = true;
	    else if (report[i] < report[i - 1]) decreasing = true;

		if (increasing && decreasing) return false;
	}

	return true;
}

let safe_report_count = 0;
for(const line of input.split("\r\n")){
	const report = line.split(/\s/).map(Number)
	if(safe_report(report)) safe_report_count++;
}

console.log("Answer 1:", safe_report_count)

// ------------------------------------
// Task 2
// ------------------------------------

safe_report_count = 0;
for(const line of input.split("\r\n")){
	const report = line.split(/\s/).map(Number)

	if (
		safe_report(report) ||
		report.some((_, index) =>
			safe_report([...report.slice(0, index), ...report.slice(index + 1)])
		)
	) {
		safe_report_count++;
	}
}

console.log("Answer 2:", safe_report_count)