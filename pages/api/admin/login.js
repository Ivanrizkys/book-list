import db from '../../../libs/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(401).end();

    const {username, password, email} = req.body;

    if (!username || !password || !email) return res.status(401).end();

    // * check username
    const checkUsername = await db('admin').where({username}).first();
    if (!checkUsername) return res.status(401).json({message: "wrong username"});

    // * check email
    const checkEmail = await db('admin').where({email}).first();
    if (!checkEmail) return res.status(401).json({message: "wrong email"});

    const getAdmin = await db('admin')
                        .where(function () {
                            this.where({username})
                        })
                        .andWhere({email})
                        .first()

    //* check password
    const checkPassword = bcrypt.compareSync(password, getAdmin.password);
    if (!checkPassword) return res.status(401).json({message: "wrong password"});

    // * generate token
    const token = jwt.sign({
        id: getAdmin.id,
        username,
        email,
        isAdmin: true
    },process.env.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.status(200);
    res.json({
        message: "login succes",
        token
    });
}