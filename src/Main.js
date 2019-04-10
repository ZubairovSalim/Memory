import {Link} from "react-router-dom";

import React, { Component } from 'react';
import mainSrc from './Cards/start.png';

export class Main extends Component {
    render() {
        return (
            <div className="Main">
                <img src={mainSrc} alt="main" />
                <h1>memory game</h1>
                <button><Link to='/game'>Начать игру</Link></button>
            </div>
        );
    }
}