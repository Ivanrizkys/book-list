import jwt from 'jsonwebtoken';

export default function authApi (req, res) {
    return new Promise((resolve) => {
        const { authorization } = req.headers;
        if(!authorization) return res.status(401).end();
    
        const splitToken = authorization.split(" ");
        const [tokenType, token] = splitToken;
    
        if(tokenType !== "Bearer") return res.status(401).end();
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return res.status(401).end();
            return resolve(decoded);
        });   
    })
}