import * as readlineSync from 'readline-sync'

/* O(n) complexity algorithm to find pairs that sums the given target */
function findPairs(nums: number[], targetSum: number): boolean {
    const seenNumbers: Set<number> = new Set()
    let hasAValidPair: boolean = false

    for (const num of nums) {
        const diff: number = targetSum - num

        if (seenNumbers.has(diff)) {
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

let numbers: any

if (numbersInput) {
    numbers = numbersInput.split(',').map(numStr => parseInt(numStr, 10))
} else {
    while (true) {
        const input: string = readlineSync.question('Enter a list of numbers:\n')
        if (input) {
            // Replace non-digit or non-hyphen characters with one empty space
            let cleanedInput = input.replace(/[^-\d]+/g, ' ')
            
            // Replace '- ' with '-'
            cleanedInput = cleanedInput.replace(/- /g, '-')

            // Replace ' -' with '-'
            cleanedInput = cleanedInput.replace(/ -/g, '-')

            // Replace successive hyphens '----' with a single '-'
            cleanedInput = cleanedInput.replace(/-+/g, '-')

            // Replace hyphens with ',-'
            cleanedInput = cleanedInput.replace(/-/g, ',-')

            // Replace remaining blank spaces with commas ','
            cleanedInput = cleanedInput.replace(/\s+/g, ',')

            // Delete commas at the beginning of the string
            if (cleanedInput.charAt(0) === ',')
                cleanedInput = cleanedInput.substring(1)

            // Delete all chars different from a num at the end
            while (!/\d$/.test(cleanedInput))
                cleanedInput = cleanedInput.slice(0, -1)

            // Split the string by ','
            const numbersArray: number[] = cleanedInput.split(',').map(Number)

            console.log(`\n> ${numbersArray}\n`)
            break
        }
    }
}

let targetSum: number

if (targetSumInput)
    targetSum = parseInt(targetSumInput, 10)
else {
    const targetSumMessage: string = 'Enter a target sum number:\n'

    while (true) {
        const threeDigitsNumRE: RegExp = /^-?\d+$/
        const input: string = readlineSync.question(targetSumMessage)
        if (threeDigitsNumRE.test(input)) {
            targetSum = parseInt(input, 10)
            break
        }
    }
}


const hasPairs = findPairs(numbers, targetSum)
if (!hasPairs) console.log('No pairs in the list fit the target sum.')
