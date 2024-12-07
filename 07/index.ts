import { load_data } from '../lib'

// Load Data
const data = await load_data("./07/demo-data.txt")
// const data = await load_data("./06/data.txt")

type Equation = {
	sum: number;
	values: number[];
	combinations: string[];
}

const generate_equation = (input: string) => {
	const numbers = input.match(/\d+/g).map(Number)

	let eq: Equation = {
		sum: 0,
		values: [],
		combinations: []
	}

	eq.sum = numbers[0]
	for (let i = 1; i < numbers.length; i++){
		eq.values.push(numbers[i])
	}

	return eq
}

const generate_permutation = (eq: Equation) => {
	const eq_values_string = eq.values.toString()
	const replacements = [];
	const positions = [];
	const operators = ['+', '*'];

	// Generate Positions
	for (let i = 0; i < eq_values_string.length; i++) {
		if (eq_values_string[i] === ',') {
			positions.push(i);
		}
	}
	const num_of_replacements = positions.length;

	const permutation = (prefix = [], depth = 0) => {
		if (depth === num_of_replacements) {
			replacements.push([...prefix]);
			return;
		}

		for (let operator of operators) {
			prefix[depth] = operator;
			permutation(prefix, depth + 1);
		}
	}
	permutation();

	const results = replacements.map(perm => {
		let result = eq_values_string.split('');
		perm.forEach((replacement, index) => {
			result[positions[index]] = replacement;
		});
		return result.join('');
	});

	return results
}

const eval_left_to_right = (expression:string) => {
	const chars = expression.split('')
	console.log(chars)
	let result = parseFloat(chars[0]);

    // Iterate through the rest of the tokens
    for (let i = 1; i < chars.length; i += 2) {
        const operator = chars[i];
        const number = parseFloat(chars[i + 1]);

        // Apply the operator left to right
        if (operator === '+') {
            result += number;
        } else if (operator === '-') {
            result -= number;
        } else if (operator === '*') {
            result *= number;
        } else if (operator === '/') {
            result /= number;
        }
    }

    return result;
}

// Part 1
const equations = data.map(input => generate_equation(input));

const all_equations = equations.map(eq => {
	eq.combinations = generate_permutation(eq)
	return eq
});

for (let i=0; i < all_equations[all_equations.length-1].combinations.length; i++){
	const expression = all_equations[all_equations.length-1].combinations[i];
	console.log(expression)
	console.log(eval_left_to_right(expression))
	console.log()
}

// console.log(all_equations)