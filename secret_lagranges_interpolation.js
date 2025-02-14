const fs = require("fs");

// Function to convert a number from a given base to base-10 integer
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Function to apply Lagrange Interpolation and find the constant term (c)
function lagrangeInterpolation(points) {
    return points.reduce((sum, [xi, yi], i) => {
        let term = yi;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj, _] = points[j];
                term *= (0 - xj) / (xi - xj); // f(0) to get c
            }
        }
        return sum + term;
    }, 0);
}

// Function to find the secret constant term (c) for a given JSON file
function findSecret(filename) {
    const data = JSON.parse(fs.readFileSync(filename, "utf8"));

    const n = data.keys.n;
    const k = data.keys.k; // Minimum number of points needed
    const m = k - 1; 

    let points = [];
    
    for (let key in data) {
        if (key === "keys") continue;
        let x = parseInt(key);
        let y = decodeValue(data[key].base, data[key].value);
        points.push([x, y]);
    }

    points = points.slice(0, k); 
    return Math.round(lagrangeInterpolation(points)); 
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

const testFiles = ["test.json", "test1.json"]; 
processTestCases(testFiles);
