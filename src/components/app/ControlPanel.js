import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
// components
import Fluid from '../common/Fluid'
// constants
import { UNIT, BLACK, WHITE_SOFT, WHITE_DIM, BLACK_SOFT, PRIMARY, BOX_SHADOW, TRANSITION } from '../../vars/theme'
import { CONTROL_WIDTH, CONTROL_WIDTH_FULL } from '../../vars/ui'
// component constants
const iconSize = CONTROL_WIDTH * 0.8
const bgColor = lighten(0.1, BLACK)
const textColor = WHITE_DIM

const Container = styled(Fluid)`
  background: ${bgColor};
  box-shadow: ${BOX_SHADOW.lg};
  width: ${CONTROL_WIDTH}px;
  height: auto;
  min-width: ${CONTROL_WIDTH}px;
  min-height: ${CONTROL_WIDTH}px;
  transition: width ${TRANSITION.speed[1]} ${TRANSITION.curve.quart};
  &:hover {
    transition-delay: 600ms;
    width: ${CONTROL_WIDTH_FULL}px;
  }
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`
const ListItem = styled.li`
  width: ${CONTROL_WIDTH_FULL}px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  cursor: ${props => props.disabled || props.active ? '' : 'pointer'};
  & * {
    color: ${props => props.disabled ? BLACK_SOFT : props.active ? PRIMARY : textColor};
  }
  ${props => props.disabled ? '' : `
      &:hover,
      &:focus {
        background-color: ${props.active ? '' : lighten(0.05, bgColor)};
        & * {
          color: ${props.active ? PRIMARY : WHITE_SOFT};
        }
      }
      &:active {
        background-color: ${props.active ? '' : darken(0.05, bgColor)};
        ${props.active ? '' : `
          & * {
            color: ${darken(0.1, textColor)}
          }
        `}
      }
  `}
`
const IconWrapper = styled.figure`
  flex: 0 0 ${CONTROL_WIDTH}px;
  height: ${CONTROL_WIDTH}px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Icon = styled.i`
  font-size: ${iconSize}px;
`
const Label = styled.p`
  flex: 1 1 auto;
  padding: 0 ${UNIT}px;

`

const ControlPanel = (props) => {

  // list data dependent on props
  const controls = [
    { label: 'View',
      icon: 'fas fa-arrows-alt',
      active: true,
      disabled: false,
    },
    { label: 'Add Table',
      icon: 'fas fa-plus',
      active: false,
      disabled: false,
    },
    { label: 'Remove Table',
      icon: 'fas fa-trash',
      active: false,
      disabled: true,
    }
  ]

  return (
    <Container>
      <List>
        {controls.map(c => (
          <ListItem active={c.active} disabled={c.disabled}>
            <IconWrapper>
              <i className={c.icon} />
            </IconWrapper>
            <Label>{c.label}</Label>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default ControlPanel
