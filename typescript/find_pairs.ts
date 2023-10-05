import * as readlineSync from 'readline-sync'

/* O(n) complexity algorithm to find pairs that sums the given target */
function findPairs(nums: number[], targetSum: number): boolean {
    const seenNumbers: Set<number> = new Set()
    let hasAValidPair: boolean = false

    for (const num of nums) {
        const diff: number = targetSum - num

        if (seenNumbers.has(diff) && (!seenNumbers.has(num) || diff == num)) {
            console.log(`+ ${num},${diff}`)
            if (!hasAValidPair) hasAValidPair = true
        }
        seenNumbers.add(num)
    }
    return hasAValidPair
}


/* User Experience at Command Line Interface */

/* Retrieve user's passed arguments, if any */
let numbersInput: string | undefined = process.argv[2]
let targetSumInput: string | undefined = process.argv[3]


/* numbersInput: Handling the list of numbers */

/* While numbers input keeps without digits, ask for input */
while (!/\d/.test(numbersInput))
    numbersInput = readlineSync.question('Enter a list of numbers:\n')

/* Curate numbers list */
let numbers: number[] = curateInput(numbersInput)

/* While numbers list carries only one number, ask for more inputs */
while (numbers.length == 1) {
    let input = readlineSync.question('\nAdd one or more numbers to your list:\n')
    if (!input) continue

    const moreNums: number[] = curateInput(input)
    numbers = [...numbers, ...moreNums]
}

/* show curated numbers list */
console.log(`\n> ${numbers}\n`)

/* targetSumInput: Handling the target sum number */
while (!/\d/.test(targetSumInput))
    targetSumInput = readlineSync.question('Enter a target sum number:\n')

/* 3 groups regex: 
    * (\D*?) captures all possible non-digit chars
    * (\d+) captures one or more digit chars
    * (\D*).* captures all non-digit chars
    * replace all the string with just the $1st and $2nd group
*/

/* Curate targetSumInput */
targetSumInput = targetSumInput.replace(/(\D*?)(\d+)(\D*).*/, "$1$2")
const targetSum: number = curateInput(targetSumInput)[0]


/* Find pairs and log results! */
console.log(`\nList:\n${numbers}`)
console.log(`\nTarget: ${targetSum}\n`)

console.log('Results:')
const hasPairs = findPairs(numbers, targetSum)
if (!hasPairs) console.log('No pairs in the list fit the target sum.')


/* curate input function: will retrieve signed number from any input */
function curateInput(input: string): number[] {
    // Replace non-digit or non-hyphen characters with one empty space
    let cleanedInput = input.replace(/[^-\d]+/g, ' ')

    // Replace '- ' or ' -' with '-'
    cleanedInput = cleanedInput.replace(/(-\s|\s-)/g, '-');

    // Replace successive hyphens '----' with a single '-'
    cleanedInput = cleanedInput.replace(/-+/g, '-')

    // Replace hyphens with ',-'
    cleanedInput = cleanedInput.replace(/-/g, ',-')

    // Replace remaining blank spaces with commas ','
    cleanedInput = cleanedInput.replace(/\s+/g, ',')

    // Delete commas at the beginning of the string
    cleanedInput = cleanedInput.replace(/^,/, '');

    // Delete all chars different from a num at the end
    cleanedInput = cleanedInput.replace(/\D+$/, '');

    // Split the string by ','
    return cleanedInput.split(',').map(Number)
}