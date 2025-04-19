const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const publicDir = path.join(__dirname, 'public');

 const output = fs.createWriteStream('./logs.txt', { flags: 'w' });
 const errorOutput = fs.createWriteStream('./error.txt', { flags: 'w' });
 const logger = new console.Console(output, errorOutput);

    logger.log('This will be written to output.log');
    logger.error('This will be written to error.log');


const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      logger.log('Received POST request:');
      logger.log('  Method:', req.method);
      logger.log('  URL:', req.url);
      logger.log('  Headers:', req.headers);
      logger.log('  Body:', body);
      res.statusCode = 200;
      res.end('POST request received and logged.');
    });
  } else {
    httpHandler(req,res);

  }
});

server.on


server.listen(port, hostname, () => {
    logger.log(`Server running at http://${hostname}:${port}/`);
});

function httpHandler(req, res) {
     fs.readFile('./public/' + req.url, function (err, data) {

         if (err == null ) {
             res.writeHead(200, {'Content-Type': 'text/html'});
             res.write(data);
             res.end();
         }
     });
 }