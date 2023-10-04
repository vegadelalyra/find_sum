import sys
import os
import unittest
from unittest.mock import patch
from io import StringIO

# Add the directory containing your script to the Python path
script_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../python'))
sys.path.insert(0, script_dir)

# Now you can import your script
from find_pairs import find_pairs

class TestFindPairs(unittest.TestCase):
    def setUp(self):
        # Redirect stdout to capture print statements
        self.held_output = StringIO()
        sys.stdout = self.held_output

    def tearDown(self):
        # Restore stdout
        sys.stdout = sys.__stdout__

    def test_find_pairs(self):
        # Mock input values
        nums = [1, 2, 3, 4, 5]
        target_sum = 7

        # Call the function
        find_pairs(nums, target_sum)

        # Capture printed output
        printed_output = self.held_output.getvalue().strip()

        # Perform assertions based on your expectations
        self.assertIn("+ 4,3", printed_output)
        self.assertIn("+ 5,2", printed_output)
        self.assertNotIn("+ 1,6", printed_output)  # This pair doesn't exist

        # Add more descriptive output
        if "+ 4,3" in printed_output:
            print("Found pair + 4,3: Test Passed")
        else:
            print("Expected pair + 4,3 not found: Test Failed")

        if "+ 5,2" in printed_output:
            print("Found pair + 5,2: Test Passed")
        else:
            print("Expected pair + 5,2 not found: Test Failed")

        if "+ 1,6" not in printed_output:
            print("Pair + 1,6 not found: Test Passed")
        else:
            print("Unexpected pair + 1,6 found: Test Failed")

if __name__ == '__main__':
    unittest.main()
