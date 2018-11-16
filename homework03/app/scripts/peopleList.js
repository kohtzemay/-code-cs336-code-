import React from 'react';
import ReactDOM from 'react-dom';

var PeopleList = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(p) {
      return (
        <div className="person" key={p._id}>
          <b>First name:</b> {p.firstName}<br />
          <b>Last name:</b> {p.lastName}<br />
          <b>Login ID:</b> {p.loginID}<br />
          <b>Start date:</b> {p.startDate}

          <hr />
        </div>
      );
    });
    return (
      <div className="peopleList">
        {personNodes}
      </div>
    );
  }
});

module.exports = PeopleList;
