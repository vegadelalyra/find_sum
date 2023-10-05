import re
import sys


def find_pairs(nums, target_sum):
    seen_numbers = set()
    has_a_valid_pair = False

    for num in nums:
        diff = target_sum - num

        if diff in seen_numbers and (num not in seen_numbers or diff == num):
            print(f"+ {num},{diff}")
            has_a_valid_pair = True

        seen_numbers.add(num)

    return has_a_valid_pair


def curate_input(input_str):
    # Replace non-digit or non-hyphen characters with one empty space
    cleaned_input = re.sub(r'[^-\d]+', ' ', input_str)

    # Replace '- ' or ' -' with '-'
    cleaned_input = re.sub(r'(-\s|\s-)', '-', cleaned_input)

    # Replace successive hyphens '----' with a single '-'
    cleaned_input = re.sub(r'-+', '-', cleaned_input)

    # Replace hyphens with ',-'
    cleaned_input = re.sub(r'-', ',-', cleaned_input)

    # Replace remaining blank spaces with commas ','
    cleaned_input = re.sub(r'\s+', ',', cleaned_input)

    # Delete commas at the beginning of the string
    cleaned_input = re.sub(r'^,', '', cleaned_input)

    # Delete all chars different from a num at the end
    cleaned_input = re.sub(r'\D+$', '', cleaned_input)

    # Split the string by ','
    return [int(num) for num in cleaned_input.split(',')]


def main():
    while True:
        # Retrieve user's passed arguments, if any
        numbers_input = sys.argv[1] if len(sys.argv) > 1 else None
        target_sum_input = sys.argv[2] if len(sys.argv) > 2 else None

        # Manipulate user CL arguments to give a neato experience
        if len(sys.argv) == 4 and ',' not in sys.argv[1]:
            numbers_input = sys.argv[1] + ' ' + sys.argv[2]
            target_sum_input = sys.argv[3]

        if len(sys.argv) > 4:
            numbers_input = ' '.join(sys.argv[1:-1])
            target_sum_input = sys.argv[-1]

        # numbers_input: Handling the list of numbers
        while not any(char.isdigit() for char in str(numbers_input)):
            numbers_input = input('Enter a list of numbers:\n')

        # Curate numbers list
        numbers = curate_input(numbers_input)

        # If user passed it as sys.argv, show
        if numbers_input is not None and any(char.isdigit() for char in str(numbers_input)) and target_sum_input is None:
            print('\nCurrent numbers list:\n>', numbers)

        # While numbers list carries only one number, ask for more inputs
        while len(numbers) == 1:
            input_str = input('\nAdd one or more numbers to your list:\n')
            if not input_str:
                continue

            more_nums = curate_input(input_str)
            numbers.extend(more_nums)

        # Show curated numbers list after user input it
        if numbers_input is None or not any(char.isdigit() for char in str(numbers_input)):
            print('\n>', numbers)

        # target_sum_input: Handling the target sum number
        while target_sum_input is None or not any(char.isdigit() for char in str(target_sum_input)):
            target_sum_input = input('\nEnter a target sum number:\n')

        # Curate target_sum_input
        target_sum_input = re.sub(
            r'(\D*?)(\d+)(\D*).*', r'\1\2', target_sum_input)
        target_sum = int(target_sum_input)

        # Find pairs and log results
        print(f'\nList:\n{numbers}')
        print(f'\nTarget: {target_sum}\n')

        print('Results:')
        has_pairs = find_pairs(numbers, target_sum)
        if not has_pairs:
            print('No pairs in the list fit the target sum.\n')
        else:
            print('\n')

        sys.argv = []


if __name__ == "__main__":
    main()
