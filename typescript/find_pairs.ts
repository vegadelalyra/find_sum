/* O(n) complexity algorithm to find pairs that sums the given target */
export function findPairs(nums: number[], targetSum: number): boolean {
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


/* curate input function: will retrieve signed number from any input */
export function curateInput(input: string): number[] {
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
    return cleanedInput.split(',').map(Number).sort((a,b) => a - b)
}