import cookies from 'next-cookies';

export function unAuthPage (context) {
    return new Promise( resolve => {
        const { userCookie } = cookies(context);
        if (userCookie)
            return context.res.writeHead(302, {
                Location: '/'
            }).end();
        
        return resolve('unauthorized');
    })
}

export function authPage (context) {
    return new Promise (resolve => {
        const { userCookie } = cookies(context);
        if (!userCookie)
            return context.res.writeHead(302, {
                Location: '/auth/login/'
            }).end();

        return resolve({
            token: userCookie
        });
    })
}