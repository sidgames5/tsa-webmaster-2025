'use server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

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
