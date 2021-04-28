import React, { Component } from 'react';
import '../styles/GameOptions.scss';


const buttons = [
    {type: 'favourite', activeClass: 'fas fa-heart active-i', unActiveClass: 'fas fa-heart'},
    {type: 'toPlay', activeClass: 'fas fa-gamepad active-i', unActiveClass: 'fas fa-gamepad'},
    {type: 'played', activeClass: 'fas fa-trophy active-i', unActiveClass: 'fas fa-trophy'}
]



class GameOptions extends Component {

    state = {
        game: [],
        valueOfMove: 0,
    }

    componentDidUpdate() {
        if (this.state.game !== this.props.actualGame)
        this.setState(() => ({
            game: this.props.actualGame,
            valueOfMove: 0
        }))
    }
   
    handleChangeStatus = (actualGame, type) => {
        actualGame[type] = !actualGame[type]

        this.setState(() => ({
            game: actualGame
        }))
    }

    handleMoveImg = (type) => {
        if (type === 'right' && this.state.valueOfMove > -500) {
            this.setState((prevState) => ({
                valueOfMove: prevState.valueOfMove - 100
            }))
        } else if (type === 'left' && this.state.valueOfMove < 0) {
            this.setState((prevState) => ({
                valueOfMove: prevState.valueOfMove + 100
            }))
        }
    }

    render() {
        const {isOptionsVisible, actualGame, isNavActive, closeOptions} = this.props;
        const {game, valueOfMove} = this.state;

        let imgs = []

        if (isOptionsVisible) {
            imgs = actualGame.short_screenshots.map(screen => (
            <div 
            className='imgs__img' 
            style={{backgroundImage: `url(${screen.image})`, transform: `translateX(${valueOfMove}%)`}} 
            key={screen.id}>
            </div>
        ))
        }

        const buttonsList = buttons.map(button => (
        <button key={button.type} onClick={() => this.handleChangeStatus(actualGame, button.type)}><i className={game[button.type] ? button.activeClass : button.unActiveClass}></i></button>
        ))

    return (
        <div className={isOptionsVisible ? 'options active-options' : 'options'} style={isNavActive ? {filter: 'blur(3px)'} : null}>
            <div className='imgs'>
                <button className='imgs__move-right' onClick={() => this.handleMoveImg('right')}><i className="fas fa-chevron-right"></i></button>
                <button className='imgs__move-left' onClick={() => this.handleMoveImg('left')}><i className="fas fa-chevron-left"></i></button>
                {imgs}
            </div>
            <main className='options__menu'>
                <h1 className='options__title'>{actualGame.name}</h1>
                <div className={isOptionsVisible ? 'options__buttons-container active-buttons-container' : 'options__buttons-container'}>
                    {buttonsList}
                </div>
                <ul className={isOptionsVisible ? 'options__info active-info' : 'options__info'}>
                <li className='options__info-describe'><span className='options__info-span'>Released</span> {actualGame.released}</li>
                <li className='options__info-describe'><span className='options__info-span'>Rating</span> {actualGame.rating}/5.00</li>
                <li className='options__info-describe'> <span className='options__info-span'>Playtime</span>{actualGame.playtime}h</li>
                <li className='options__info-describe'> <span className='options__info-span'>Metacritic</span>{actualGame.metacritic ? `${actualGame.metacritic}/100` : '-'}</li>
            </ul>
            </main>
            <button className='options__off-button' onClick={() => closeOptions('close')}><i className="fas fa-times"></i></button>
        </div>
    )
    }
}
 
export default GameOptions;