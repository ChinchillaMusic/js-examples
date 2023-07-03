//  1 - Calculate the number of unique permutations from a given string
function permutations(str) {
  const result = [];
  function permute(current, remaining) {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }
    const used = new Set();
    for (let i = 0; i < remaining.length; i++) {
      if (used.has(remaining[i])) continue;
      used.add(remaining[i]);
      const next = current + remaining[i];
      const remainingChars = remaining.slice(0, i) + remaining.slice(i + 1);
      permute(next, remainingChars);
    }
  }
  permute('', str);
  return result.length;
}

console.log(permutations("abc"));
// -> 6
console.log(permutations("abcdef"));
// -> 720
console.log(permutations("aaa"));
// -> 1

//--------------------------------------------------

//  2 - Find the additive persistence of a number
var additivePersistence = function (num) {
  let arrayNumbers = numberToArray(num);
  let addPers = 0;
  if (arrayNumbers.length != 1) {
    do {
      let numSum = 0;
      for (let i = 0; i < arrayNumbers.length; i++) {
        numSum += arrayNumbers[i];
      }
      arrayNumbers = numberToArray(numSum);
      addPers++;
    } while (arrayNumbers.length != 1)
  }
  return addPers;
};

function numberToArray(number) {
  const digits = [];
  while (number > 0) {
    digits.unshift(number % 10);
    number = Math.floor(number / 10);
  }
  return digits;
}

console.log(additivePersistence(2718));
// -> 2
console.log(additivePersistence(1234));
// -> 2

//--------------------------------------------------

//  3 - Implement the program that flattens arrays with nested structures
var flatten = function (arr) {
  var returnedArray = [];
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      const nestedArray = flatten(element);
      returnedArray = returnedArray.concat(nestedArray);
    } else {
      returnedArray.push(element);
    }
  });
  return returnedArray;
};

console.log(flatten([1, [2], [3, [[4]]]]));
// -> [1, 2, 3, 4]
console.log(flatten(["a", ["b", "c"]]));
// -> ["a", "b", "c"]

//--------------------------------------------------

//  4 - Sum all odd positions in an array
var sumOddIndices = function (arr) {
  let sum = 0;
  for (let i = 1; i < arr.length; i += 2) {
    sum += arr[i];
  }
  return sum;
};

console.log(sumOddIndices([1, 8, 13, 2, 7, 4, 19]));
// -> 14
console.log(sumOddIndices([5, 3, 2, 1, 8, 23, 99, 8]));
// -> 35

//--------------------------------------------------

//  5 - Find the greatest common divisor of two numbers
var gcd = function (a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
};

console.log(gcd(54, 24));
// -> 6
console.log(gcd(3, 2));
// -> 1
console.log(gcd(28, 444));
// -> 4
console.log(gcd(732, 234));
// -> 6

//--------------------------------------------------

//  6 - Determine if a number is a prime number
var isPrime = function (num) {
  if (num === 1) {
    return false;
  }
  for (let i = 2; i < Math.sqrt(num);i++) {
    if ((num / i) % 1 === 0) {
      return false;
    }
  }
  return true;
};

console.log(isPrime(1));
// -> false
console.log(isPrime(2));
// -> true
console.log(isPrime(37));
// -> true
console.log(isPrime(2222));
// -> false

//--------------------------------------------------

//   7 - Build a morse code decoder
var morseLibrary = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--.."
};

var morseEncode = function (latin) {
  const latinArray = Array.from(latin);
  let morseCode = '';
  for(let i = 0; i < latinArray.length; i++) {
    if (latinArray[i] == ' ') {
      morseCode += '/';
    } else {
      morseCode += morseLibrary[latinArray[i]];
    }
    if (i != latinArray.length -1) {
      morseCode += ' ';
    }
  }
  return morseCode;
};

console.log(morseEncode("hello there"));
// -> .... . .-.. .-.. --- / - .... . .-. .
console.log(morseEncode("congrats"));
// -> -.-. --- -. --. .-. .- - ...

//--------------------------------------------------

//  8 - Create a morse code decoder [Using morseLibrary from the previous code]
var morseDecode = function (morseString) {
  var englishString = '';
  var morseArray = morseString.split(' ');
  for (var i = 0; i < morseArray.length; i++) {
    var morseChar = morseArray[i];
    if (morseChar === '/') {
      englishString += ' ';
      continue;
    }
    var englishChar = morseLibrary[morseChar];
    if (englishChar) {
      englishString += englishChar;
    }
  }
  return englishString;
};

console.log(morseDecode(".... . .-.. .-.. --- / - .... . .-. ."));
// -> hello there
console.log(morseDecode("-.-. --- -. --. .-. .- - ..."));
// -> congrats

//--------------------------------------------------

//  9 - Return the starting and ending index of the widest pasture as well as the width
var widestPasture = function (landscape) {
  const landscapeArray = landscape.split('-');
  let returnableArray = [0,0,0];
  let posMax = 0;
  for (let i = 0; i < landscapeArray.length; i++) {
    if (landscapeArray[i].length >= returnableArray[0]) {
      returnableArray[0] = landscapeArray[i].length;
      posMax = i;
    }
  }
  if (returnableArray[0] !== 0) {
    landscapeArray.forEach((x, index) => {
      if (index < posMax) {
        returnableArray[1] += x.length + 1;
      }
    });
  returnableArray[2] = returnableArray[0] + returnableArray[1] - 1;
  }
  return returnableArray;
};

console.log(widestPasture("_-___-__-____-______-_"));
// -> [6, 14, 19]
console.log(widestPasture("_-___-__-___-"));
// -> [3, 9, 11]

//--------------------------------------------------

//  10 - Sum all odd numbers in an array
var sumOddNumbers = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 != 0) {
      sum += arr[i];
    }
  }
  return sum;
};

console.log(sumOddNumbers([1, 8, 13, 2, 7, 4, 19]));
// -> 40
console.log(sumOddNumbers([99, 15, 22, 48, 73, 56, 78]));
// -> 187

//--------------------------------------------------

//  11 - Convert an integer into a Roman Numeral String
var romanNumeral = function (integer) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];
  let result = '';
  for (let i = 0; i < romanNumerals.length; i++) {
    while (integer >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      integer -= romanNumerals[i].value;
    }
  }
  return result;
};

console.log(romanNumeral(3));
// -> III
console.log(romanNumeral(5));
// -> V
console.log(romanNumeral(9));
// -> IX
console.log(romanNumeral(45));
// -> XLV
console.log(romanNumeral(99));
// -> XCIX
console.log(romanNumeral(649));
// -> DCXLIX
console.log(romanNumeral(1000));
// -> M
console.log(romanNumeral(2017));
// -> MMXVII
console.log(romanNumeral(3999));
// -> MMMCMXCIX

//--------------------------------------------------

//  12 - Find the longest consecutive occurance of the underscore "_" character in a string
var widestPasture = function (landscape) {
  var landscapeArray = landscape.split('-');
  var longest = 0;
  for (i = 0; i < landscapeArray.length; i++) {
    if (landscapeArray[i].length > longest) {
      longest = landscapeArray[i].length;
    }
  }
  return longest;
};

console.log(widestPasture("_-___-__-____-______-_"));
// -> 6

//--------------------------------------------------

//  13 - Return a new array with all truthy values removed
var removeTruthy = function (arr) {
  return arr.filter(function (value) {
    return !value;
  }).slice();
};

console.log(removeTruthy([1, undefined, "hello", "", false, 5]));
// -> [undefined, "", false]

//--------------------------------------------------

//  14 - Compare the characters of two strings. If the first string contains all the characters that exist in the second string, you should return true. Otherwise return false
var matchingCharacters = function (str1, str2) {
  var str1Array = Array.from(str1);
  var str2Array = Array.from(str2);
  var isMatching = false;
  for (i = 0; i < str2Array.length; i++) {
    for (h = 0; h < str1Array.length; h++) {
      if (str2Array[i] === str1Array[h]) {
        isMatching = true;
      }
    }
    if (!isMatching) {
      return false;
    } else {
      isMatching = false;
    }
  }
  return true;
}

console.log(matchingCharacters("mary", "army"))
// -> true
console.log(matchingCharacters("hello", "hew"));
// -> false

//--------------------------------------------------

//  15 - Return true if the word is a palindrome
var isPalindrome = function (word) {
  wordArray = Array.from(word);
  for (i = 0; i < wordArray.length / 2; i++) {
    if (wordArray[i] != wordArray[wordArray.length -1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(isPalindrome("racecar"));
// -> true
console.log(isPalindrome("hello"));
// -> false

//--------------------------------------------------

//  16 - Determine whether the word passed is an isogram
var isIsogram = function (word) {
  var wordChar = Array.from(word);
  for (i = 0; i < wordChar.length; i++) {
    for (h = i + 1; h < wordChar.length; h++) {
      if (wordChar[i] == wordChar[h]) {
        return false;
      }
    }
  }
  return true;
}

console.log(isIsogram("helo"));
// -> true
console.log(isIsogram("helicopter"));
// -> false

//--------------------------------------------------

//  17 - Calculate the average value of a collection of numbers
var average = function (array) {
  averageNum = 0;
  for (i = 0; i < array.length; i++) {
    averageNum += array[i]; 
  }
  averageNum /= array.length;
  return averageNum;
}

console.log(average([1, 3, 5, 7, 9]));
// -> 5
console.log(average([2, 4, 6, 8, 10]));
// -> 6

//--------------------------------------------------

//  18 - Find a pair of numbers from the array that adds up to be the sum
var findPairForSum = function (array, sum) {
  var arrayReturned = [];
  for (i = 0; i < array.length; i++) {
    for (h = 0; h < array.length; h++) {
      if (sum == array[i] + array[h]) {
        if (array[i] < array[h]) {
          arrayReturned.push(array[i]);
          arrayReturned.push(array[h]);
        }
        else {
          arrayReturned.push(array[h]);
          arrayReturned.push(array[i]);
        }
        return arrayReturned;
      }
    }
  }
  return arrayReturned;
}

console.log(findPairForSum([3, 7, 10, 15, 9], 19));
// -> [9, 10]
console.log(findPairForSum([6, 8, 12, 14, 2, 4], 6));
// -> [2, 4]

//--------------------------------------------------

//  19 - Given set of numbers will either be all even numbers with one odd number, or all odd numbers with one even number. Function finds this outlier number and return it
var detectOutlierValue = function (array) {
  var numberReturned = 0;
  var even = false;
  var evenNumbers = 0;
  for (i = 0; i < array.length; i++) {
    if (array[i] % 2 == 0) {
      evenNumbers++;
      if (evenNumbers == 2) {
        even = true;
        break;
      }
    }
  }
  if (even) {
    for (i = array.length - 1; i >= 0; i--) {
      if (array[i] % 2 != 0) {
        numberReturned += array[i];
      }
    }
  }
  else {
    for (i = array.length - 1; i >= 0; i--) {
      if (array[i] % 2 == 0) {
        numberReturned += array[i];
      }
    }
  }
  return numberReturned;
}

console.log(detectOutlierValue([1, 3, 4, 7, 9, 11]));
// -> 4
console.log(detectOutlierValue([2, 4, 6, 10, 11, 14]));
// -> 11

//--------------------------------------------------

//  20 - Flip every pair of characters in a string
var flipPairs = function (string) {
  var mandanga = '';
  for (i = 0; i < string.length; i += 2) {
    if (string[i] == ' ') {
      continue;
    }
    else if (string[i + 1] == undefined) {
      mandanga += string[i];
    }
    else {
     mandanga += string[i + 1] + string[i];
    }
  }
  return mandanga;
}

console.log(flipPairs("hello world"));
// -> ehll oowlrd

//--------------------------------------------------

//  21 - Replace "hello" with "good morning"
var regex = /hel*o/;
var str = "hello world!";
var str2 = str.replace(regex, 'good morning');

console.log(str2);
// -> good morning world!

//--------------------------------------------------

//  22 - All "sea" will be replaced with "ocean"
var regex = /sea/g;
var str = "She sells seashells on the seashore.";
var str2 = str.replace(regex, 'ocean');

console.log(str2);
// -> She sells oceanshells on the oceanshore.

//  Find any combination of numbers
var regex = /\d\d/g;
var str = 'She sells 10 seashells by the seashore.';
var str2 = str.replace(regex, 'NUMBER');

console.log(str2);
// -> She sells NUMBER seashells by the seashore.

var str3 = 'The shells she sells are definitely 30 seashells.';
var str4 = str3.replace(regex, 'NUMBER');

console.log(str4);
// -> The shells she sells are definitely NUMBER seashells.