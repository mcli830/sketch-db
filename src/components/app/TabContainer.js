import React from 'react'
import styled from 'styled-components'
// components
import Fluid from '../common/Fluid'
// constants
import { BLACK_HARD } from '../../vars/theme'

const Container = styled(Fluid)`
  background-color: ${BLACK_HARD};
`

const TabContainer = ({ data }) => (
  <Container>
    {data}
  </Container>
)

export default TabContainer
