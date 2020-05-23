const url = require('url');
const fs = require('fs');
const path = require('path');
// const cats = require('../data/cats');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, '../views/home', 'index.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    fs.readFile(path.join(__dirname, '/views', '404.html'), (err, data) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data, 'utf-8');
                    });
                } else {
                    // Some server error
                    res.writeHead(500);
                    res.end(`Server error: ${err.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data)
                res.end();
            }
        })

    } else {
        return true;
    }
}

