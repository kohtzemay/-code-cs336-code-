import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <Link to={'/' + this.props.id}>Edit</Link>
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

module.exports = Comment;
