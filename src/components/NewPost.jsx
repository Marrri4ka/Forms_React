import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import Joi from 'joi-browser';

import Moment from 'moment';

class NewPost extends React.Component {

  state={
    data:{},
    errors:{}
  };

  schema={
    message5: Joi.string().alphanum().min(3).max(30).required(),
  }

  _message = null;
  _pokemon = null;

  constructor(props) {
    super(props);

    this.handleNewPost = this.handleNewPost.bind(this);
  }

  validate=()=>{
  const options = {abortEarly: false};
  const {error}= Joi.validate(this.state.data, this.schema, options);
  if(!error) return null;
  const errors ={};

  for(let item of error.details)
  errors[item.path[0]] = item.message;
return errors;

};


  validateProperty=({name, value})=>{
      const obj ={[name]: value};
      const schema = {[name]: this.schema[name]};
      const {error} = Joi.validate(obj,schema);
      return error ? error.details[0].message : null;

 };

 handleChange=({currentTarget: input})=>{
     const errors = {...this.state.errors};
     const errorMessage = this.validateProperty(input);
     if(errorMessage) {
         errors[input.name] = errorMessage;
     }
     else {
         delete errors[input.name];
     }

     const data = {...this.state.data};
     data[input.name] = input.value;
     this.setState ({data,errors});

     }


  handleNewPost(e){
    e.preventDefault();
    const errors = this.validate();
    this.setState({errors: errors || {} });
    if(errors) return;

    this.props.onNewCreationProperty({
      message:this._message.value,



    }, new Moment(), this._pokemon.value);
    this.props.history.push('/');
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleNewPost}>
          <label htmlFor="message">Message: </label>
          <select ref={(select)=> {this._pokemon = select;}}>
            <option value="Pikachu">Pikachu</option>
            <option value="Raichu">Raichu</option>
            <option value="Eevee">Eevee</option>
            <option value="Ditto">Ditto</option>
            <option value="Lugia">Lugia</option>
            <option value="Ho-Oh">Ho-Oh</option>
          </select>
          <input

            type="text"
            id="message"
            name="message5"
            placeholder="Your message here"
            onChange={this.handleChange}
            ref={(input) => {this._message = input;}}/>
          {this.state.errors.message5 && <div className="alert alert-danger">{this.state.errors.message5}</div>}
          <button type='submit'>Add</button>

        </form>
      </div>
    );
  }
}

NewPost.propTypes={
  onNewCreationProperty:PropTypes.func
};

export default withRouter(NewPost);
