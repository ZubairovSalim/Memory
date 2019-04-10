import {Route} from "react-router-dom";

import React, { Component } from 'react';
import {Cards} from "./Cards";
import {Main} from "./Main";
import {Winner} from "./Winner";
import './App.css';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            points: 0
        }
    };

    handleChangePoints = (newPoints) => {
        let {points} = this.state;
        this.setState({points: points+=newPoints});
    };

    getCards() {
        const type = "023456789AJKQ";
        const suit = "SHDC";
        let cards = [];

        while(cards.length !== 9) {
            let card_type = type[Math.floor(Math.random() * type.length)];
            let card_suit = suit[Math.floor(Math.random() * suit.length)];

            let card = card_type+card_suit;

            if(!cards.includes(card)) {
                cards.push(card)
            }
        }

        for(let i = 0; i < 9; i++) {
            cards.push(cards[i]);
        }

        return cards.sort((a,b) => Math.random() - 0.5);
    }

    render() {
        let cards = this.getCards();

        return (
            <div className="App">

                <Route exact path='/' render={(props) => (
                    <Main {...props}/>
                )}/>
                <Route path='/game' render={(props) => (
                    <Cards {...props} cards={cards} onChangePoints={this.handleChangePoints}/>
                )}/>
                <Route path='/winner' render={(props) => (
                    <Winner {...props} points={this.state.points}/>
                )}/>
            </div>
        );
    }
}

export default App;