# Frontend Documentation

## Overview

This document provides a detailed guide to setting up, running, and understanding the frontend project. It includes installation instructions, environment configuration, project structure, and available scripts.

---

## Project Setup

### Installation

To install the necessary packages, run the following command:

```bash
npm install
```

### Development Server

To start the development server, run:

```bash
npm run dev
```

### Environment Variables

Create a `.env` file in the root of the frontend folder and add the following environment variables:

```env
VITE_BASE_URL=<your_backend_api_url>
VITE_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
```

---

## Project Structure

Below is the structure of the project directory for better understanding and navigation:

```plaintext
frontend/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── component/
│   │   ├── ConfirmRidePopup.jsx
│   │   ├── ConfirmedRide.jsx
│   │   ├── FinishRide.jsx
│   │   ├── LiveTracking.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   ├── LookingForDriver.jsx
│   │   ├── RidePopup.jsx
│   │   ├── VehiclePanel.jsx
│   │   ├── WaitingForDriver.jsx
│   ├── context/
│   │   ├── CaptainContext.jsx
│   │   ├── SocketContext.jsx
│   │   ├── UserContext.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── CaptainDetails.jsx
│   │   ├── CaptainHome.jsx
│   │   ├── CaptainLogin.jsx
│   │   ├── CaptainProtectWrapper.jsx
│   │   ├── CaptainRiding.jsx
│   │   ├── CaptainSignup.jsx
│   │   ├── Home.jsx
│   │   ├── Riding.jsx
│   │   ├── Start.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserProtectWrapper.jsx
│   │   ├── UserSignup.jsx
│   ├── slices/
│   │   ├── authSlice.js
│   ├── store/
│   │   ├── store.js
├── tailwind.config.js
├── vite.config.js
```

---

## Available Scripts

In the project directory, you can run the following script:

### `npm run dev`

Runs the app in development mode. Once started, you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Notes

- Ensure that all environment variables are correctly set in the `.env` file before starting the development server.
- The project structure is modular to facilitate scalability and maintainability.
- Tailwind CSS and ESLint configurations are included for styling consistency and code quality.

---



