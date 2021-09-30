import formidable from "formidable";

export default function getReq (req) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = "./public/cover";

        form.parse (req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({fields, files});
        });
    });
}