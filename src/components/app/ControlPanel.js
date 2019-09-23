import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { transparentize } from 'polished'
// components
import Fluid from '../common/Fluid'
// actions
import { changeTheme, changeMode } from '../../state/actions/app'
// constants
import { UNIT, THEME, BLACK, BOX_SHADOW, TRANSITION } from '../../vars/theme'
import { CONTROL_WIDTH, CONTROL_WIDTH_FULL } from '../../vars/ui'
// component constants
const iconSize = CONTROL_WIDTH * 0.8
const sublistTextSize = UNIT*2.2
const insetShadowOffset = 2
const insetShadow = transparentize(0.8, BLACK)
const transitionQuart = `${TRANSITION.speed[1]} ${TRANSITION.curve.quart}`

const Container = styled(Fluid)`
  background-color: ${({theme}) => theme.bg[7]};
  box-shadow: ${BOX_SHADOW.lg};
  width: ${CONTROL_WIDTH}px;
  height: auto;
  min-width: ${CONTROL_WIDTH}px;
  min-height: ${CONTROL_WIDTH}px;
  transition: width ${transitionQuart};
  &:hover {
    transition-delay: 1s;
    width: ${CONTROL_WIDTH_FULL}px;
    .ControlPanel__SublistItem {
      transition-delay: 1s;
      padding-left: ${CONTROL_WIDTH+UNIT}px;
    }
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
  height: ${UNIT * 8}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  cursor: ${props => props.disabled || props.active ? '' : 'pointer'};
  &, & * {
    transition: ${transitionQuart};
  }
  & * {
    color: ${props => props.disabled
      ? props.theme.bg[9] : props.active
      ? props.theme.active[5] : props.theme.textSoft[3]
    };
  }
  ${props => props.active ? `
    & i {
      transform: scale(1.15);
    }
  ` : ''}
  ${props => props.disabled ? '' : `
      &:hover,
      &:focus {
        & * {
          color: ${props.active ? props.theme.active[5] : props.theme.textSoft[5]};
        }
      }
  `}
`

const Sublist = styled.li`
  width: 100%;
  height: ${({open,size}) => open ? (sublistTextSize+UNIT*2)*size : 0}px;
  overflow: hidden;
  position: relative;
  font-size: ${sublistTextSize}px;
  transition: height ${transitionQuart};
  background-color: ${({theme}) => theme.bg[6]};
`
const SublistItemContainer = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  box-shadow: inset 0 ${insetShadowOffset}px 4px ${insetShadow};
  padding-top: ${insetShadowOffset}px;
`
const SublistItem = styled.li.attrs(({onClick}) => ({
  onClick: onClick,
}))`
  width: 100%;
  height: auto;
  padding: ${UNIT}px;
  padding-left: ${UNIT*1.5}px;
  display: flex;
  align-items: center;
  cursor: ${({active}) => active ? 'default' : 'pointer'};
  color: ${({active, theme}) => active ? theme.active[5] : theme.textSoft[4]};
  transition: padding-left ${transitionQuart};
  &:hover {
    color: ${({active, theme}) => active ? theme.active[5] : theme.textSoft[3]};
  }
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
// const BulletWrapper = styled.div`
//   padding: 0 ${UNIT}px 0 ${UNIT}px;
// `
//
// const Bullet = () => <BulletWrapper>&bull;</BulletWrapper>

const ControlPanel = ({ theme, themeName, mode, changeMode, changeTheme }) => {
  // list data dependent on props
  const controls = [
    { label: 'Theme',
      type: 'action',
      mode: 'theme',
      icon: 'fas fa-palette',
      active: mode === 'theme',
      disabled: false,
    },
    { type: 'sublist',
      active: mode === 'theme',
      func: theme => changeTheme(theme),
      items: [ 'light', 'dark'],
    },
    { label: 'Navigate',
      type: 'action',
      mode: 'nav',
      icon: 'fas fa-arrows-alt',
      active: ['nav', 'moving'].includes(mode),
      disabled: false,
    },
    { label: 'Create Table',
      type: 'action',
      mode: 'create',
      icon: 'fas fa-plus',
      active: ['create', 'creating'].includes(mode),
      disabled: false,
    },
    { label: 'Delete Table',
      type: 'action',
      mode: 'delete',
      icon: 'fas fa-trash',
      active: mode==='delete',
      disabled: false,
    }
  ]

  function renderListItem(c,i) {
    return (
      <ListItem
        key={i}
        theme={theme}
        active={c.active}
        disabled={c.disabled}
        onClick={()=>changeMode(c.mode)}
      >
        <IconWrapper>
          <i className={c.icon} />
        </IconWrapper>
        <Label>{c.label}</Label>
      </ListItem>
    )
  }
  function renderSublist(c,i,f) {
    return (
      <Sublist open={c.active} theme={theme} size={c.items.length}>
        <SublistItemContainer>
          {c.items.map((item,i) => (
            <SublistItem
              className='ControlPanel__SublistItem'
              active={themeName===item}
              theme={theme}
              onClick={f ? ()=>{
                f(item)
                changeMode('nav')
              } : null}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </SublistItem>
          ))}
        </SublistItemContainer>
      </Sublist>
    )
  }

  return (
    <Container theme={theme}>
      <List>
        {controls.map((c,i) => {
          return c.type === 'action'
          ? renderListItem(c,i)
          : renderSublist(c,i, c.func)
        })}
      </List>
    </Container>
  )
}

const mapStateToProps = state => ({
  mode: state.app.mode,
  themeName: state.app.theme,
  theme: THEME[state.app.theme],
})

const mapDispatchToProps = dispatch => ({
  changeMode: mode => dispatch(changeMode(mode)),
  changeTheme: theme => dispatch(changeTheme(theme)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel)
