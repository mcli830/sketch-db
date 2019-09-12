import React from 'react'
import styled from 'styled-components'
import { BLACK, WHITE } from '../../vars/theme'

const Container = styled.div`
  background: ${BLACK};
  height: 100vh;
  width: 100%;
  & * {
    color: ${WHITE};
  }
`

const AppLayout = ({ children }) => (
  <Container>
    {children}
  </Container>
)

export default AppLayout
