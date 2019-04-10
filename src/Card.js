import React, { PureComponent } from 'react';

export class Card extends PureComponent {
    handleOpenClick = (e) => {
        e.preventDefault();
        this.props.onOpenCard(this.props.id);
    };
    /*
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.isOpen !== nextProps.isOpen || this.props.isFound !== nextProps.isFound;
    }
    */
    render() {
        let {isOpen, isFound} = this.props;

        let cardSrc = isOpen ? require('./Cards/' + this.props.name + '.png') : require('./Cards/closed.png');

        let classStyle = isFound ? "founded" : "";
        let clickAction = isFound ? null : this.handleOpenClick;

        return (
            <div className="Card" onClick={clickAction}>
                <img className={classStyle} src={cardSrc} alt={this.props.name} />
            </div>
        );
    }
}