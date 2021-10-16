import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const auth = await authApiForAdmin(req, res);
    const {id} = req.query;
    const detail = await db('users').where({id}).first();

    res.status(200);
    res.json({
        message: "req detail succes",
        data: detail
    });
}