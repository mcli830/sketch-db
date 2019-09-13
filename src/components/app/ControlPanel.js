import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { lighten } from 'polished'
// components
import Fluid from '../common/Fluid'
// actions
import changeMode from '../../state/actions/app/changeMode'
// constants
import { UNIT, BLACK, WHITE_SOFT, WHITE_DIM, BLACK_SOFT, PRIMARY, BOX_SHADOW, TRANSITION } from '../../vars/theme'
import { CONTROL_WIDTH, CONTROL_WIDTH_FULL } from '../../vars/ui'
// component constants
const iconSize = CONTROL_WIDTH * 0.8
const bgColor = lighten(0.1, BLACK)
const textColor = WHITE_DIM

const Container = styled(Fluid)`
  background-color: ${bgColor};
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
  &, & * {
    transition: ${TRANSITION.speed[1]} ${TRANSITION.curve.quart};
  }
  & * {
    color: ${props => props.disabled ? BLACK_SOFT : props.active ? PRIMARY : textColor};
  }
  ${props => props.disabled ? '' : `
      &:hover,
      &:focus {
        & * {
          color: ${props.active ? PRIMARY : WHITE_SOFT};
        }
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

const ControlPanel = ({ mode, changeMode }) => {
  // list data dependent on props
  const controls = [
    { label: 'View',
      mode: 'view',
      icon: 'fas fa-arrows-alt',
      active: mode==='view',
      disabled: false,
    },
    { label: 'Add Table',
      mode: 'add',
      icon: 'fas fa-plus',
      active: mode==='add',
      disabled: false,
    },
    { label: 'Remove Table',
      mode: 'delete',
      icon: 'fas fa-trash',
      active: mode==='delete',
      disabled: false,
    }
  ]

  return (
    <Container>
      <List>
        {controls.map(c => (
          <ListItem
            active={c.active}
            disabled={c.disabled}
            onClick={()=>changeMode(c.mode)}
          >
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

const mapStateToProps = state => ({
  mode: state.app.mode
})

const mapDispatchToProps = dispatch => ({
  changeMode: mode => dispatch(changeMode(mode)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel)
