import db from '../../../libs/db';

export default async function handler (req, res) {
    if(req.method !== "POST") return res.status(401).end()

    const {tittle, author, publisher, description} = req.body;

    if(!tittle || !author || !publisher) return res.status(401).end();

    const create = await db('book').insert({tittle, author, publisher, description});

    const createdBook = await db('book').where({id: create})

    res.status(200);
    res.json({
        message:"create book succesfully",
        data: createdBook
    });
}