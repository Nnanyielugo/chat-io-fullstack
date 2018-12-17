import React, { Component, StrictMode } from 'react';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props)
    this.socket = io('localhost:3031');
    this.socket.on('RECIEVE_MESSAGE', data => {
      this.addMessage(data)
    })
    this.socket.on('connect', () => {
      console.log(this.socket.connected)
    })
  }

  state = {
    username: '',
    message: '',
    messages : []
  }

  addMessage = data => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, data]
    }))
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      [name]: value
    }))
  };
  
  handleSubmit = event => {
    event.preventDefault()
    const { username, message } = this.state;
    this.socket.emit('SEND_MESSAGE', {
      author: username,
      message
    })
    
    this.setState(prevState => ({
      ...prevState,
      message: ''
    }))
  }

  render() {
    const { username, message, messages } = this.state;
    return (
      <StrictMode>
        <div>
          <div>
            {messages.map((data, i) => {
              return (
                <div>
                  <div><span><b>{data.author}</b>:&nbsp;</span>{data.message}</div>
                </div>
              )
            })}
          </div>
          <input type="text" placeholder="name" name="username" value={username} onChange={this.handleChange} />
          <br />
          <input type="text" placeholder="message" name="message" value={message} onChange={this.handleChange} />
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </StrictMode>
    )
  }
}

export default App;