import unittest
from unittest.mock import patch
from io import StringIO
from find_pairs import find_pairs

class TestFindPairs(unittest.TestCase):
    def setUp(self):
        # Redirect stdout to capture print statements
        self.held_output = StringIO()
        sys.stdout = self.held_output

    def tearDown(self):
        # Reset redirection after each test
        self.held_output.close()
        sys.stdout = sys.__stdout__

    def test_find_pairs(self):
        nums = [1, 9, 5, 0, 20, -4, 12, 16, 7]
        target_sum = 12

        with patch('sys.argv', ['find_pairs.py', '1,9,5,0,20,-4,12,16,7', '12']):
            find_pairs(nums, target_sum)

        # Capture the printed output
        printed_output = self.held_output.getvalue().strip().split('\n')

        # Define the expected output
        expected_output = [
            "+ 0,12",
            "+ 5,7",
            "+ 16,-4"
        ]

        # Assert that the printed output matches the expected output
        self.assertEqual(printed_output, expected_output)

if __name__ == '__main__':
    unittest.main()
