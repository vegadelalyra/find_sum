import sys
sys.path.append('python')

import unittest
from find_pairs import curate_input, find_pairs

class TestFindPairs(unittest.TestCase):
    def test_find_pairs_with_valid_pairs(self):
        nums = [1, 2, 3, 4, 5]
        target_sum = 9

        result = find_pairs(nums, target_sum)

        self.assertTrue(result)

    def test_find_pairs_with_no_valid_pairs(self):
        nums = [1, 2, 3, 4, 5]
        target_sum = 11

        result = find_pairs(nums, target_sum)

        self.assertFalse(result)

class TestCurateInput(unittest.TestCase):
    def test_curate_input_with_valid_input(self):
        input_str = '-1#!"df f-2dgr 1/*rg erg2ge"(%'

        result = curate_input(input_str)

        self.assertEqual(result, [-2, -1, 1, 2])

    def test_curate_input_with_valid_input(self):
        input_str = '1 2 3 4 5'

        result = curate_input(input_str)

        self.assertEqual(result, [1, 2, 3, 4, 5])

if __name__ == '__main__':
    unittest.main()
