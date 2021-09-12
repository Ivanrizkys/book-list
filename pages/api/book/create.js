import db from '../../../libs/db';
import authApiForAdmin from '../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if(req.method !== "POST") return res.status(401).end();

    const auth = await authApiForAdmin(req, res);

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