import db from '../../../libs/db';
import authApiForAdmin from '../../../middlewares/admin/authApiForAdmin';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler (req, res) {
    if(req.method !== "POST") return res.status(401).end();
    
    const auth = await authApiForAdmin(req, res);

    const promise = new Promise ((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = "./public/cover";

        form.parse (req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields,files})
        });
    });

    return promise.then( async ({fields, files}) => {
        const { tittle, author, publisher, description, image} = fields;
        
        if(!tittle || !author || !publisher) return res.status(401).end();

        if (!files.image) return res.status(401).end();

        // console.log(files);
        const { image:{ path } } = files;
        // console.log(typeof path)
        // path.replace("public\\", "");
        // console.log(path);
        const create = await db('book').insert({tittle, author, publisher, description, image: path});
        console.log(create);
        const createdBook = await db('book').where({id: create}).first();
        // console.log( createdBook );


        res.status(200);
        res.json({
            message: "create data succesfully",
            data: createdBook
        })
    })










    // if(req.method !== "POST") return res.status(401).end();

    // const auth = await authApiForAdmin(req, res);

    // const {tittle, author, publisher, description} = req.body;

    // if(!tittle || !author || !publisher) return res.status(401).end();

    // const create = await db('book').insert({tittle, author, publisher, description});

    // const createdBook = await db('book').where({id: create}).first();

    // res.status(200);
    // res.json({
    //     message:"create book succesfully",
    //     data: createdBook
    // });
}