import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
// components
import Fluid from '../common/Fluid'
// constants
import { BLACK, BOX_SHADOW, TRANSITION } from '../../vars/theme'
import { CONTROL_WIDTH, CONTROL_WIDTH_EXTEND } from '../../vars/ui'

const light = lighten(0.1, BLACK)
const dark = lighten(0.05, BLACK)

const Container = styled(Fluid)`
  background: linear-gradient(90deg, ${light}, ${dark});
  border-right: 1px solid ${light};
  box-shadow: ${BOX_SHADOW.lg};
  width: ${CONTROL_WIDTH}px;
  height: auto;
  min-width: ${CONTROL_WIDTH}px;
  min-height: ${CONTROL_WIDTH}px;
  transition: width ${TRANSITION.speed[1]} ${TRANSITION.curve.quint};
  &:hover {
    width: ${CONTROL_WIDTH_EXTEND}px;
  }
`

const ControlPanel = () => (
  <Container>
    
  </Container>
)

export default ControlPanel
