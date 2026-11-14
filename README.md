# TRAVELX — Travel Booking Website

A black-and-gold travel booking starter built with React + Vite, Express, and MongoDB.

## Requirements
- Node.js 18+
- MongoDB local or MongoDB Atlas connection string

## Run locally

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```
The API runs at `http://localhost:5000`.

### 2. Frontend
Open another terminal:
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Open the Vite URL (usually `http://localhost:5173`).

Create a user with Register, sign in, browse destinations/hotels/packages, and submit a demo booking.
The checkout is a demo only: it does not charge a card or confirm a real hotel reservation.

## Deploy
- Deploy `client` to Vercel. Set `VITE_API_URL` to your deployed API URL (include `/api`).
- Deploy `server` to Render/Railway/Fly.io or another Node host. Set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN`.
- Do not put secrets in the frontend or commit `.env` files.

## Features
- Responsive dark luxury UI with gold accents
- Destination, hotel and package discovery
- Search/filter controls
- Register/login with JWT
- Booking creation and booking history
- Server-side price calculation from package/hotel data
- MongoDB models and seed data
- Demo checkout notice (payment integration intentionally not faked)
