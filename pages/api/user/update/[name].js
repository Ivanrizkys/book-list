import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if (req.method !== 'PUT') return res.status(401).end();
    const auth = await authApiForAdmin(req, res);
    const {name} = req.query;
    const {username, email} = req.body;
    if (!username || !email) return res.status(401).end();

    const updateUser = await db('users').where({username:name}).update({username, email});
    const resUpdateUser = await db('users').where({username}).first();
    console.log(resUpdateUser);

    res.status(200);
    res.json({
        message: "edit users succesfully",
        data: resUpdateUser
    })
}