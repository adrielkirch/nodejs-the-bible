/**
 * Regular expressions, often abbreviated as regex or regexp, are powerful tools used for pattern matching and manipulation of text.
 */

/**
 * Basic Methods
 */
//test(): Tests whether a string matches a specified pattern.
let pattern = /\d{3}/;
console.assert(pattern.test("123"));

//exec(): Searches a string for a specified pattern and returns the first matching result.
pattern = /\d{3}/;
console.assert(pattern.exec("123")); // Output: ['123']

//match(): Returns an array containing all matches of a pattern within a string.
pattern = /\d{3}/g;
console.assert("123 456".match(pattern)); // Output: ['123', '456']

/**
 * Basic exemples
 */
// Using RegExp constructor
let regex1 = new RegExp("hello");
console.assert(regex1 instanceof RegExp, 'regex1 should be an instance of RegExp');

// Using literal syntax
let regex2 = /world/;
console.assert(regex2 instanceof RegExp, 'regex2 should be an instance of RegExp');

let regex = /[aeiou]/; // Matches any vowel
console.assert(regex instanceof RegExp, 'regex should be an instance of RegExp');

regex = /go*d/; // Matches "god", "good", "gooood", etc.
console.assert(regex instanceof RegExp, 'regex should be an instance of RegExp');

regex = /go+d/; // Matches "good", "gooood", etc.
console.assert(regex instanceof RegExp, 'regex should be an instance of RegExp');

regex = /colou?r/; // Matches "color" or "colour"
console.assert(regex instanceof RegExp, 'regex should be an instance of RegExp');

regex = /^hello$/; // Matches the exact string "hello"
console.assert(regex instanceof RegExp, 'regex should be an instance of RegExp');

regex = /\./; // Matches a literal period (.)
console.assert(regex instanceof RegExp, 'regex should be an instance of RegExp');

regex = /hello/gi; // Matches all occurrences of "hello" case-insensitively
console.assert(regex instanceof RegExp, 'regex should be an instance of RegExp');

let str = "Hello, World!";
regex = /hello/i;
console.assert(regex.test(str), 'Pattern should match the string');
console.assert(str.match(regex), 'Pattern should match the string');
console.assert(str.search(regex) === 0, 'Pattern should match the string');
console.assert(str.replace(regex, "Hi") === "Hi, World!", 'Pattern should match the string');
console.assert(str.split(/[, ]/), 'Pattern should match the string');

/**
 * Some pratical exemples
 */

//Exemple 1, Extract all urls from a text
console.log("\nExemple 1, Extract all urls from a text:\n")
let text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce http://tortor.com feugiat lorem nec est laoreet, sed scelerisque libero ultrices. 
Sed pretium, https://example.com/ ut fringilla convallis, massa metus volutpat lacus, sed mattis purus lacus a libero. 
Nullam https://loremipsum.com.br euismod nunc id est condimentum, sed posuere sem viverra. Nulla facilisi. 
Phasellus sodales sollicitudin sapien, at varius ipsum http://dolorsitamet.io ut hendrerit. Suspendisse potenti. Donec nec metus eros. 
Integer ac ipsum non elit scelerisque euismod.
Nulla ultrices, ipsum sed consectetur varius tortor ligula ultrices tellus, vel consequat mauris arcu ut justo. 
Duis nec vehicula nisi. Nulla facilisi. Sed ullamcorper diam nec massa convallis, eget bibendum elit http://sitamet.com?q1=a&q2=b. 
Vivamus ut leo fringilla, ullamcorper quam id, egestas mauris. Morbi ut arcu leo. https://ipsum.com/add Nullam sit amet velit hendrerit, consequat metus ac, condimentum justo. 
Aliquam in arcu consequat, vulputate libero id, mattis lorem. Cras a mi a sem vehicula suscipit. Vivamus tincidunt est ut turpis porta, ac sollicitudin lacus dapibus. 
Aenean eu sem ac turpis tempor eleifend. Mauris sed http://ipsum.com ipsum vitae felis convallis iaculis. 
Morbi interdum consectetur metus, ut placerat nunc. 
Proin nec varius odio. Suspendisse eu tellus id eros luctus tristique. 
Morbi tempor tellus risus, sed sollicitudin odio venenatis in. Phasellus pretium pulvinar justo, in vehicula leo luctus at. 
Pellentesque aliquam magna nec augue https://ipsum.net?query=123 feugiat, sit amet accumsan sapien tempor. Nam in elit quis magna elementum tristique.
`;
const urlRegex = /https?:\/\/\S+/gi;
const urls = text.match(urlRegex);

console.log("Extracted URLs:");
urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
});

//Exemple 2, Replace all variables in html
console.log("\nExemple 2, Replace all variables in html:\n")
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>
<body>
    <h1>Hello, {{name}}!</h1>
    <p>Welcome to our website, {{name}}. We hope you enjoy your stay.</p>
</body>
</html>
`;

// Data object containing values to replace the variables
const data = {
    title: "Welcome to My Website",
    name: "John Doe"
};

// Regular expression to match variables in the HTML template
const variableRegex = /{{(.*?)}}/g;
const replacedHtml = html.replace(variableRegex, (match, variable) => {
    return data[variable.trim()] || match; // Use the value from the data object or keep the original variable if not found
});

// Print the replaced HTML
console.log("Replaced HTML:");
console.log(replacedHtml);

//Exemple 3, Validate email and password
console.log("\nExemple 3, Validate email and password:\n")
// Regular expression for validating email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for validating password
// Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let testEmail = 'test@example.com';
let testPassword = 'Password123!';

console.assert(emailRegex.test(testEmail), `Email "${testEmail}" is valid`);
console.assert(passwordRegex.test(testPassword), `Password "${testPassword}" is not valid`);
 testEmail = 'test@example';
 testPassword = 'Password123';
console.assert(!emailRegex.test(testEmail), `Email "${testEmail}" is valid`);
console.assert(!passwordRegex.test(testPassword), `Password "${testPassword}" is not valid`);