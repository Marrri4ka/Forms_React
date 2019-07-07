import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {Switch, Route} from 'react-router-dom';
import NewPost from './components/NewPost';


class App extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      messageList: []
    }
    this.onNewCreation = this.onNewCreation.bind(this);
  };
  onNewCreation(message){
    var newMessageList = this.state.messageList.slice();
    newMessageList.push(message);
    this.setState({messageList: newMessageList});
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={()=><Home allMessages={this.state.messageList}/>}/>
          <Route path='/forum' render={()=><NewPost onNewCreationProperty={this.onNewCreation}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
