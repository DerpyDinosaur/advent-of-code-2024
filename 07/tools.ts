export type Equation = {
	sum: number;
	values: number[];
	combinations: string[];
}

export const generate_equation = (input: string) => {
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

export const generate_permutation = (eq: Equation, operators: string[] = ['+', '*']) => {
	const eq_values_string = eq.values.toString()
	const replacements = [];
	const positions = [];

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

export const eval_left_to_right = (expression:string) => {
	let parsed_expression = expression.replace(/\*/g, " * ")
	parsed_expression = parsed_expression.replace(/\+/g, " + ")
	parsed_expression = parsed_expression.replace(/\|\|/g, " || ")
	const chars = parsed_expression.split(' ')

	let result = parseFloat(chars[0]);

    // Iterate through the rest of the tokens
    for (let i = 1; i < chars.length; i += 2) {
        const operator = chars[i];
        const number = parseFloat(chars[i + 1]);

        // Apply the operator left to right
        if (operator === '+') {
            result += number;
        } else if (operator === '*') {
            result *= number;
        } else if (operator === '||') {
        	result = parseFloat(result.toString().concat(number.toString()))
        }
    }

    return result;
}