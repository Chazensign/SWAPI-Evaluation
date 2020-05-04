import React from 'react'
import styled from 'styled-components'
import solidHeart from './icons/heart-solid.svg'
import outlineHeart from './icons/heart-outline.svg'

const DisplayBeings = (props) => {

  const addToFavorites = (favObj) => {
    let userFavs = JSON.stringify(favObj)
    localStorage.setItem('userFavs', userFavs)
  }

  return (
    <ListStyle>
      {props.people.map((being, i) => {
        return (
          <li key={i}>
            <h4>{being.name}</h4>
            <h6>Birth: {being.birth_year}</h6>
            <h6>Homeworld: {being.planet_name}</h6>
            <img
              className='heart'
              src={solidHeart}
              alt='favorite'
              onClick={() => addToFavorites(being)}
            />
          </li>
        )
      })}
    </ListStyle>
  )
}
 
export default DisplayBeings

const ListStyle = styled.ul`
  padding: 0;
  width: 300px;
  max-height: 830px;
  margin: 0;
  color: yellow;
  overflow: scroll;
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
    .heart {
      height: 24px;
      color: yellow;
      position: absolute;
      top: 8px;
      right: 10px;
    }
    .heart:hover {
      cursor: pointer;
    }
  }
`