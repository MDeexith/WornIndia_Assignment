# IRCTC-like Railway Management System API

This project is a **Railway Management System API** inspired by IRCTC. Users can search for trains, check seat availability, book seats, and get booking details. Admins can manage trains and seat availability. The project is built using **Node.js**, **Express**, and **MySQL**.

## Features

1. **User Registration & Login**:
   - Users can register and log in with secure authentication.
   - JWT is used to secure routes and authenticate users.

2. **Train Management (Admin Only)**:
   - Admins can add new trains, including the source, destination, and total seat information.
   - Admin routes are protected by an API key to prevent unauthorized access.

3. **Seat Availability**:
   - Users can check the availability of seats between any two stations.

4. **Seat Booking**:
   - Users can book a seat if available.
   - Handles race conditions where multiple users attempt to book the same seat.

5. **Booking Details**:
   - Users can fetch specific booking details for a particular train after booking.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT
- **Authorization**: API key for admin routes
- **Security**: bcrypt for password hashing

## Requirements

- **Node.js** (v14 or above)
- **MySQL**

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/railway-management-api.git
   cd railway-management-api

## MySQL Database Setup

1. **Create the MySQL Database**:
   - Open your MySQL CLI or MySQL Workbench and run the following command to create the database:
     ```sql
     CREATE DATABASE railway_system;
     ```

2. **Create the Tables**:
   - After creating the database, switch to it:
     ```sql
     USE railway_system;
     ```

   - Run the following SQL commands to create the necessary tables:

   ```sql
   -- Users table to store user credentials
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL
   );

   -- Trains table to store train details
   CREATE TABLE trains (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     source VARCHAR(255) NOT NULL,
     destination VARCHAR(255) NOT NULL,
     totalSeats INT NOT NULL,
     availableSeats INT NOT NULL
   );

   -- Bookings table to track seat bookings
   CREATE TABLE bookings (
     id INT AUTO_INCREMENT PRIMARY KEY,
     userId INT NOT NULL,
     trainId INT NOT NULL,
     bookingTime DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (userId) REFERENCES users(id),
     FOREIGN KEY (trainId) REFERENCES trains(id)
   );