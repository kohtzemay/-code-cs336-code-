import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import PeopleList from './peopleList';
import AddPersonForm from './addPersonForm';

var PeopleBox = React.createClass({
  loadPeopleFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleAddPerson: function(p) {
    var people = this.state.data;
    var newPeople = people.concat([p]);
    this.setState({data: newPeople});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: p,
      success: function(data) {
        this.setState({data: people});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
   return {data: []};
  },

  componentDidMount: function() {
    this.loadPeopleFromServer();
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="peopleBox">
      <h1>People</h1>
      <PeopleList data={this.state.data} />
      <AddPersonForm handleAddPerson={this.handleAddPerson} />
      </div>
    );
  }
});

module.exports = PeopleBox;
