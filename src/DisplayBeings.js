import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import solidHeart from './icons/heart-solid.svg'
import outlineHeart from './icons/heart-outline.svg'

const DisplayBeings = (props) => {

  const [ toDisplay, setToDisplay ] = useState([])
  const [oldIndex, setOldIndex] = useState(null)
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

  //I haven't ever built a drag and drop, this was a quick solution 
  //I came up with.  I am sure there are much better ways
  const dragStart = (e) => {
    setOldIndex(e.target.id)
  }

  const stopIt = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const reorder = (event, index) => {
    event.preventDefault()
    let tempOrder = userFavs
    let extractedBeing = { ...tempOrder[oldIndex] }
    tempOrder.splice(oldIndex, 1)
    tempOrder.splice(index, 0, extractedBeing)
    tempOrder = JSON.stringify(tempOrder)
    localStorage.setItem('userFavs', tempOrder)
    props.getFavorites()
  }


  return (
    
    <ListStyle>
      {toDisplay.map((being, i) => {
        return (
          <li
            draggable={props.location.pathname === '/favorites'}
            onDragStart={(e) => dragStart(e)}
            onDragOver={(e) => stopIt(e)}
            onDragEnter={(e) => stopIt(e)}
            onDrop={(e) => reorder(e, i)}
            key={i}
            id={i}>
              {props.location.pathname === '/favorites'&& <p className='count-of' >{`${i + 1}/${userFavs.length}`}</p>}
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
 
export default withRouter(DisplayBeings)

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
    .count-of {
      margin: 0;
      position: absolute;
      left: 8px;
      top: 8px;
    }
  }
  li:hover {
    cursor: grab;
  }
  li:active {
    cursor: grabbing;
  }
`