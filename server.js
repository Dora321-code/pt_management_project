const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = 3000;


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

// Database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'software',
    password: 'manga13',
    port: 5432, // default Port
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/dashboard', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT students.student_name,supervisors.supervisor_name,supervisors.supervisor_email,students.allocation_date FROM students INNERJOIN supervisors ON students.supervisor_id = supervisors.supervisor_id;');
        const rows = result.rows;
        client.release();
        res.render('dashboard', { rows });
    } catch (err) {
        console.error(err);
        res.send('Error ' + err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
