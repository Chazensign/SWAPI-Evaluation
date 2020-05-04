import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

class PeopleDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
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
        this.setState({ people: res.data.results })
      })
      .catch((err) => console.log(err))
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
              {/* <h6>Homeworld: {being.planet_name}</h6> */}
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
li {
list-style: none;
}
`