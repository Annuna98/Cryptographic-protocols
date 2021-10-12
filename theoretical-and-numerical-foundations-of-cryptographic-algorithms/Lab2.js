// Modulo integer multiplication
const exponentiation = (number, degree, module) => {
    // if number is not integer
    if (!((number ^ 0) === number)) return;
    let result = 1;
    while (degree--) {
      result = (result * number) % module;
    }
    
    return result;
}

// Testing
if (exponentiation(5, 6, 10) !== 5) { 
    throw new Error('The function does not work correctly!');
}
if (exponentiation(15, 7, 31) !== 23) { 
    throw new Error('The function does not work correctly!');
}
if (exponentiation(151, 76, 4) !== 1) { 
    throw new Error('The function does not work correctly!');
}


// Calculation of the greatest common divisor of two integers (Euclid's algorithm);
const gcd = (number1, number2) => {
    if (number1 === 0) { 
        return number2;
    }
    if (number2 === 0) {
        return number1;
    }

    return gcd(number2, number1 % number2);
}

// Testing
if (gcd(625, 2345) !== 5) { 
    throw new Error('The function does not work correctly!');
}
if (gcd(625, 750) !== 125) { 
    throw new Error('The function does not work correctly!');
}
if (gcd(333, 342) !== 9) { 
    throw new Error('The function does not work correctly!');
}

// Calculating the inverse modulo value (extended Euclidean algorithm);
const extendedEeuclid = (a, b) => {
    a = +a;
    b = +b;
    if (a !== a || b !== b) {
        return [NaN, NaN, NaN];
    }

    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
        return [Infinity, Infinity, Infinity];
    }

    if ((a % 1 !== 0) || (b % 1 !== 0)) {
        return false;
    }
    let signX = (a < 0) ? -1 : 1,
        signY = (b < 0) ? -1 : 1,
        x = 0,
        y = 1,
        u = 1,
        v = 0,
        q, r, m, n;
        a = Math.abs(a);
        b = Math.abs(b);

    while (a !== 0) {
        q = Math.floor(b / a);
        r = b % a;
        m = x - u * q;
        n = y - v * q;
        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }
    return [b, signX * x, signY * y];
}

// Testing
let result1 = extendedEeuclid(3, 26)[1]
while (result1 < 0) result1 += 26;
if (result1 !== 9) { 
    throw new Error('The function does not work correctly!');
}
let result2 = extendedEeuclid(96, 17)[1]
while (result2 < 0) result2 += 17;
if (result2 !== 14) { 
    throw new Error('The function does not work correctly!');
}
let result3 = extendedEeuclid(103, 13)[1]
while (result3 < 0) result3 += 13;
if (result3 !== 12) { 
    throw new Error('The function does not work correctly!');
}

// Generation of a large prime number (Rabin-Miller test).
const getPrimes = (limit) => {

    let primes = [];
    let toCheck = Array.from(Array(limit + 1).keys()).splice(2);
  
    while (toCheck.length) {
      primes.push(toCheck.shift());
      toCheck = toCheck.filter(
        function(i) {
          return i % primes[primes.length - 1] !== 0;
        }
      );
    }
  
    return primes;
}

const miillerRabbinTest = (d, n) => {
     
    let a = 2 + Math.floor(Math.random() * (n-2)) % (n - 4);
 
    let x = exponentiation(a, d, n);
 
    if (x == 1 || x == n-1)
        return true;
 
    while (d != n-1)
    {
        x = (x * x) % n;
        d *= 2;
 
        if (x == 1)    
            return false;
        if (x == n-1)
              return true;
    }
 
    return false;
}

const isPrime = ( n, k) => {
     
    if (n <= 1 || n == 4) return false;
    if (n <= 3) return true;
 
    let d = n - 1;
    while (d % 2 == 0)
        d /= 2;
 
    for (let i = 0; i < k; i++)
        if (!miillerRabbinTest(d, n))
            return false;
 
    return true;
}
  
let num = getPrimes(10000);

// Testing 
if (isPrime(num[num.length-1], 10) !== true) { 
    throw new Error('The function does not work correctly!');
}
if (isPrime(num[num.length-2], 10) !== true) { 
    throw new Error('The function does not work correctly!');
}
if (isPrime(num[num.length-3], 10) !== true) { 
    throw new Error('The function does not work correctly!');
}