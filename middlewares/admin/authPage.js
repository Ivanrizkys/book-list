import cookies from 'next-cookies';

export function unAuthPage (context) {
    return new Promise( resolve => {
        const { adminCookie } = cookies(context);
        if (adminCookie)
            return context.res.writeHead(302, {
                Location: '/admin'
            }).end();
        
        return resolve('unauthorized');
    })
}

export function authPage (context) {
    return new Promise (resolve => {
        const { adminCookie } = cookies(context);
        if (!adminCookie)
            return context.res.writeHead(302, {
                Location: '/admin/auth/login/'
            }).end();

        return resolve({
            token: adminCookie
        });
    })
}