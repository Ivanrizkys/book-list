import db from '../../../libs/db';
import bcrypt from 'bcryptjs';


export default async function handler (req, res) {
    if(req.method !== 'POST') return res.status(401).end();

    const { username, password, email } = req.body;

    if(!username || !password || !email) return res.status(401).end()

    // * hash password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    
    const createUser = await db('users').insert({
        username,
        password: passwordHash,
        email
    });

    const registeredUser = await db('users').where({id:createUser}).first();

    res.status(200);
    res.json({
        message: "create new acoount succesfully",
        user: registeredUser
    });
}