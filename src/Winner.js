import {Link} from "react-router-dom";

import React, { Component } from 'react';
import mainSrc from './Cards/end.png';

export class Winner extends Component {
    render() {
        let points = this.props.points;

        return (
            <div className="Winner">
                <img src={mainSrc} alt="winner" />
                <h1>Поздравляем!</h1>
                <h1>Ваш итоговый счет: {points}</h1>
                <button><Link to='/'>Ещё раз</Link></button>
            </div>
        );
    }
}