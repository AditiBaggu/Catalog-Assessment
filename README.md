# Shamir's Secret Sharing - Finding the Constant Term (c)

## Overview
This project implements a simplified version of **Shamir's Secret Sharing Algorithm**, where we determine the constant term `c` of an unknown polynomial based on given roots. The roots are provided in a JSON file, with values encoded in different bases.
Please check the PDF below for the working of test case 1:
<img width="479" alt="Screenshot 2025-02-14 at 12 03 34 PM" src="https://github.com/user-attachments/assets/aa0ca6c9-dc3a-4a9f-9c5c-6ea56d0abe6c" />

We solve the polynomial using two different numerical methods:
1. **Gaussian Elimination** - Solves the system of equations by transforming it into an upper triangular matrix and performing back-substitution.
2. **Lagrange Interpolation** - Computes the polynomial directly using the Lagrange basis polynomials.

## Problem Statement
Given a polynomial of degree `m`, we require `k = m + 1` roots to determine its coefficients. The roots are provided in a JSON format where:
- The key represents `x` values.
- The `value` represents `y`, encoded in a given base.
- The polynomial follows the format:
  
  \[ f(x) = a_m x^m + a_{m-1} x^{m-1} + ... + a_1 x + c \]
  
The goal is to extract the `c` value from the polynomial by solving for the coefficients.

## JSON Input Format
```json
{
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
}
```

- `n`: Total number of provided roots.
- `k`: Minimum number of roots required.
- Each numbered key represents an `(x, y)` pair where `y` is stored in a specific base.

## Project Setup
### Requirements
- Node.js installed on your system.

### Install Dependencies
No external libraries are needed. Ensure Node.js is installed and proceed with the script execution.

### Running the Program
Save the JavaScript files (`secret_langranges_interpolation.js` or `secret_gauss_elimination.js`) and the JSON test cases in the same directory. Run the program using:
```sh
node secret_langranges_interpolation.js
```
OR
```sh
node secret_gauss_elimination.js
```

## Time Complexity
- **Gaussian Elimination:** \(O(k^3)\) due to matrix operations.
- **Lagrange Interpolation:** \(O(k^2)\) due to nested loops computing basis polynomials.

## Conclusion
This project successfully implements **Shamir’s Secret Sharing Algorithm** using two different numerical methods. The Gaussian Elimination approach is more structured, while Lagrange Interpolation provides a direct mathematical formulation. Both approaches yield the same result, ensuring accuracy in extracting the constant term `c`.

