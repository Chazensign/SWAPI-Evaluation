import React, { Component } from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import PeopleSearch from './PeopleSearch'
import UserFavorites from './UserFavorites'

class MainDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      loading: false,
      nextTen: '',
      previousTen: '',
      count: '',
      userFavs: [],
    }
  }

  componentDidMount = () => {
    this.getPeople()
    this.getFavorites()
  }

  getFavorites = () => {
    let savedFavs = JSON.parse(localStorage.getItem('userFavs'))
    if (savedFavs) {

      this.setState({ userFavs: savedFavs })
    }
  }

  getPeople = (direct) => {
    this.setState({ loading: true })
    axios
      .get(!direct ? 'https://swapi.dev/api/people' : direct)
      .then((res) => {
        const { next, previous, results } = res.data
        if (!direct) {
          this.setState({ count: `1-${results.length}` })
        } else {
          let num = (direct.charAt(direct.length - 1) - 1) * 10
          this.setState({ count: `${num + 1}-${num + results.length}` })
        }
        this.getPlanetName(results)
        this.setState({ nextTen: next, previousTen: previous })
      })
      .catch((err) => console.log(err))
  }
  // The planet name is not included with the people get request.
  // Was it with the old swapi.co?  It was more of a challenge this way.

  getPlanetName = async (arr) => {
    let beingArr = []
    for (let i = 0; i < arr.length; i++) {
      let res = await axios.get(arr[i].homeworld)
      arr[i].planet_name = res.data.name
      beingArr.push(arr[i])
      if (i === arr.length - 1) {
        this.setState({ people: beingArr, loading: false })
      }
    }
  }

  handleChange = (trg) => {
    this.setState({ [trg.name]: trg.value })
  }

  getFiltered = (e) => {
    this.setState({ loading: true })
    e.preventDefault()
    axios
      .get(`https://swapi.dev/api/people/?search=${this.state.searchTerm}`)
      .then((res) => {
        const { next, previous, results } = res.data
        this.getPlanetName(results)
        this.setState({ nextTen: next, previousTen: previous })
      })
  }

  render() {
    const { userFavs } = this.state
    return (
      <Switch>
        <Route exact path='/'>
          <PeopleSearch
            getFavorites={this.getFavorites}
            getPeople={this.getPeople}
            handleChange={this.handleChange}
            getFiltered={this.getFiltered}
            state={this.state}
          />
        </Route>
        <Route path='/favorites'>
          <UserFavorites
            getFavorites={this.getFavorites}
            userFavs={userFavs}
            history={this.props.history}
          />
        </Route>
      </Switch>
    )
  }
}
export default MainDisplay


