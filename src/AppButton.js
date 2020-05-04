import React from 'react'
import styled from 'styled-components'

const AppButton = (props) => {
  return (
    <ButtonStyle
      className={props.name}
      disabled={props.disabled}
      onClick={props.fn}>
      {props.title}
    </ButtonStyle>
  )
}

export default AppButton

const ButtonStyle = styled.button`
  box-shadow: inset 0px -3px 7px 0px #ffed2b;
  background: linear-gradient(to bottom, #f0f72e 5%, #faee08 100%);
  background-color: #f0f72e;
  border-radius: 5px;
  border: 1px solid #808080;
  display: inline-block;

  color: #000000;
  font-family: Impact;
  font-size: 18px;
  padding: 8px 16px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #c2c2c2;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    background: linear-gradient(to bottom, #faee08 5%, #f0f72e 100%);
    background-color: #faee08;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`
