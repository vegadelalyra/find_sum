import * as readlineSync from 'readline-sync'
import { findPairs, curateInput } from './find_pairs'

/* User Experience at Command Line Interface */

console.clear()

/* Infinite execution */
while (true) {
    /* Retrieve user's passed arguments, if any */
    let numbersInput: string | undefined = process.argv[2]
    let targetSumInput: string | undefined = process.argv[3]

    /* Manipulate user CL arguments to give a neato experience */
    if (process.argv.length == 4 && !process.argv[2].includes(',')) {
        numbersInput = process.argv[2] + ' ' + process.argv[3]
        targetSumInput = process.argv[4]
    }

    if (process.argv.length > 4) {
        numbersInput = process.argv
            .slice(2)
            .reduce((a, b) => a + ' ' + b)

        targetSumInput = process.argv
            .at(-1) as string
    }

    /* numbersInput: Handling the list of numbers */

    /* While numbers input keeps without digits, ask for input */
    while (!/\d/.test(numbersInput))
        numbersInput = readlineSync.question('Enter a list of numbers:\n')

    /* Curate numbers list */
    let numbers: number[] = curateInput(numbersInput)

    /* if user passed it as process.argv, show */
    if (/\d/.test(process.argv[2]) && targetSumInput == undefined)
        console.log('\nCurrent numbers list:\n>', numbers)

    /* While numbers list carries only one number, ask for more inputs */
    while (numbers.length == 1) {
        let input = readlineSync.question('\nAdd one or more numbers to your list:\n')
        if (!input) continue

        const moreNums: number[] = curateInput(input)
        numbers = [...numbers, ...moreNums]
    }

    /* show curated numbers list after user input it */
    if (!/\d/.test(process.argv[2])) console.log(`\n>`, numbers)

    /* targetSumInput: Handling the target sum number */
    while (!/\d/.test(targetSumInput))
        targetSumInput = readlineSync.question('\nEnter a target sum number:\n')

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
    if (!hasPairs) console.log('No pairs in the list fit the target sum.\n')
    else console.log('\n')

    process.argv = []
}