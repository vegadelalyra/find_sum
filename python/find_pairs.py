def find_pairs(nums, target_sum):
    seen_numbers = set()

    for num in nums:
        diff = target_sum - num 

        if diff in seen_numbers:
            print(f"+ {num},{diff}")

        seen_numbers.add(num)
    

if __name__ == '__main__':
    import sys
    import re

    numbers_message = 'Enter a list of\nup to two-digit numbers\nseparated by commas:\n'
    target_sum_message = 'Enter an up to two-digit\ntarget sum number:\n'
    two_digits_num_re = r'^\s*\d{1,2}(\s*,\s*\d{1,2})*\s*$'

    if len(sys.argv) < 3:
        while True:
            numbers = input(numbers_message)
            if re.match(two_digits_num_re, numbers):
                numbers = list(map(int, numbers.split(',')))
                break 
    
    if len(sys.argv) < 2:
        while True:
            target_sum = input(target_sum_message)
            if re.match(two_digits_num_re, target_sum):
                target_sum = int(target_sum)
                break
        
    # try:
        if not numbers: 
            numbers = list(map(int, sys.argv[1].split(',')))
        if not target_sum: 
            target_sum = int(sys.argv[2])

        if all(-99 <= num <= 99 for num in numbers):
            find_pairs(numbers, target_sum)
        else:
            print('Please ensure all numbers have at most 2 digits!')
    # except ValueError: 
    #     print('Invalid input. Please provide a valid list of numbers and a target sum.')
    #     print(ValueError.args)