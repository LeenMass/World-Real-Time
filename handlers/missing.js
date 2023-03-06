const missingHandler=(request, response)=> {
    response.writeHead(404, {'content-type': 'text/html'});
    response.end('<h1>Page Not found</h1>');
  }
  module.exports = missingHandler;
  