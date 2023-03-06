
const homeHandler = require('./handlers/home');
const publicHandler = require('./handlers/public');
const missingHandler = require('./handlers/missing');
const router = (request, response) => {
  const url = request.url;
  if (url == '/') {
    homeHandler(request, response);
  } else if (url.includes('handlers/Public')) {
    publicHandler(request, response);
  } else {
    missingHandler(request, response);
  }
}
module.exports = router;
