import React from 'react';
import PropTypes from 'prop-types';

class NewPost extends React.Component {
  _message = null;

  constructor(props) {
    super(props);

    this.handleNewPost = this.handleNewPost.bind(this);
  }


  handleNewPost(e){
    e.preventDefault();
    this.props.onNewCreationProperty({
      message:this._message.value

    });
    this.props.history.push('/');
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleNewPost}>
          <input
            type="text"
            id="message"
            placeholder="Yourmessage here"
            ref={(input) => {this._message = input;}}/>
          <button type='submit'>Add</button>
        </form>
      </div>
    );
  }
}

NewPost.propTypes={
  onNewCreationProperty:PropTypes.func
};

export default NewPost;
