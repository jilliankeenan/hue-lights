import React, { Component } from 'react'
import { put } from '../Http/Http.js'
import 'semantic-ui-css/semantic.min.css'
import {
    Button,
    Divider,
    Icon,
    Grid,
    Message,
} from 'semantic-ui-react';
import './App.css'
class App extends Component {
    constructor() {
        super()
        // store any variables here
        this.state = {
            on: true,
            selected: 1,
            color: "red",
            bri: 80
        }
    }

    colorMap = {
        "red": 65495,
        "orange": 3439,
        "yellow": 18700,
        "olive": 23222,
        "green": 25653,
        "teal": 37389,
        "blue": 44896,
        "violet": 46879,
        "purple": 46879,
        "pink": 57965,
        "white": 34160
    }

    brightnessMap = {
        "Brightest": 254,
        "Bright": 150,
        "Low": 80,
        "Lowest": 20,
    }

    turnLightOff() {
        let url = `/lights/${this.state.selected}/state`
        if (this.state.selected > 2) {
            url = `/groups/2/action`
        }
        put(url, { "on": !this.state.on })
            .then(this.setState({ on: !this.state.on }));  // store the light state
    }

    setColor(color) {
        let hue;
        if (color in this.colorMap) {
            hue = this.colorMap[color]
        }
        let url = `/lights/${this.state.selected}/state`
        if (this.state.selected > 2) {
            url = `/groups/2/action`
        }
        put(url, { hue: hue })
            .then(this.setState({ color: color }))
            .catch((err) => { console.error(err) });
    }

    setBrightness(brightness) {
        let brightnessLevel = 80;
        if (brightness in this.brightnessMap) {
            brightnessLevel = this.brightnessMap[brightness]
        }
        let url = `/lights/${this.state.selected}/state`
        if (this.state.selected > 2) {
            url = `/groups/2/action`
        }
        put(url, { bri: brightnessLevel })
            .then(this.setState({ bri: brightnessLevel }))
            .catch((err) => { console.error(err) });
    }

    render_color_labels() {
        const colorLabels = Object.keys(this.colorMap).map(color => {
            const icon = "certificate"
            return (
                <Button
                    style={{ maxWidth: "45px" }}
                    key={color}
                    color={color}
                    icon={icon}
                    onClick={() => this.setColor(color)}
                />
            )
        });
        return colorLabels
    }

    render_brightness_labels() {
        const brightLabels = Object.keys(this.brightnessMap).reverse().map((brightness) => {
            return (
                <Button primary style={{maxWidth: "100px"}} onClick={() => this.setBrightness(brightness)}>
                    {brightness}
                </Button>
            )
        })

        return brightLabels
    }

    render() {
        return (
            <div className='button_container'>
                <Grid style={{ maxWidth: "50%", textAlign: "center", margin: "auto" }}>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Divider horizontal>Select Bulb to Change</Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Message info={this.state.selected === 1} className={'bulb_card'} onClick={() => { this.setState({ selected: 1 }) }}>
                                <Icon name='lightbulb outline' size='massive' style={{ margin: "auto" }} />
                                <Divider />
                                <Message.Header>
                                    Bulb 1
                                </Message.Header>
                            </Message>
                        </Grid.Column>
                        <Grid.Column>
                            <Message info={this.state.selected === 2} className={'bulb_card'} onClick={() => { this.setState({ selected: 2 }) }}>
                                <Icon name='lightbulb outline' size='massive' style={{ margin: "auto" }} />
                                <Divider />
                                <Message.Header>
                                    Bulb 2
                                </Message.Header>
                            </Message>
                        </Grid.Column>
                        <Grid.Column>
                            <Message info={this.state.selected === 3} className={'bulb_card'} onClick={() => { this.setState({ selected: 3 }) }}>
                                <Icon.Group size='massive' style={{ margin: "auto" }}>
                                    <Icon name='lightbulb outline' />
                                    <Icon corner name='lightbulb outline' />
                                </Icon.Group>
                                <Divider />
                                <Message.Header>
                                    Both Bulbs
                                </Message.Header>
                            </Message>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Divider horizontal>Bulb Settings</Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            {this.render_color_labels()}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            {this.render_brightness_labels()}
                            <Divider />
                            <Button positive={!this.state.on} className='button' onClick={() => this.turnLightOff()}>
                                {!this.state.on ? "Turn On" : "Turn Off"}
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
export default App