import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import AppButton from './AppButton'

class PeopleDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: [],
      loading: false,
      nextTen: '',
      previousTen: '',
      count: '',
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
        console.log(res.data)
        const { next, previous, results } = res.data
        if (!direct) {
          this.setState({ count: '1-10' })
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

  render() {
    const { people, loading, nextTen, previousTen, count } = this.state
    return (
      <PeopleStyle>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
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
          <h6>{count}</h6>
          </>
        )}
        <AppButton
          name='next'
          disabled={!nextTen}
          title='Next'
          fn={() => this.getPeople(nextTen)}
        />
        <AppButton
          name='prev'
          disabled={!previousTen}
          title='Previous'
          fn={() => this.getPeople(previousTen)}
        />
      </PeopleStyle>
    )
  }
}

export default PeopleDisplay

const PeopleStyle = styled.section`
  width: 450px;
  height: 80%;
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
  .next {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, 0);
  }
  .prev {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, 0);
  }
`
