import React from 'react'
import styled from 'styled-components'

const DisplayBeings = (props) => {

  return (
    <ListStyle>
      {props.people.map((being, i) => {
        return (
          <li key={i}>
            <h4>{being.name}</h4>
            <h6>Birth: {being.birth_year}</h6>
            <h6>Homeworld: {being.planet_name}</h6>
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