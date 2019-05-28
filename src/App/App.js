import React, { Component } from 'react'
import { put } from '../Http/Http.js'
import './App.css'
class App extends Component {
  constructor () {
    super()
    // store any variables here
    this.state = {
      on: true
    }
    this.turnLightOff = this.turnLightOff.bind(this)
  }

  turnLightOff() {
    put('/lights/1/state', {"on":!this.state.on})
    .then(this.setState({on: !this.state.on}));  // store the light state
  }

  render () {
    return (
      <div className='button__container'>
        <button className='button' onClick={this.turnLightOff}> {/* when button is clicked call the turnLightOff() function */}
          Click me
        </button>
        <p>{this.state.username}</p>
      </div>
    )
  }
}
export default App