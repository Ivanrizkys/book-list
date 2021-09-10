import db from '../../../libs/db';

export default async function handler (req, res) {
    if (req.method !== "GET") return res.status(401).end()

    const selectBook = await db('book');

    res.status(200);
    res.json({
        message: "select data succesfully",
        data: selectBook
    })
}