const http = require('http');
const DEFAULT_USER = { username: "CleoSilva", password: "123" }

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page');
        return response.end();
    },
    '/login:post': async (request, response) => {
        // response é um iterator
        for await (const data of request) {
            const user = JSON.parse(data);
            if (user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
                response.writeHead(401);
                response.write('Loggin failed!');
                return response.end();
            }
            response.write('Loggin has succeeded!');
            return response.end();
        }
    },
    default: (request, response) => {
        response.write('Hello World');
        return response.end();
    }
}

const handler = function (request, response) {
    const { url, method } = request;
    const roteKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[roteKey] || routes.default;
    response.writeHead(200, {
        'Content-type': 'text/html'
    })
    return chosen(request, response);
}

const app = http.createServer(handler)
    .listen(3000, () => console.log('app running at', 3000));


module.exports = app;