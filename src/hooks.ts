// import cookie from 'cookie';

// export const handle = async ({ event, resolve }) => {
//     const cookies = cookie.parse(event.request.headers.get('cookie') || '');
//     event.locals.user = cookies.user || null;
//     const response = await resolve(event);
//     if (event.locals.user) {
//         response.headers.set(
//             'set-cookie',
//             cookie.serialize('user', event.locals.user, {
//                 path: '/',
//                 httpOnly: true
//             })
//         );
//     }
//     return response;
// };

// export async function getSession(event) {
//     return {
//         user: event.locals.user
//     }
// }