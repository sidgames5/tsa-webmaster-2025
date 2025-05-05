'use server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// TODO: Sid check the commented code below and make the email work, also add the stuff in a .env file

export async function reserveTable(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const guests = Number(formData.get('guests'));

    console.log('Reservation submitted:', { name, email, date, time, guests });

    const db = await open({
        filename: '.run/reservations.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            guests INTEGER NOT NULL
        )
    `);

    // this checks if there is another resevation within 15 mintues
    const existingReservation = await db.get(
        `
        SELECT * FROM reservations 
        WHERE date = ? 
        AND ABS(strftime('%s', time) - strftime('%s', ?)) < 900
        `,
        date, time
    );

    if (existingReservation) {
        return {
            error: 'There are too many reservations at this time. Please choose another time.',
        };
    }

    await db.run(
        `INSERT INTO reservations (name, email, date, time, guests) VALUES (?, ?, ?, ?, ?)`,
        name, email, date, time, guests,
    );

    return {
        success: true,
        message: 'Reservation successful!'
    }
}

{/* 
    
    
    'use server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import nodemailer from 'nodemailer';

// Email configuration - replace with your actual SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // or your SMTP host
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASSWORD, // your email password or app password
    },
});

export async function reserveTable(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const guests = Number(formData.get('guests'));
    const comments = formData.get('comments') as string;

    console.log('Reservation submitted:', { name, email, date, time, guests });

    const db = await open({
        filename: '.run/reservations.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            guests INTEGER NOT NULL,
            comments TEXT
        )
    `);

    // Check for existing reservations
    const existingReservation = await db.get(
        `
        SELECT * FROM reservations 
        WHERE date = ? 
        AND ABS(strftime('%s', time) - strftime('%s', ?)) < 900
        `,
        date, time
    );

    if (existingReservation) {
        return {
            error: 'There are too many reservations at this time. Please choose another time.',
        };
    }

    // Insert the reservation
    await db.run(
        `INSERT INTO reservations (name, email, date, time, guests, comments) VALUES (?, ?, ?, ?, ?, ?)`,
        name, email, date, time, guests, comments
    );

    // Format the date for the email
    const reservationDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    try {
        // Send email to restaurant
        await transporter.sendMail({
            from: `"Sprout & Spoon Reservations" <${process.env.EMAIL_USER}>`,
            to: 'sproutandspoon@gmail.com', // your restaurant email
            subject: `New Reservation from ${name}`,
            html: `
                <h2>New Reservation Details</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${reservationDate}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Number of Guests:</strong> ${guests}</p>
                <p><strong>Comments:</strong> ${comments || 'None'}</p>
            `
        });

        // Send confirmation email to customer
        await transporter.sendMail({
            from: `"Sprout & Spoon" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Reservation Confirmation',
            html: `
                <h2>Thank you for your reservation, ${name}!</h2>
                <p>We're looking forward to serving you at Sprout & Spoon.</p>
                <h3>Reservation Details:</h3>
                <p><strong>Date:</strong> ${reservationDate}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Party Size:</strong> ${guests}</p>
                ${comments ? `<p><strong>Your Notes:</strong> ${comments}</p>` : ''}
                <p>If you need to make any changes, please contact us at (123) 456-7890 or reply to this email.</p>
                <p>We look forward to seeing you!</p>
                <p>The Sprout & Spoon Team</p>
            `
        });

        return {
            success: true,
            message: 'Reservation successful! A confirmation has been sent to your email.'
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: true,
            message: 'Reservation successful! However, we encountered an issue sending your confirmation email.'
        };
    }
}
    
    
    */}