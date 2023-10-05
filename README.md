# find_sum   

## What was the problem?  
<pre>
Enter a list of numbers, then show two numbers that summarized would be equal to an extra given number in a less than O(n^2) complexity.     
</pre>

A solution with O(n) complexity to this problem is bring in two languages: TypeScript and Python.  

Both solutions have unit test included in the test folder. 

## What was the O(n) solution? 
  
Here is a pseudo-code for the given approach to a less than O(n²) solution:

<pre>
```
function findPairs(nums, targetSum) {
    const seenNumbers = new Set();
    let hasAValidPair = false;

    for (const num of nums) {
        const diff = targetSum - num;

        if (seenNumbers.has(diff) && (!seenNumbers.has(num) || diff === num)) {
            console.log(`+ ${num},${diff}`);
            if (!hasAValidPair) hasAValidPair = true;
        }
        seenNumbers.add(num);
    }
    return hasAValidPair;      
}
```         
</pre>     


## How to run this?  

### TypeScript
Make sure you have node installed! 
<pre>
  node -v
</pre>

if you do so got a version from that command, then inside the projects' folder, run 

<pre>
  node i
</pre>

You will have the required dependencies to properly run the code at your pc. You can run the CLI user experience  

<pre>
  npm start   
</pre>

#### Also, you can check the made unit test with   

<pre>
  npm run test
</pre>

### Python
Make sure you have python or python 3 installed!


<pre>
  which python
</pre>

or...   

<pre>
  which python3
</pre>

Now you can run the python script with...  

<pre>
  python python/find_pairs.py   
</pre>

or...  

<pre>
  python3 python/find_pairs.py   
</pre>

#### You can run the python unit test as well:

<pre>
  python test/python/test_find_pairs.py   
</pre>   

or...  


<pre>
  python3 test/python/test_find_pairs.py   
</pre>

