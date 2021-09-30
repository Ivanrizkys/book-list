import db from '../../../../libs/db';
import authApiForAdmin from '../../../../middlewares/admin/authApiForAdmin';
import formidable from 'formidable';

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

    const promise = new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = "./public/cover"

        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields,files})
        })
    })

    return promise.then( async ({fields, files}) => {
        const {tittle, author, publisher, description} = fields;
        if (!tittle || !author || !publisher || !description) return res.status(401).end()
        
        if (files.image) {
            const { image: { path } } = files;
            const { image } = await db('book').select('image').where({id}).first();
            fs.unlink(image, err => {
                if (err) console.log(err);
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
        
    })

}