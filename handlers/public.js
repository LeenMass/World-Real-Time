const fs = require('fs');
const path = require('path');

const types = {
  html: 'text/html',
  css: 'text/css',
  js: 'aplication/javascript',
  jpg: 'image/jpeg',

};

const publicHandler=(request, response) =>{
  const url = request.url;
  const array = url.split('.');
  const extension = array[1];
  const type = types[extension];
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, {'content-header': 'text/html'});
      response.end('<h1>Not Found</h1>');
    } else {
      response.writeHead(200, {'content-header': type});
      response.end(file);
    }
  });
}
module.exports = publicHandler;