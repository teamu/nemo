import React, { useState } from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';
import { Mutation } from '@apollo/react-components';
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

const AddRolesCategory = props => {
  const { getFieldDecorator } = props.form;

  const [roleAccessData, setRoleAccessData] = useState([]);
  const [roleAccessDataFlag, setRoleAccessDataFlag] = useState(false);

  const [roleData, setRoleData] = useState({
    role: null,
    roleCategory: null,
    access: { ...roleAccess }
  });

  const roleAccessHandler = value => {
    if (!roleAccess[value.toLowerCase()]) return setRoleAccessDataFlag(false);
    updateState(value.toLowerCase()).then(() => setRoleAccessDataFlag(true));
  };

  const updateState = value => {
    return new Promise(resolve => {
      setRoleAccessData(Object.keys(roleAccess[value]));
      resolve();
    });
  };

  const submitHandler = async (event, addUserRole) => {
    event.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        let data = await refineFunction(values);
        await updateRoleState(data);
        console.log('=================>>>', JSON.stringify(roleData));
        addUserRole()
          .then(({ data }) => {
            console.log('data===================>>', data);
          })
          .catch(error => {
            console.log('error===================>>', error);
          });
      }
    });
  };

  const refineFunction = data => {
    return new Promise(resolve => {
      let key = data.roleCategory.toLowerCase();
      let refinedAccessData = {};
      for (const property in roleAccess[key]) {
        refinedAccessData[property] = data[property];
      }
      let roleDataRefined = {
        roleCategory: data.roleCategory,
        role: data.role,
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

  const updateRoleState = data => {
    return new Promise(async resolve => {
      resolve();
    });
  };

  return (
    <Mutation
      mutation={CREATE_NEW_ROLE}
      variables={{
        roleCategory: roleData.roleCategory,
        role: roleData.role,
        createEntry: roleData.access.entrant.createEntry,
        viewEntry: roleData.access.entrant.viewEntry,
        editEntry: roleData.access.entrant.editEntry,
        deleteEntry: roleData.access.entrant.deleteEntry,
        addMedia: roleData.access.entrant.addMedia,
        replaceMedia: roleData.access.entrant.replaceMedia,
        deleteMedia: roleData.access.entrant.deleteMedia,
        checkoutEntry: roleData.access.entrant.checkoutEntry,
        accessOpenJudgingSystem: roleData.access.juror.accessOpenJudgingSystem,
        voteOpenJudgingSystem: roleData.access.juror.voteOpenJudgingSystem,
        commentOpenJudgingSystem: roleData.access.juror.commentOpenJudgingSystem,
        accessVerifiedJudgingSystem: roleData.access.juror.accessVerifiedJudgingSystem,
        voteVerifiedJudgingSystem: roleData.access.juror.voteVerifiedJudgingSystem,
        commentVerifiedJudgingSystem: roleData.access.juror.commentVerifiedJudgingSystem,
        accessAssignedJudgingSystem: roleData.access.juror.accessAssignedJudgingSystem,
        voteAssignedJudgingSystem: roleData.access.juror.voteAssignedJudgingSystem,
        commentAssignedJudgingSystem: roleData.access.juror.commentAssignedJudgingSystem
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
              onSubmit={e => submitHandler(e, addUserRole)}
            >
              <Form.Item label="Role Category">
                {getFieldDecorator('roleCategory', {
                  rules: [{ required: true, message: 'Please select a role category!' }]
                })(
                  <Select onSelect={(event, value) => roleAccessHandler(event, value)}>
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

              {roleAccessDataFlag
                ? roleAccessData.map(element => (
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
};

const AaddRolesCategory = Form.create({ name: 'form' })(AddRolesCategory);

export default AaddRolesCategory;
