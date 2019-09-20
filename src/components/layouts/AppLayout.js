import React from 'react'
import styled from 'styled-components'
import { BLACK, WHITE } from '../../vars/theme'
import { WORKSPACE_SIZE } from '../../vars/ui'

const Container = styled.div`
  background: ${BLACK};
  overflow: auto;
  width: 4000px;
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
