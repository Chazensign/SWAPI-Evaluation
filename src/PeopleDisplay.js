import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

class PeopleDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      loading: false
    }
  }

  componentDidMount = () => {
    this.getPeople()
  }

  getPeople = (direct) => {
    this.setState({ loading: true })
    axios
      .get(!direct ? 'https://swapi.dev/api/people' : direct)
      .then((res) => {
        // this.getPlanetName(res.data.results)
        this.setState({ people: res.data.results })
      })
      .catch((err) => console.log(err))
  }

  getPlanetName = async (arr) => {
    let beingArr = []
    arr.forEach((person) => {
      axios.get(person.homeworld).then((res) => {
        person.planet_name = res.data.name
        beingArr.push(person)
      })
    })
    console.log(beingArr)
    this.setState({ people: beingArr })
  }

  render() {
    const { people } = this.state
    return (
      <PeopleStyle>
        <ul>
          {people.map((being, i) => {
            return (
              <li key={i}>
                <h4>{being.name}</h4>
                <h6>Birth: {being.birth_year}</h6>
                <h6>Homeworld: {being.planet_name}</h6>
              </li>
            )
          })}
        </ul>
      </PeopleStyle>
    )
  }
}

export default PeopleDisplay

const PeopleStyle = styled.section`
  width: 450px;
  max-height: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 60px;
  ul {
    overflow: scroll;
  }
  li {
    background: rgba(70, 70, 70, 0.47);
    padding: 5px;
    border-radius: 8px;
    list-style: none;
    margin: 10px;
    position: relative;
    h4 {
      margin: 5px;
    }
    h6 {
      margin: 5px;
    }
  }
`
