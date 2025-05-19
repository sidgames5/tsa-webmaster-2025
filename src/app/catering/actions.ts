'use server';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function handleCateringSubmit(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const payment = formData.get('payment') as string;
    const eventType = formData.get('eventType') as string;
    const eventDate = formData.get('eventDate') as string;
    const details = formData.get('details') as string;

    console.log('Catering request submitted:', {
        name,
        email,
        address,
        payment,
        eventType,
        eventDate,
        details
    });

    try {
        const db = await open({
            filename: '.run/catering.db',
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS catering_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                address TEXT NOT NULL,
                payment TEXT NOT NULL,
                event_type TEXT NOT NULL,
                event_date TEXT NOT NULL,
                details TEXT,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check for existing catering requests on the same date
        const existingRequest = await db.get(
            `SELECT * FROM catering_requests WHERE event_date = ?`,
            eventDate
        );

        if (existingRequest) {
            // return {
            //     error: 'We already have a catering request for this date. Please contact us for availability.',
            // };
        }

        await db.run(
            `INSERT INTO catering_requests 
            (name, email, address, payment, event_type, event_date, details) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            name, email, address, payment, eventType, eventDate, details
        );

        // return {
        //     success: true,
        //     message: 'Your catering request has been submitted successfully! We will contact you soon.'
        // };
    } catch (error) {
        console.error('Error submitting catering request:', error);
        // return {
        //     error: 'An error occurred while submitting your request. Please try again later.'
        // };
    }
}