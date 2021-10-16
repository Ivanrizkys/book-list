import db from '../../../libs/db';
import authApiForAdmin from '../../../middlewares/admin/authApiForAdmin';
import getReq from '../../../utils/getReq';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler (req, res) {
    if(req.method !== "POST") return res.status(401).end();
    
    const auth = await authApiForAdmin(req, res);

    const {fields, files} = await getReq(req);
    const { tittle, author, publisher, description} = fields;
    
    if(!tittle || !author || !publisher || !description ||!files.image) return res.status(401).end();

    // if (!files.image) return res.status(401).end();

    const { image:{ path } } = files;
    const create = await db('book').insert({tittle, author, publisher, description, image: path});
    const createdBook = await db('book').where({id: create}).first();

    res.status(200);
    res.json({
        message: "create data succesfully",
        data: createdBook
    });
}