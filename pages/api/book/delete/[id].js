import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';

export default async function handler (req, res) {
    if (req.method !== "DELETE") return res.status(401).end();

    const auth = await authApiForAdmin(req, res);

    const {id} = req.query;

    const deletedBook = await db('book').where({id}).del();
    
    res.status(200);
    res.json({
        message: "delete data succesfully"
    })
}