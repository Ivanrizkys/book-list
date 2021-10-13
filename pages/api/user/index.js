import db from '../../../libs/db';
import authApiForAdmin from '../../../middlewares/admin/authApiForAdmin'

export default async function handler (req, res) {
    if (req.method !== 'GET') return res.status(401).end();
    const auth = await authApiForAdmin(req, res);
    const users = await db('users');

    res.status(200);
    res.json({
        message: "selected all users",
        data: users
    })
}