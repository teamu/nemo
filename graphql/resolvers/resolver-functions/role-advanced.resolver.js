const { errorName } = require("../../../helper/message_format.helper");
const Role = require("../../../models/roles_new.model");

module.exports = {
  createNewRole: async (args, req) => {
    try {
      const data = args.newRoleInput;

      let refinedData = await refineFunction(data);

      const refinedDataToSave = new Role({
        ...refinedData
      });

      const result = await refinedDataToSave.save();

      return result;
    } catch (err) {
      throw err;
    }
  },

  roles: async (args, req) => {
    try {
      //   if (!req.isAuth) throw new Error(errorName.user_unauthorized);
      //   if (!req.isAdmin) throw new Error(errorName.user_unauthorized);

      const roles = await Role.find();
      return roles;
    } catch (err) {
      throw err;
    }
  }
};

let roleAccess = {
  entrant: {
    createEntry: false,
    viewEntry: false,
    editEntry: false,
    deleteEntry: false,
    addMedia: false,
    replaceMedia: false,
    deleteMedia: false,
    checkoutEntry: false
  },
  juror: {
    accessOpenJudgingSystem: false,
    voteOpenJudgingSystem: false,
    commentOpenJudgingSystem: false,
    accessVerifiedJudgingSystem: false,
    voteVerifiedJudgingSystem: false,
    commentVerifiedJudgingSystem: false,
    accessAssignedJudgingSystem: false,
    voteAssignedJudgingSystem: false,
    commentAssignedJudgingSystem: false
  }
};

let refineFunction = data => {
  return new Promise(resolve => {
    let roleDataRefined = {
      roleCategory: data.roleCategory.toLowerCase(),
      role: data.role.toLowerCase(),
      access: {
        entrant:
          data.roleCategory.toLowerCase() == "entrant"
            ? { ...data.access["entrant"] }
            : { ...roleAccess["entrant"] },
        juror:
          data.roleCategory.toLowerCase() == "juror"
            ? { ...data.access["juror"] }
            : roleAccess["juror"]
      }
    };

    resolve(roleDataRefined);
  });
};
