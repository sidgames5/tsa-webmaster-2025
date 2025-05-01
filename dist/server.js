"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs_1 = require("fs");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var crypto_js_1 = require("crypto-js");
var dotenv_1 = require("dotenv");
// Load environment variables from .env file
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json()); // Middleware to parse JSON
var SECRET_KEY = process.env.SECRET_KEY || ''; // Get SECRET_KEY from environment variables
var DATA_FILE = 'storage.txt';
// Encrypt and decrypt functions
function encryptData(data) {
    return crypto_js_1.default.AES.encrypt(data, SECRET_KEY).toString();
}
function decryptData(cipher) {
    var bytes = crypto_js_1.default.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
}
// API route to handle catering form submissions
app.post('/api/catering', function (req, res) {
    var encrypted = encryptData(JSON.stringify(req.body));
    fs_1.default.appendFileSync(DATA_FILE, encrypted + '\n'); // Append data to storage.txt
    res.json({ message: 'Request saved successfully!' });
});
// Admin endpoint to get the catering requests
app.get('/api/admin/requests', function (req, res) {
    var lines = fs_1.default.readFileSync(DATA_FILE, 'utf-8').split('\n').filter(Boolean);
    var decrypted = lines.map(function (line) { return JSON.parse(decryptData(line)); });
    res.json(decrypted); // Send decrypted data to admin
});
app.listen(4000, function () { return console.log("Server running on http://localhost:3000"); });
