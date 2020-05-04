import React from 'react'
import DisplayBeings from './DisplayBeings'
import AppButton from './AppButton'
import CountDisplay from './CountDisplay'
import { withRouter } from 'react-router-dom'

const UserFavorites = (props) => {
  
  return (
    <section>
      <DisplayBeings
        getFavorites={props.getFavorites}
        userFavs={props.userFavs}
      />
      <AppButton title='Back' fn={() => props.history.push('/')} />
      <CountDisplay userFavs={props.userFavs} />
    </section>
  )
}
 
export default withRouter(UserFavorites)