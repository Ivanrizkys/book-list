import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if (req.method !== 'GET') return res.status(401).end();

    const auth = authApiForAdmin(req, res);

    const { id } = req.query;
    
    const book = await db('book').where({id}).first();

    res.status(200);
    res.json({
        message: "get detail book succes",
        data: book
    })
}