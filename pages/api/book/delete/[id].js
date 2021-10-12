import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';
import fs from 'fs';

export default async function handler (req, res) {
    if (req.method !== "DELETE") return res.status(401).end();

    const auth = await authApiForAdmin(req, res);

    const {id} = req.query;
    const {image} = await db('book').select('image').where({id}).first();
    const deletedBook = await db('book').where({id}).del();
    fs.unlink(image, err => {
        if (err) res.status(401).json({message: err});
    });
    const bookUpdated = await db('book');
    
    res.status(200);
    res.json({
        message: "delete data succesfully",
        data: bookUpdated
    })
}