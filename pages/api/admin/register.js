import bcrypt from 'bcryptjs';
import db from '../../../libs/db';

export default async function handler (req, res) {
    if(req.method !== 'POST') return res.status(401).end();

    const { username, email, password } = req.body;

    if ( !username || !email || !password ) return res.status(401).end();

    // * hash pasword using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const passwordHash= bcrypt.hashSync(password, salt);

    // *store data to db
    const createUser = await db('admin')
                        .insert({
                            username,
                            email,
                            password: passwordHash       
                        });
    
    const registeredUser = await db('admin').where({id: createUser}).first();

    
    res.status(200);
    res.json({
        message: "create account admin succesfully",
        data: registeredUser
    });
}