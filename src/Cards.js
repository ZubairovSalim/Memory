import uuid from 'uuid/v4';

import React, { Component } from 'react';
import {Card} from "./Card";

export class Cards extends Component {
    constructor(props) {
        super();
        this.state = {
            cards: props.cards.map(card_name => {
                return {
                    id: uuid(),
                    name: card_name,
                    isOpen: true,
                    isFound: false,
                }
            }),
            openedCard: null,
            block: false,
            cardsLeft: props.cards.length,
        }
    };

    componentDidMount() {
        setTimeout(this.closeAllCards, 5000);
    }

    compareCards = (id) => {
        let cards = this.state.cards;

        let firstCardIndex = cards.findIndex(card => card.id === this.state.openedCard);
        let secondCardIndex = cards.findIndex(card => card.id === id);

        let {cardsLeft} = this.state;

        if (cards[firstCardIndex].name === cards[secondCardIndex].name && cards[firstCardIndex].id !== cards[secondCardIndex].id) {

            cards[firstCardIndex] = {
                ...cards[firstCardIndex],
                isFound: true
            };

            cards[secondCardIndex] = {
                ...cards[secondCardIndex],
                isFound: true
            };

            this.props.onChangePoints((cardsLeft - 2) * 42);

            this.setState({cards: cards, openedCard: null, block: false, cardsLeft: cardsLeft - 2},
                () => this.state.cardsLeft === 0 ? this.props.history.push('/winner') : "");
        }
        else {

            cards[firstCardIndex] = {
                ...cards[firstCardIndex],
                isOpen: false
            };

            cards[secondCardIndex] = {
                ...cards[secondCardIndex],
                isOpen: false
            };

            this.props.onChangePoints(-((18 - cardsLeft) * 42));

            this.setState({cards: cards, openedCard: null, block: false});
        }

    };

    closeAllCards = () => {
        let cards = this.state.cards.map(card => {
            return {...card, isOpen: false};
        });

        this.setState({cards: cards});
    };

    handleOpenCard = (id) => {
        if (this.state.block) {
            return;
        }
        let {openedCard} = this.state;
        let cards = this.state.cards;

        let index = cards.findIndex(card => card.id === id);
        cards[index] = {
            ...cards[index],
            isOpen: true
        };

        openedCard ? this.setState({cards: cards, block: true}, () => setTimeout(() => this.compareCards(id), 500)) : this.setState({cards: cards, openedCard: id});
    };


    render() {
        let cards_data = this.state.cards;
        let cards = cards_data.map(card_data => <Card key={card_data.id} id={card_data.id} name={card_data.name} isOpen={card_data.isOpen} isFound={card_data.isFound} onOpenCard={this.handleOpenCard} />);
        return (
            <div className="Game">
                <div className="Cards">
                    {cards}
                </div>
                <button onClick={() => window.location.reload()}>Начать заново</button>
            </div>
        );
    }
}