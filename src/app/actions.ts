// app/actions/reviews.ts
"use server";

import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// Load environment variables from .env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const REVIEWS_FILE_PATH = process.env.REVIEWS_FILE_PATH || 
  path.join(process.cwd(), 'data', 'reviews.json');

// Validate required env vars on server startup
if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  throw new Error(
    "Missing required environment variables: ADMIN_USERNAME and ADMIN_PASSWORD"
  );
}

// Helper function to ensure reviews file exists
async function ensureReviewsFile() {
  try {
    await fs.mkdir(path.dirname(REVIEWS_FILE_PATH), { recursive: true });
    try {
      await fs.access(REVIEWS_FILE_PATH);
    } catch {
      await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify([]));
    }
  } catch (err) {
    console.error("Error ensuring reviews file:", err);
    throw new Error("Failed to initialize reviews storage");
  }
}

// Type definitions
interface Review {
  name: string;
  message: string;
  image: string;
  timestamp: number;
}

interface ActionResponse {
  success: boolean;
  error?: string;
  message?: string;
  review?: Review;
  reviews?: Review[];
}

// Get all reviews
export async function getReviews(): Promise<Review[]> {
  await ensureReviewsFile();
  
  try {
    const data = await fs.readFile(REVIEWS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Review[];
  } catch (err) {
    console.error("Error reading reviews:", err);
    return [];
  }
}

// Submit a new review
export async function submitReview(formData: FormData): Promise<ActionResponse> {
  const name = formData.get('name')?.toString() || 'Anonymous';
  const message = formData.get('message')?.toString();
  const photo = formData.get('photo')?.toString();

  if (!message) {
    return { success: false, error: "Message required" };
  }

  const review: Review = {
    name,
    message,
    image: photo || "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
    timestamp: Date.now()
  };

  try {
    await ensureReviewsFile();
    const existingReviews = await getReviews();
    const updatedReviews = [...existingReviews, review];
    
    await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify(updatedReviews, null, 2));
    revalidatePath('/reviews');
    return { success: true, review };
  } catch (err) {
    console.error("Error submitting review:", err);
    return { success: false, error: "Internal server error" };
  }
}

// Admin login
export async function adminLogin(
  credentials: { username: string; password: string }
): Promise<ActionResponse> {
  const { username, password } = credentials;

  if (!username || !password) {
    return { success: false, error: "Credentials required" };
  }

  // Compare with environment variables
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Basic brute force protection
    return { success: false, error: "Invalid credentials" };
  }

  return { success: true, message: "Login successful" };
}

// Delete all reviews (admin only)
export async function deleteReviews(): Promise<ActionResponse> {
  try {
    await ensureReviewsFile();
    await fs.writeFile(REVIEWS_FILE_PATH, JSON.stringify([]));
    revalidatePath('/admin/reviews');
    return { success: true, message: "Reviews cleared" };
  } catch (err) {
    console.error("Error clearing reviews:", err);
    return { success: false, error: "Internal server error" };
  }
}

// Combined admin reviews action
export async function admin_reviews(
  action: 'get' | 'delete'
): Promise<ActionResponse | Review[]> {
  if (action === 'get') {
    const reviews = await getReviews();
    return reviews;
  } else if (action === 'delete') {
    return await deleteReviews();
  }
  return { success: false, error: "Invalid action" };
}