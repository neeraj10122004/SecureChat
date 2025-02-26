const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const jwtsecret = process.env.SECRET_KEY;
mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());

app.post("/register", async (req, res) => {
    console.log("register");
    const { username, password } = req.body;
    
    try {
        const user = await User.create({ username, password });
        jwt.sign({ userId: user._id }, jwtsecret, {}, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "JWT Error" });
            }
            res.cookie('token', token, { httpOnly: true }).status(201).json({ message: 'User registered' });
        });
    } catch (e) {
        return res.status(500).json({ error: 'Unique error' });
    }
});

app.listen(process.env.PORT, () => {
    console.log("Server listening on port", process.env.PORT);
});
