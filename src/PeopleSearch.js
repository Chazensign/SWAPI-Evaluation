import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AppButton from './AppButton'
import DisplayBeings from './DisplayBeings'
import CountDisplay from './CountDisplay'

const PeopleSearch = (props) => {

const { people, loading, nextTen, previousTen, count, userFavs } = props.state

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
      <Link to='/favorites' className='fav-disp'>
  <h2>My Favs: {userFavs.length}</h2>
      </Link>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <DisplayBeings
          getFavorites={props.getFavorites}
          people={people}
          userFavs={userFavs}
        />
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
      <CountDisplay count={count} />
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
  .fav-disp {
    position: absolute;
    top: 0px;
    right: -200px;
    color: yellow;
    text-decoration: none;
  }
  .fav-disp:hover {
    cursor: pointer;
  }
`