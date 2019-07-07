import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {Switch, Route, withRouter} from 'react-router-dom';
import NewPost from './components/NewPost';


class App extends React.Component {

  onLike = element => {
  const newmessageList = [...this.state.messageList];
  const index = newmessageList.indexOf(element);
  newmessageList[index] = { ...element };
  newmessageList[index].likes++;
  this.setState({ messageList: newmessageList });
};

onDisLike = element => {
const newmessageList = [...this.state.messageList];
const index = newmessageList.indexOf(element);
newmessageList[index] = { ...element };
newmessageList[index].likes--;
this.setState({ messageList: newmessageList });
};

  constructor (props){
    super(props);
    this.state = {
      messageList: []
    }
    this.onNewCreation = this.onNewCreation.bind(this);
  };
  onNewCreation(message){
    message.likes = 0;
    var newMessageList = this.state.messageList.slice();
    newMessageList.push(message);
    this.setState({messageList: newMessageList});
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={()=><Home allMessages={this.state.messageList} onLike={this.onLike} onDisLike={this.onDisLike}/>}/>
          <Route path='/forum' render={()=><NewPost onNewCreationProperty={this.onNewCreation}/>}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
