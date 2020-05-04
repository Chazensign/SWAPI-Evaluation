import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import solidHeart from './icons/heart-solid.svg'
import outlineHeart from './icons/heart-outline.svg'

const DisplayBeings = (props) => {
  console.log(props)
  const [ toDisplay, setToDisplay ] = useState([])
  const { userFavs, people } = props

useEffect(() => {
  setToDisplay(people ? people : userFavs)
}, [people, userFavs])

  const addToFavorites = (favObj) => {
    let tempFavs 
    let index = userFavs.findIndex((userFav) => userFav.name === favObj.name)
    if (index !== -1) {
      tempFavs = userFavs
      tempFavs.splice(index, 1)
      tempFavs = JSON.stringify(tempFavs)
    } else {
      tempFavs = JSON.stringify([...userFavs, favObj])
    }
    localStorage.setItem('userFavs', tempFavs)
    props.getFavorites()
  }

  const filterFavs = (being) => {
    let index = userFavs.findIndex((fav) => {
      return fav.name === being
    })
    return index === -1 ? outlineHeart : solidHeart
  }

  return (
    
    <ListStyle>
      {toDisplay.map((being, i) => {
        return (
          <li key={i} id={i}>
            <h4>{being.name}</h4>
            <h6>Birth: {being.birth_year}</h6>
            <h6>Homeworld: {being.planet_name}</h6>
            <img
              className='heart'
              src={filterFavs(being.name)}
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