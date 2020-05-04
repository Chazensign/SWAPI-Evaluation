import React from 'react'
import styled from 'styled-components'
import AppButton from './AppButton'

const PeopleSearch = (props) => {

const { people, loading, nextTen, previousTen, count } = props.state

  return (
      <PeopleStyle>
        <div className='search-cont'>
          <form>
            <input
              type='text'
              name='searchTerm'
              onChange={(e) => props.handleChange(e.target)}
            />
            <AppButton fn={props.getFiltered} title='Search' />
          </form>
        </div>
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
          fn={() => props.getPeople(nextTen)}
        />
        <AppButton
          name='prev'
          disabled={!previousTen}
          title='Previous'
          fn={() => props.getPeople(previousTen)}
        />
      </PeopleStyle>
    )
  }

export default PeopleSearch

const PeopleStyle = styled.section`
  width: 450px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 60px;
  padding-top: 10px;
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
  input {
    height: 20px;
    width: 200px;
    margin: 10px;
    padding-left: 5px;
    font-size: 16px;
    font-weight: 600;
    background: darkgray;
    border: 2px solid yellow;
  }
`