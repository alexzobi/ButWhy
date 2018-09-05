import React, {Component} from 'react';
// import axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (evt)=>{
    evt.preventDefault();
    console.log(evt.target.name, evt.target.value)
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleClick = (evt)=>{
    console.log(evt);
    console.log("clicked");
  }

  render(){
    const {username, password} = this.state
    console.log(this.state)
    return (
      <div id="login">
        <input onChange={this.handleChange} required name="username" placeholder="Username" value={username} />
        <input onChange={this.handleChange} required name="password" placeholder="Password" value={password} />
        <button onClick={this.handleClick}>Log In!</button>
      </div>
    )
  }
}