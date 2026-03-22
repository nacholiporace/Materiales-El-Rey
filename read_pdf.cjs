const fs = require('fs');
const pdf = require('pdf-parse');

const PDF_FILE = "c:\\Users\\nacho\\.gemini\\antigravity\\corralones\\LISTA 206-1.pdf";

let dataBuffer = fs.readFileSync(PDF_FILE);

pdf(dataBuffer).then(function(data) {
    console.log("=== PDF TEXT ===");
    console.log(data.text);
}).catch(function(error) {
    console.error("Error al leer el PDF:", error);
});
