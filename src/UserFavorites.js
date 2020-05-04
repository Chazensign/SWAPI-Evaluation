import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import DisplayBeings from './DisplayBeings'
import AppButton from './AppButton'
import CountDisplay from './CountDisplay'

const UserFavorites = (props) => {
  
  return (
    <StyledFavs>
      <div className='count-button'>
      <h2>My Favs: {props.userFavs.length}</h2>
      <AppButton title='Back' fn={() => props.history.push('/')} />
      </div>
      <DisplayBeings
        getFavorites={props.getFavorites}
        userFavs={props.userFavs}
      />
      <CountDisplay userFavs={props.userFavs} />
    </StyledFavs>
  )
}
 
export default withRouter(UserFavorites)

const StyledFavs = styled.section`
  width: 450px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 60px;
  padding-top: 10px;
  .count-button {
    width: 280px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`