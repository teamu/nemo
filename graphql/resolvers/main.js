const userResolver = require("./resolver-functions/user.resolver");
const itemResolver = require("./resolver-functions/item.resolver");
const roleResolver = require("./resolver-functions/role.resolver");
const roleNewRolver = require("./resolver-functions/role-advanced.resolver");

const rootResolver = {
  ...userResolver,
  ...itemResolver,
  ...roleResolver,
  ...roleNewRolver
};

module.exports = rootResolver;
