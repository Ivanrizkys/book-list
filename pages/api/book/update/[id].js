import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if(req.method !== 'PUT') return res.status(401).end();

    const auth = await authApiForAdmin(req, res);

    const { id } = req.query;

    const {tittle, author, publisher, description} = req.body;

    const updateBook = await db('book').where({id}).update({tittle, author, publisher, description})

    const resUpdateBook = await db('book').where({id}).first();

    res.status(200);
    res.json({
        message: "update data succesfully",
        data: resUpdateBook
    });
}