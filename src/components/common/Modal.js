import React from 'react'
import styled from 'styled-components'
import Fluid from './Fluid'

const Root = styled(Fluid)`
  display: ${({on}) => on ? '' : 'none'};
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
`
const Underlay = styled(Fluid)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({color}) => color};
  backdrop-filter: blur(4px);
  opacity: 0.5;
  z-index: 1;
`
const Content = styled(Fluid)`
  position: absolute;
  z-index: 2;
`

const Modal = ({ on, color, children }) => (
  <Root on={on}>
    <Underlay color={color} />
    <Content>{children}</Content>
  </Root>
)

export default Modal;
