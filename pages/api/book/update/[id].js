import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';
import getReq from '../../../../utils/getReq';

const fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler (req, res) {
    if(req.method !== 'PUT') return res.status(401).end();

    const auth = await authApiForAdmin(req, res);

    const { id } = req.query;

    const {fields, files} = await getReq(req);
    const {tittle, author, publisher, description} = fields;

    if (!tittle || !author || !publisher || !description) return res.status(401).end()
    if (files.image) {
        const { image: { path } } = files;
        const { image } = await db('book').select('image').where({id}).first();
        fs.unlink(image, err => {
            if (err) res.status(401).json({message: err});
        })

        const upImageData = await db('book').where({id}).update({image: path});
    }

    const updateBook = await db('book').where({id}).update({tittle, author, publisher, description});
    const resUpdatedBook = await db('book').where({id}).first();

    res.status(200);
    res.json({
        message: "update book succesfully",
        data: resUpdatedBook
    });



}