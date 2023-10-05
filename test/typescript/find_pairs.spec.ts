import { findPairs, curateInput } from '../../typescript/find_pairs'

console.clear()

describe('findPairs', () => {
    it('should find pairs that sum to the given target', () => {
        const nums = [1, 2, 3, 4, 5]
        const targetSum = 9

        const hasPairs = findPairs(nums, targetSum)

        expect(hasPairs).toBe(true)
    })

    it('should not find pairs when there are no valid pairs', () => {
        const nums = [1, 2, 3, 4, 5]
        const targetSum = 11

        const hasPairs = findPairs(nums, targetSum)

        expect(hasPairs).toBe(false)
    })
})

describe('curateInput', () => {
    it('should curate input string and return an ascending array of numbers', () => {
        const input = '1 2 3 4 5'
        const curatedInput = curateInput(input)

        expect(curatedInput).toEqual([1, 2, 3, 4, 5])
    })

    it('should handle input with various non-digit characters', () => {
        const input = '-1#!"df f-2dgr 1/*rg erg2ge"(%'
        const curatedInput = curateInput(input)
        
        expect(curatedInput).toEqual([-2, -1, 1, 2])
    })
})
