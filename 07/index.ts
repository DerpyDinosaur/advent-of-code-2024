import { load_data } from '../lib'
import type { Equation } from './tools'
import { generate_equation, generate_permutation, eval_left_to_right } from './tools'

// Load Data
// const data = await load_data("./07/demo-data.txt")
const data = await load_data("./07/data.txt")

const equations_one = data.map(input => generate_equation(input));
const equations_two = data.map(input => generate_equation(input));

const part_one_equations = equations_one.map(eq => {
	eq.combinations = generate_permutation(eq, ["+", "*"])
	return eq
});

const part_two_equations = equations_two.map(eq => {
	eq.combinations = generate_permutation(eq, ["+", "*", "||"])
	return eq
});

// Part 1
const calibrations_one = part_one_equations.filter(eq => {
	for(const perm of eq.combinations){
		if(eq.sum === eval_left_to_right(perm)){
			return eq;
		}
	}
	return false;
}).filter(Boolean)

const answer_one = calibrations_one.reduce(
	(acc, curr) => acc + curr.sum,
	0
)

console.log("Part 1:", answer_one)

// Part 2
const calibrations_two = part_two_equations.filter(eq => {
	for(const perm of eq.combinations){
		if(eq.sum === eval_left_to_right(perm)){
			return eq;
		}
	}
	return false;
}).filter(Boolean)

const answer_two = calibrations_two.reduce(
	(acc, curr) => acc + curr.sum,
	0
)

console.log("Part 2:", answer_two)