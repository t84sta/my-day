import React, { Component } from 'react';
import uniqid from "uniqid";

import "./App.css";
import Countdown from "./Countdown";
import EditEvent from "./EditEvent";

class App extends Component {
    constructor() {
        super();
        this.state = {
            events: [
                { id: 0, name: "śniadanie", hour: "06", minute: "45" },
                { id: 1, name: "drugie śniadanie", hour: "11", minute: "00" },
                { id: 2, name: "obiad", hour: "16", minute: "15" },
                { id: 3, name: "kolacja", hour: "19", minute: "00" },
            ],
            editedEvent: {
                id: uniqid(),
                name: "",
                hour: "",
                minute: ""
            }
        };
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
    }

    handleEditEvent(val) {
        this.setState(prevState => {
            return {
                editedEvent: Object.assign(prevState.editedEvent, val)
            };
        });
    }

    handleSaveEvent() {
        this.setState(prevState => ({
            events: [...prevState.events, prevState.editedEvent],
            editedEvent: {
                id: uniqid(),
                name: "",
                hour: "",
                minute: ""
            }
        }));
    }

    handleRemoveEvent(id) {
        this.setState(prevState => ({
            events: prevState.events.filter(el => el.id !== id)
        }));
    }

    render() {
        const events = this.state.events.map(el => {
            return (
                <Countdown
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    hour={el.hour}
                    minute={el.minute}
                    onRemove={id => this.handleRemoveEvent(id)}
                />
            );
        });

        return (
            <div className="app">
                {events}
                <EditEvent
                    name={this.state.editedEvent.name}
                    hour={this.state.editedEvent.hour}
                    minute={this.state.editedEvent.minute}
                    onInputChange={val => this.handleEditEvent(val)} onSave={() => this.handleSaveEvent()} />
            </div> 
        );
    }
}

export default App;