import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler (req, res) {
    if(req.method !== 'POST') return res.status(401).end();

    const {username, password, email} = req.body;
    if(!username || !password || !email) return res.status(401).end();

    // * check email
    const checkEmail = await db('users').where({email}).first();
    if(!checkEmail) return res.status(401).json({message: "wrong email"});
    
    // * check username
    const checkUsername = await db('users').where({username}).first();
    if(!checkUsername) return res.status(401).json({message: " wrong username"});


    const selectUser = await db('users')
                        .where(function() {
                            this.where({username})
                        })
                        .andWhere({email})
                        .first();

    
    // * check password
    const checkPassword = bcrypt.compareSync(password, selectUser.password);
    if(!checkPassword) return res.status(401).json({message: "wrong password"});

    // * generate token
    const token = jwt.sign({
        id: selectUser.id,
        email: selectUser.email,
        username: selectUser.username
    },process.env.JWT_SECRET,{
        expiresIn: "7d"
    });


    res.status(200);
    res.json({
        message: "Login succes",
        token: token
    })
}