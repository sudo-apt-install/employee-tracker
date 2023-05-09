const express = require("express");
const mysql = require("mysql2");
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: "localhost",
    },
    
    console.log('Connected to the database')
);



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})