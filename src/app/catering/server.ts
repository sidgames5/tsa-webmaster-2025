import express, { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Middleware to parse JSON

const SECRET_KEY = process.env.SECRET_KEY || '';  // Get SECRET_KEY from environment variables
const DATA_FILE = 'storage.txt';

// Encrypt and decrypt functions
function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

function decryptData(cipher: string): string {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// API route to handle catering form submissions
app.post('/api/catering', (req: Request, res: Response) => {
  const encrypted = encryptData(JSON.stringify(req.body));
  fs.appendFileSync(DATA_FILE, encrypted + '\n');  // Append data to storage.txt
  res.json({ message: 'Request saved successfully!' });
});

// Admin endpoint to get the catering requests
app.get('/api/admin/requests', (req: Request, res: Response) => {
  const lines = fs.readFileSync(DATA_FILE, 'utf-8').split('\n').filter(Boolean);
  const decrypted = lines.map(line => JSON.parse(decryptData(line)));
  res.json(decrypted);  // Send decrypted data to admin
});

app.listen(4000, () => console.log("Server running on http://localhost:3000"));
