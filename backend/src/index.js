const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const validator = require('email-validator');
const cors = require("cors");
const jwt = require('jsonwebtoken');


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const JWT_SECRET_KEY = 'miegacoan';



const verifyToken = (req, res, next) => {
    // get Bearer Token
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(200).json({ response: false, message: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.userId = decoded.userId;
        // lanjut
        next();
    } catch (error) {
        res.status(200).json({ response: false, message: 'Invalid token', error });
    }
}

app.get("/", (req, res) => {
    // default home page
    res.send("Hello World");
})

app.get('/api/profile', verifyToken, async (req, res) => {
    try {
        // cari user berdasarkan id
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if (!user) {
            return res.status(200).json({ response: false, message: 'Akun tidak ditemukan' });
        }
        return res.status(200).json({ response: true, message: 'success', user: user });
    } catch (error) {
        res.status(200).json({ response: false, message: 'Terjadi kesalahan', error });
    }
});


app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(200).json({ response: false, message: 'Email atau password kamu salah' });
        }
        if (password != user.password) {
            return res.status(200).json({ response: false, message: 'Email atau password kamu salah' });
        }
        // generate jwt berdasarkan userId
        const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });

        res.json({ response: true, message: 'Login berhasil', token });
    } catch (error) {
        res.status(200).json({ response: false, message: 'Terjadi kesalahan', error });
    }
});

app.post('/api/signup', async (req, res) => {
    const { name, gender, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }],
            },
        });
        if (existingUser) {
            return res.status(200).json({ response: false, message: 'Email sudah terdaftar' });
        } else if (!name) {
            return res.status(200).json({ response: false, message: 'Nama harus diisi' });
        } else if (!email) {
            return res.status(200).json({ response: false, message: 'Email harus diisi' });
        } else if (!password) {
            return res.status(200).json({ response: false, message: 'Password harus diisi' });
        } else if (!/[a-zA-Z]/.test(name)) {
            return res.status(200).json({ response: false, message: 'Nama setidaknya terdiri dari satu huruf' });
        } else if (name.length < 4) {
            return res.status(200).json({ response: false, message: 'Nama minimal 4 karakter' });
        } else if (name.length > 32) {
            return res.status(200).json({ response: false, message: 'Nama maksimal 32 karakter' });
        } else if (!validator.validate(email)) {
            return res.status(200).json({ response: false, message: 'Email tidak valid' });
        } else if (password.length > 32) {
            return res.status(200).json({ response: false, message: 'Password maksimal 32 karakter' });
        } else if (password.length < 6) {
            return res.status(200).json({ response: false, message: 'Password minimal 6 karakter' });
        } else if (gender !== 'male' && gender !== 'female') {
            return res.status(200).json({ response: false, message: 'Jenis kelamin tidak valid' });
        } else {
            const user = await prisma.user.create({
                data: { name, gender, email, password },
            });
            res.status(200).json({ response: true, message: 'Akun berhasil dibuat', user });
        }
    } catch (error) {
        res.status(200).json({ response: false, message: 'Terjadi kesalahan', error });
    }
});


const port = 3001;
app.listen(port, () => {
    console.log("server started on port " + port)
})