import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if (req.method !== 'PUT') return res.status(401).end();
    const auth = await authApiForAdmin(req, res);
    const {id} = req.query;
    const {username, email} = req.body;
    if (!username || !email) return res.status(401).end();

    const updateUser = await db('users').where({id}).update({username, email});
    const resUpdateUser = await db('users').where({username}).first();

    res.status(200);
    res.json({
        message: "edit users succesfully",
        data: resUpdateUser
    })
}