import React from 'react';
import ReactDOM from 'react-dom';

var AddPersonForm = React.createClass({
  getInitialState: function() {
    return (
      {
        firstName: '',
        lastName: '',
        loginID: '',
        startDate: ''
      }
    );
  },

  handleFieldChange: function(e) {
    this.setState({ [e.target.name]: e.target.value });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    console.log('this is firing!');
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var loginID = this.state.loginID.trim();
    var startDate = this.state.startDate.trim();
    if (!firstName || !lastName || !loginID || !startDate) {
      return;
    }
    this.props.handleAddPerson({ firstName: firstName, lastName: lastName, loginID: loginID, startDate: startDate });
    this.setState({ firstName: '', lastName: '', loginID: '', startDate: '' });
  },

  render: function() {
    return (
      <div className="addPersonForm">
        <h1>Add A Person</h1>

        <form id="add-person" onSubmit={this.handleSubmit}>
          <div>
            <label>First name:</label>
            <input type="text" id="first-name" name="firstName" value={this.state.firstName} onChange={this.handleFieldChange} />
          </div>
          <div>
            <label>Last name:</label>
            <input type="text" id="last-name" name="lastName" value={this.state.lastName} onChange={this.handleFieldChange} />
          </div>
          <div>
            <label>Login ID:</label>
            <input type="text" id="login-id" name="loginID" value={this.state.loginID} onChange={this.handleFieldChange} />
          </div>
          <div>
            <label>Start date:</label>
            <input type="start-date" id="start-date" name="startDate" placeholder="yyyy/mm/dd" value={this.state.startDate} onChange={this.handleFieldChange} />
          </div>

          <input type="submit" value="Add Person" />
        </form>
      </div>
    );
  }
});

module.exports = AddPersonForm;
