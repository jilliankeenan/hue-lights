import React, { Component } from 'react'
import { put } from '../Http/Http.js'
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
} from 'semantic-ui-react';
import './App.css'
class App extends Component {
  constructor () {
    super()
    // store any variables here
    this.state = {
      on: true,
      color: 0
    }
    this.turnLightOff = this.turnLightOff.bind(this)
  }

  turnLightOff() {
    put('/lights/1/state', {"on":!this.state.on})
    .then(this.setState({on: !this.state.on}));  // store the light state
  }

  setColor(color) {
    let hue;
    if (color === 'red') {
        hue = 0
    } else if (color === 'blue') {
        hue = 46920
    } else if (color === 'green') {
        hue = 46920 // NEEDS FIXED
    }
    put('/lights/1/state', {hue: hue})
    .then(this.setState({hue: hue}));  // store the light state
  }

  render () {
    return (
      <div className='button_container'>
        <Button className='button' onClick={this.turnLightOff}>
          Toggle On/Off
        </Button>
        <Button class="ui button" color={"blue"} onClick={() => this.setColor("blue")}>Turn Blue</Button>
        <p>{this.state.username}</p>
      </div>
    )
  }
}
export default App