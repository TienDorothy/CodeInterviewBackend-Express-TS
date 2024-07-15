function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
  /*
    Time Complexity: O(1) - The function performs a constant number of arithmetic operations, regardless of the value of n.
    Space Complexity: O(1) - The function uses a fixed amount of extra space.
  */
}

function sum_to_n_b(n: number): number {
  let sum: number = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
  /*
    Time Complexity: O(n) - The function iterates from 1 to n, performing a constant-time addition operation at each step.
    Space Complexity: O(1) - The function uses a fixed amount of extra space for the sum variable and the loop counter.
  */
}

function sum_to_n_c(n: number): number {
  if (n <= 0) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);

  /*
    Time Complexity: O(n) - The function makes n recursive calls, each performing a constant-time addition operation.
    Space Complexity: O(n) - The function requires space on the call stack proportional to the value of n due to recursion depth.
  */
}
