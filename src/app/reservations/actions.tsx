// src/app/reservations/actions.ts
'use server';

export async function reserveTable(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const guests = Number(formData.get('guests'));

  console.log('Reservation submitted:', { name, email, date, time, guests });

  // TODO: Save to database or send confirmation email
}
