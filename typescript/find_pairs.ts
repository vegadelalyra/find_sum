import * as readlineSync from 'readline-sync'

/* O(n) complexity algorithm to find pairs that sums the given target */
function findPairs(nums: number[], targetSum: number): boolean {
    const seenNumbers: Set<number> = new Set()
    let hasAValidPair: boolean = false

    for (const num of nums) {
        const diff: number = targetSum - num

        if (seenNumbers.has(diff) && !seenNumbers.has(num)) {
            console.log(`+ ${num},${diff}`)
            if (!hasAValidPair) hasAValidPair = true
        }

        seenNumbers.add(num)
    }

    return hasAValidPair
}


/* User Experience at Command Line Interface */
const numbersInput: string | undefined = process.argv[2]
const targetSumInput: string | undefined = process.argv[3]

let numbers: number[]

if (numbersInput) {
    numbers = numbersInput.split(',').map(numStr => parseInt(numStr, 10))
} else {
    while (true) {
        const input: string = readlineSync.question('Enter a list of numbers:\n')
        if (/\d/.test(input)) {
            numbers = curateInput(input) as number[]
            console.log(`\n> ${numbers}\n`)
            break
        }
    }
}

let targetSum: number | string

if (targetSumInput)
    targetSum = parseInt(targetSumInput, 10)
else {
    const targetSumMessage: string = 'Enter a target sum number:\n'

    while (true) {
        const input: string = readlineSync.question(targetSumMessage)
        if (/\d/.test(input)) {
            /* 3 groups regex: 
                * (\D*?) captures all possible non-digit chars
                * (\d+) captures one or more digit chars
                * (\D*).* captures all non-digit chars
                * replace all the string with just the $1st and $2nd group
            */
            targetSum = input.replace(/(\D*?)(\d+)(\D*).*/, "$1$2")
            targetSum = curateInput(targetSum) as number
            console.log(`\nList:\n${numbers}`)
            console.log(`\nTarget: ${targetSum}\n`)
            break
        }
    }
}

console.log('Results:')
const hasPairs = findPairs(numbers, targetSum)
if (!hasPairs) console.log('No pairs in the list fit the target sum.')


function curateInput(input: string): number[] | number {
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
    return cleanedInput.includes(',') 
    ? cleanedInput.split(',').map(Number)
    : parseInt(cleanedInput)
}