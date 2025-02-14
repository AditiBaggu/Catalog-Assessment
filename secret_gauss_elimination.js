const fs = require("fs");

// Function to convert a number from a given base to base-10 integer
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Function to perform Gaussian Elimination
function gaussianElimination(matrix, n) {
    // Perform forward elimination
    for (let i = 0; i < n; i++) {
        // Make the diagonal element non-zero
        if (matrix[i][i] === 0) {
            for (let j = i + 1; j < n; j++) {
                if (matrix[j][i] !== 0) {
                    // Swap rows
                    [matrix[i], matrix[j]] = [matrix[j], matrix[i]];
                    break;
                }
            }
        }

        // Eliminate all elements below the pivot
        for (let j = i + 1; j < n; j++) {
            let ratio = matrix[j][i] / matrix[i][i];
            for (let k = i; k <= n; k++) {
                matrix[j][k] -= ratio * matrix[i][k];
            }
        }
    }

    // Perform backward substitution to find the solution
    let solution = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        solution[i] = matrix[i][n] / matrix[i][i];
        for (let j = i - 1; j >= 0; j--) {
            matrix[j][n] -= matrix[j][i] * solution[i];
        }
    }

    return solution;
}

// Function to find the secret constant term (c) using Gaussian elimination
function findSecret(filename) {
    const data = JSON.parse(fs.readFileSync(filename, "utf8"));

    const n = data.keys.n;
    const k = data.keys.k; 
    const m = k - 1; 

    let points = [];
    
    for (let key in data) {
        if (key === "keys") continue;
        let x = parseInt(key);
        let y = decodeValue(data[key].base, data[key].value);
        points.push([x, y]);
    }

    points = points.slice(0, k); 
    
    // Construct the augmented matrix for the system of equations
    let matrix = [];
    for (let i = 0; i < k; i++) {
        let row = [];
        for (let j = 0; j <= m; j++) {
            row.push(Math.pow(points[i][0], m - j)); 
        }
        row.push(points[i][1]); 
    }

    // Apply Gaussian Elimination to solve the system
    let solution = gaussianElimination(matrix, m + 1);

    return Math.round(solution[m]); 
}

// Function to process multiple test cases
function processTestCases(filenames) {
    let results = {};
    
    filenames.forEach(filename => {
        results[filename] = findSecret(filename);
    });

    console.log("Secrets for all test cases:");
    console.log(results);
}

// Example usage: Provide multiple JSON filenames
const testFiles = ["test.json", "test1.json"]; 
processTestCases(testFiles);
