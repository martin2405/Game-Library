import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom'
import '../styles/App.scss';
import Category from '../pages/Category';
import TopBar from './TopBar'
import GameOptions from './GameOptions'
import ErrorPage from '../pages/ErrorPage'

const list = [
  {id: 0, name: 'games', path: '/'},
  {id: 1, name: 'favourite', path: '/favourite'},
  {id: 2, name: 'to play', path: '/toPlay'},
  {id: 3, name: 'played', path: '/played'}
]

class App extends Component {

  state = {
    value: '',
    scrollDirection: 'up',
    classesNav: ['nav'],
    games: [],
    searchedGames: [],
    actualGame: [],
    isOptionsVisible: false,
    isLoaded: false,
    isNavActiveClass: '', 
    error: null
  }

  componentDidMount() {
    let startScroll = 0
    window.addEventListener('scroll', () => {
      if (startScroll < document.documentElement.scrollTop) {
        this.setState(() => ({
          scrollDirection: 'down'
        }))
      } else {
        this.setState(() => ({
          scrollDirection: 'up'
        }))
      }
      startScroll = document.documentElement.scrollTop;
    })

    let games = this.state.games, promises = []
    
    for (let i = 1; i < 26; i++) {
      promises.push(`https://api.rawg.io/api/games?key=54f96a8220994e7c91a83f302d022fa0&page=${i}`)
    }
    
    Promise.all(
      promises.map(promise => (
        fetch(promise)
        .then(response => {
           return response.json()
        })
      .then(jsonData => {
        games = games.concat(jsonData.results)
      })
      )
      .then(() => {
        this.setState(() => ({
          games,
          searchedGames: games,
          isLoaded: true
        }))
      })
    ))
    .catch(err => {
      this.setState(() => ({
        error: err
      }))
    });
  }

  handleSearch = e => {
    const searchValue = e.target.value

    const searchedGames = this.state.searchedGames.filter(game => game.name.toUpperCase().includes(searchValue.toUpperCase()))

    this.setState(() => ({
      value: searchValue,
      games: searchedGames
    }))
  }

  handleOptions = (type, game) => {
    if(type === 'open') {
      this.setState(() => ({
        isOptionsVisible: true,
        actualGame: game
      }))
    } else if (type === 'close') {
      this.setState(() => ({
        isOptionsVisible: false,
      }))
    }
  }

  handleNav = () => {
    if (window.innerWidth < 1025) {

      const classes = this.state.classesNav;

      if (!classes.includes('active-nav')) {
        classes.push('active-nav');
        this.setState(() => ({
          classes,
        }))
      } else {
        this.setState(() => ({
          classesNav: ['nav'],
          isOptionsVisible: false,
        }))
      } 
    } else {
      this.setState(() => ({
        isNavActiveClass: '',
        isOptionsVisible: false
      }))
  }
  }

  render() {
    
    const {isOptionsVisible, isLoaded, value, classesNav, games, actualGame, scrollDirection, isNavActiveClass, error} = this.state

    const classNameNav = classesNav.join(' ');
    const isNavActive = Boolean(classesNav.includes('active-nav'));

    let menu = list.map(item => (
      <li key={item.id} className='nav__category'>
        <NavLink to={item.path} exact onClick={this.handleNav}>{item.name}</NavLink>
      </li>
    ))

    return (
    <Router basename={process.env.PUBLIC_URL}>
      <TopBar value={value} search={this.handleSearch} handleNav={this.handleNav} isNavActive={isNavActive} scrollDirection={scrollDirection}/>
      <main className='main' style={isNavActive ? {filter: 'blur(3px)'} : null}>

        <Switch>
          {error && <Route component={ErrorPage}/>}
          <Route path={['/:category', '/']} exact render={(props) => <Category games={games} showOptions={this.handleOptions} props={props}/>}/>
        </Switch>

        {!isLoaded && <i className="fas fa-spinner"></i>}

      </main>
      <GameOptions isOptionsVisible={isOptionsVisible} actualGame={actualGame} closeOptions={this.handleOptions} isNavActive={isNavActive}/>
      <nav className={`${classNameNav} ${isNavActiveClass}`} onMouseMove={this.handleMouseMove}>
        <ul className='nav__ul'>
          {menu}
        </ul> 
      </nav>
      {isNavActive && <div className='to-disable' onClick={() => this.setState({classesNav: ['nav']})}></div>}
      
    </Router>
  );
  }
}

export default App;
