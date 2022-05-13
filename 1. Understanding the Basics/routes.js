const fs = require("fs");
const reqRoutes = (req, res) => {
    const path = req.url;
    const method = req.method;

    if (path === "/") {
        res.write("<html>");
        res.write("<head><title>Basic Node js</title></head>");
        res.write(
            "<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>"
        );
        res.write("</html>");
        return res.end();
    }
    if (path === "/message" && method === "POST") {
        console.log("start");
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];

            fs.writeFile("message.txt", message, (error) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title><head>");
    res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
    res.write("</html>");
    res.end();
};

module.exports = reqRoutes;