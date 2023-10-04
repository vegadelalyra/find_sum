import re
import argparse

def find_pairs(nums, target_sum):
    seen_numbers = set()

    for num in nums:
        diff = target_sum - num 

        if diff in seen_numbers:
            print(f"+ {num},{diff}")

        seen_numbers.add(num)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Find pairs of numbers that add up to a target sum.')
    parser.add_argument('numbers', nargs='?', default='', type=str, help='List of numbers separated by commas')
    parser.add_argument('target_sum', nargs='?', default=None, type=int, help='Target sum')

    args = parser.parse_args()

    if args.numbers:
        # Split the comma-separated numbers into a list
        numbers = [int(num) for num in re.split(r',\s*', args.numbers)]
    else:
        # If numbers are not provided as an argument, prompt the user
        numbers_message = 'Enter a list of up to two-digit numbers separated by commas:\n'
        two_digits_num_re = r'^\s*\d{1,2}(\s*,\s*\d{1,2})*\s*$'
        
        while True:
            numbers = input(numbers_message)
            if re.match(two_digits_num_re, numbers):
                numbers = [int(num) for num in re.split(r',\s*', numbers)]
                break

    if args.target_sum is None:
        # If target_sum is not provided as an argument, prompt the user
        target_sum_message = 'Enter an up to three-digit target sum number:\n'
        two_digits_num_re = r'^\s*\d{1,3}\s*$'

        while True:
            target_sum = input(target_sum_message)
            if re.match(two_digits_num_re, target_sum):
                target_sum = int(target_sum)
                break
    else:
        target_sum = args.target_sum

    if all(-99 <= num <= 99 for num in numbers):
        find_pairs(numbers, target_sum)
    else:
        print('Please ensure all numbers have at most 2 digits!')
