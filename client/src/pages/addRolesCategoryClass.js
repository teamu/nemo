import React, { Component } from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';
import { Mutation } from '@apollo/react-components';
import { Redirect } from 'react-router-dom';
import { CREATE_NEW_ROLE } from '../queries/queries';

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 }
  }
};

const roleCategory = ['Entrant', 'Juror'];
const roleAccess = {
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

class AddRolesCategory extends Component {
  state = {
    roleAccessData: [],
    roleAccessDataFlag: false,
    roleData: {
      role: null,
      roleCategory: null,
      access: { ...roleAccess }
    },
    toLogin: false
  };

  roleAccessHandler = value => {
    if (!roleAccess[value.toLowerCase()]) return this.setState({ roleAccessDataFlag: false });
    this.updateState(value.toLowerCase()).then(() => this.setState({ roleAccessDataFlag: true }));
  };

  updateState = value => {
    return new Promise(resolve => {
      this.setState({ roleAccessData: Object.keys(roleAccess[value]) });
      resolve();
    });
  };

  submitHandler = async (event, addUserRole) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let data = await this.refineFunction(values);
        await this.updateRoleState(data);
        addUserRole()
          .then(({ data }) => {
            this.setState({ toLogin: true });
          })
          .catch(error => {
            let errorType = JSON.parse(JSON.stringify(error));
            return this.props.form.setFields({
              role: {
                value: '',
                errors: [new Error(errorType.networkError.result.errors[0].message)]
              }
            });
          });
      }
    });
  };

  refineFunction = data => {
    return new Promise(resolve => {
      let key = data.roleCategory.toLowerCase();
      let refinedAccessData = {};
      for (let property in roleAccess[key]) {
        refinedAccessData[property] = data[property];
      }
      let roleDataRefined = {
        roleCategory: data.roleCategory.toLowerCase(),
        role: data.role.toLowerCase(),
        access: {
          entrant:
            data.roleCategory.toLowerCase() == 'entrant'
              ? { ...refinedAccessData }
              : { ...roleAccess['entrant'] },
          juror:
            data.roleCategory.toLowerCase() == 'juror'
              ? { ...refinedAccessData }
              : roleAccess['juror']
        }
      };
      resolve(roleDataRefined);
    });
  };

  updateRoleState = data => {
    return new Promise(async resolve => {
      this.setState({ roleData: { ...data } }, () => {
        resolve();
      });

      resolve();
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.toLogin === true) {
      return <Redirect to="/login" />;
    }
    return (
      <Mutation
        mutation={CREATE_NEW_ROLE}
        variables={{
          roleCategory: this.state.roleData.roleCategory,
          role: this.state.roleData.role,
          createEntry: this.state.roleData.access.entrant.createEntry,
          viewEntry: this.state.roleData.access.entrant.viewEntry,
          editEntry: this.state.roleData.access.entrant.editEntry,
          deleteEntry: this.state.roleData.access.entrant.deleteEntry,
          addMedia: this.state.roleData.access.entrant.addMedia,
          replaceMedia: this.state.roleData.access.entrant.replaceMedia,
          deleteMedia: this.state.roleData.access.entrant.deleteMedia,
          checkoutEntry: this.state.roleData.access.entrant.checkoutEntry,
          accessOpenJudgingSystem: this.state.roleData.access.juror.accessOpenJudgingSystem,
          voteOpenJudgingSystem: this.state.roleData.access.juror.voteOpenJudgingSystem,
          commentOpenJudgingSystem: this.state.roleData.access.juror.commentOpenJudgingSystem,
          accessVerifiedJudgingSystem: this.state.roleData.access.juror.accessVerifiedJudgingSystem,
          voteVerifiedJudgingSystem: this.state.roleData.access.juror.voteVerifiedJudgingSystem,
          commentVerifiedJudgingSystem: this.state.roleData.access.juror
            .commentVerifiedJudgingSystem,
          accessAssignedJudgingSystem: this.state.roleData.access.juror.accessAssignedJudgingSystem,
          voteAssignedJudgingSystem: this.state.roleData.access.juror.voteAssignedJudgingSystem,
          commentAssignedJudgingSystem: this.state.roleData.access.juror
            .commentAssignedJudgingSystem
        }}
      >
        {(addUserRole, { data, loading, error }) => {
          return (
            <div id="form_id">
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                name="basic"
                layout="horizontal"
                onSubmit={e => this.submitHandler(e, addUserRole)}
              >
                <Form.Item label="Role Category">
                  {getFieldDecorator('roleCategory', {
                    rules: [{ required: true, message: 'Please select a role category!' }]
                  })(
                    <Select onSelect={(event, value) => this.roleAccessHandler(event, value)}>
                      {roleCategory.map(element => (
                        <Select.Option value={element}>{element}</Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="Role">
                  {getFieldDecorator('role', {
                    rules: [{ required: true, message: 'Please enter a role!' }]
                  })(<Input />)}
                </Form.Item>

                {this.state.roleAccessDataFlag
                  ? this.state.roleAccessData.map(element => (
                      <Form.Item label={element} name={element}>
                        {getFieldDecorator(element, {
                          initialValue: false,
                          valuePropName: 'checked'
                        })(<Switch />)}
                      </Form.Item>
                    ))
                  : ''}

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

const AaddRolesCategory = Form.create({ name: 'form' })(AddRolesCategory);

export default AaddRolesCategory;
