import React from 'react'
import styled from 'styled-components'
import { black, white } from '../../vars/theme'

const Container = styled.div`
  background: ${black};
  height: 100vh;
  width: 100vw;
  & * {
    color: ${white};
  }
`

const AppLayout = ({ children }) => (
  <Container>
    {children}
  </Container>
)

export default AppLayout
