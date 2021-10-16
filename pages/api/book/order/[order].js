import db from '../../../../libs/db';
import authApi from "../../../../middlewares/user/authApi";

export default async function handler (req, res) {
    if (!req.method === 'GET') return res.status(401).end();
    const auth = await authApi(req, res);

    const {order} = req.query;
    const orderBook = await db('book').orderBy(`${order}`);

    res.status(200);
    res.json({
        messsage: "order book succes",
        data: orderBook
    });
}