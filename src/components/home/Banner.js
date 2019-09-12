import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { black, white } from '../../vars/theme'

const heightScale = 7;

const Background = styled.div`
  background:
    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
    url('${({background}) => background}');
  background-position: center;
  background-size: cover;
  height: 500px;
  min-height: ${heightScale*10}vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`
const Content = styled.div`
  margin-bottom: ${heightScale*2}vh;
  margin-left: 20%;
  & > * {
    color: ${white};
    margin-bottom: 0.5em;
  }
`

const Banner = ({title, subtitle, background}) => (
  <Background background={background}>
    <Content>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </Content>
  </Background>
)

Banner.propTypes = {
  background: PropTypes.string,
}

Banner.defaultProps = {
  background: black,
}

export default Banner;
