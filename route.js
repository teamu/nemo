const graphqlHttp = require("express-graphql");
const bodyParser = require("body-parser");
const { graphqlExpress } = require("apollo-server-express");

const { errorType } = require("./helper/message_format.helper");
const graphQlSchema = require("./graphql/schema/schema");
const graphQlResolvers = require("./graphql/resolvers/main");
const isAuth = require("./middlewares/authentication.middleware");

let getErrorType = errorName => {
  console.log(errorName);
  let error = errorType[errorName];
  if (error) {
    return errorType[errorName];
  }
  return { ...errorType.intrnal_server_error, remark: errorName };
};

module.exports = function(app) {
  app.use(isAuth);

  app.use(
    "/api",
    bodyParser.json(),
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      customFormatErrorFn: err => getErrorType(err.message),
      graphiql: true
    })
  );
};
