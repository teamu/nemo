const NewRoleType = `
    type NewRole {
        roleCategory: String!
        role: String!
        access: Access!
    }`;

const AccessType = `
    type Access {
        entrant: EntrantAccess
        juror: JurorAccess
    }`;

const EntrantAccessType = `
    type EntrantAccess {
        createEntry: Boolean
        viewEntry: Boolean
        editEntry: Boolean
        deleteEntry: Boolean
        addMedia: Boolean
        replaceMedia: Boolean
        deleteMedia: Boolean
        checkoutEntry: Boolean
    }`;

const JurorAccessType = `
    type JurorAccess {
        accessOpenJudgingSystem: Boolean
        voteOpenJudgingSystem: Boolean
        commentOpenJudgingSystem: Boolean
        accessVerifiedJudgingSystem: Boolean
        voteVerifiedJudgingSystem: Boolean
        commentVerifiedJudgingSystem: Boolean
        accessAssignedJudgingSystem: Boolean
        voteAssignedJudgingSystem: Boolean
        commentAssignedJudgingSystem: Boolean
    } `;

const NewRoleInput = `
    input NewRoleInput {
        roleCategory: String!
        role: String!
        access: AccesInput!
    }`;

const AccesInput = `
input AccesInput {
    entrant: EntrantAccessInput
    juror: JurorAccessInput
}`;

const EntrantAccessInput = `
    input EntrantAccessInput {
        createEntry: Boolean
        viewEntry: Boolean
        editEntry: Boolean
        deleteEntry: Boolean
        addMedia: Boolean
        replaceMedia: Boolean
        deleteMedia: Boolean
        checkoutEntry: Boolean
    }`;

const JurorAccessInput = `
    input JurorAccessInput {
        accessOpenJudgingSystem: Boolean
        voteOpenJudgingSystem: Boolean
        commentOpenJudgingSystem: Boolean
        accessVerifiedJudgingSystem: Boolean
        voteVerifiedJudgingSystem: Boolean
        commentVerifiedJudgingSystem: Boolean
        accessAssignedJudgingSystem: Boolean
        voteAssignedJudgingSystem: Boolean
        commentAssignedJudgingSystem: Boolean
    } `;

const createNewRole = `
    createNewRole(newRoleInput: NewRoleInput!): NewRole 
`;

module.exports = {
  NewRoleType,
  AccessType,
  EntrantAccessType,
  JurorAccessType,
  NewRoleInput,
  AccesInput,
  EntrantAccessInput,
  JurorAccessInput,
  createNewRole
};
