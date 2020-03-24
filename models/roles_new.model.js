const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleNewSchema = new Schema({
  roleCategory: {
    type: String,
    enum: ["entrant", "juror", "admin"]
  },
  role: {
    type: String,
    required: true
  },
  access: {
    entrant: {
      createEntry: {
        type: Boolean,
        required: true,
        default: false
      },
      viewEntry: {
        type: Boolean,
        required: true,
        default: false
      },
      editEntry: {
        type: Boolean,
        required: true,
        default: false
      },
      deleteEntry: {
        type: Boolean,
        required: true,
        default: false
      },
      addMedia: {
        type: Boolean,
        required: true,
        default: false
      },
      replaceMedia: {
        type: Boolean,
        required: true,
        default: false
      },
      deleteMedia: {
        type: Boolean,
        required: true,
        default: false
      },
      checkoutEntry: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    juror: {
      accessOpenJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      voteOpenJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      commentOpenJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      accessVerifiedJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      voteVerifiedJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      commentVerifiedJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      accessAssignedJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      voteAssignedJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      },
      commentAssignedJudgingSystem: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  }
});

module.exports = mongoose.model("roleNewSchema", roleNewSchema);
