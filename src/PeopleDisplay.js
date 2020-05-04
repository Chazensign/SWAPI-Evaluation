import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

class PeopleDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      loading: false,
    }
  }

  componentDidMount = () => {
    this.getPeople()
  }

  getPeople = () => {
    this.setState({ loading: true })
    axios
      .get('https://swapi.dev/api/people')
      .then((res) => {
        this.getPlanetName(res.data.results)
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

  render() {
    const { people, loading } = this.state
    return (
      <PeopleStyle>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
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
        )}
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
