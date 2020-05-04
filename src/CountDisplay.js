import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const CountDisplay = (props) => {
  return ( 
    props.location.pathname === '/' ? <CountStyle>{props.count}</CountStyle> : props.userFavs.length > 0 && <CountStyle>{`1-${props.userFavs.length}`}</CountStyle>
   )
}
 
export default withRouter(CountDisplay)

const CountStyle = styled.h5`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%)
`