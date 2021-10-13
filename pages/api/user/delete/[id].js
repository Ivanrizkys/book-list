import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if (req.method !== 'DELETE') return res.status(401).end()
    const auth = authApiForAdmin(req, res);

    const {id} = req.query;
    const deleteUser = await db('users').where({id}).del();
    const newUser = await db('users');

    res.status(200);
    res.json({
        message: "delete account succes",
        data : newUser
    })
}