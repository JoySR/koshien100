const headerHandler = (request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  next();
}

const optionsHandler = (request, response, next) => {
  response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Credentials", false);
  response.setHeader("Access-Control-Max-Age", '86400'); // 24 hours
  response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  response.send('You got the options');
}

const rootHandler = (request, response, next) => {
  if (request.path === '/') {
    response.send(200, 'this is the server');
  } else {
    next();
  }
};

const notFoundHandler = (request, response, next) => {
  response.send(404, 'page not found');
};

const errorHandler = (error, request, response, next) => {
  response.send(error);
};

export default {
  optionsHandler,
  headerHandler,
  rootHandler,
  notFoundHandler,
  errorHandler
};
