import db from '../../../libs/db';
import authApi from '../../../middlewares/user/authApi';

export default async function handler (req, res) {
    if (req.method !== "GET") return res.status(401).end()

    const auth = await authApi(req, res); 

    const selectBook = await db('book');

    res.status(200);
    res.json({
        message: "select data succesfully",
        data: selectBook
    });
}