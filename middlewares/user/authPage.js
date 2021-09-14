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