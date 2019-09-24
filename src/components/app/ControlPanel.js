import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import { transparentize } from 'polished'
// components
import Fluid from '../common/Fluid'
// actions
import { changeTheme, changeMode } from '../../state/actions/app'
// constants
import { UNIT, THEME, BOX_SHADOW, TRANSITION } from '../../vars/theme'
import { CONTROL_WIDTH, CONTROL_WIDTH_FULL } from '../../vars/ui'
import { MODE } from '../../vars/data'
// component constants
const iconSize = CONTROL_WIDTH * 0.35
// const sublistTextSize = UNIT*2.2
// const insetShadowOffset = 2
// const insetShadow = transparentize(0.8, BLACK)
const transitionQuart = `${TRANSITION.speed[1]} ${TRANSITION.curve.quart}`

const Container = styled(Fluid)`
  background-color: ${({theme}) => theme.controlPanel.bg[7]};
  box-shadow: ${BOX_SHADOW.lg.css};
  width: ${CONTROL_WIDTH}px;
  height: auto;
  min-width: ${CONTROL_WIDTH}px;
  min-height: ${CONTROL_WIDTH}px;
  transition: width ${transitionQuart};
  user-select: none;
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
  cursor: ${({cursor}) => cursor};
  &, & * {
    transition: ${transitionQuart};
  }
  & * {
    color: ${props => props.disabled
      ? props.theme.controlPanel.bg[9] : props.active
      ? props.color : props.theme.controlPanel.textSoft[3]
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
          color: ${props.active ? props.color : props.theme.controlPanel.textSoft[5]};
        }
      }
  `}
`

// const Sublist = styled.li`
//   width: 100%;
//   height: ${({open,size}) => open ? (sublistTextSize+UNIT*2)*size : 0}px;
//   overflow: hidden;
//   position: relative;
//   font-size: ${sublistTextSize}px;
//   transition: height ${transitionQuart};
//   background-color: ${({theme}) => theme.bg[6]};
// `
// const SublistItemContainer = styled.ul`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   margin: 0;
//   box-shadow: inset 0 ${insetShadowOffset}px 4px ${insetShadow};
//   padding-top: ${insetShadowOffset}px;
// `
// const SublistItem = styled.li.attrs(({onClick}) => ({
//   onClick: onClick,
// }))`
//   width: 100%;
//   height: auto;
//   padding: ${UNIT}px;
//   padding-left: ${UNIT*1.5}px;
//   display: flex;
//   align-items: center;
//   cursor: ${({cursor}) => cursor};
//   color: ${props => props.active ? props.color : props.theme.controlPanel.textSoft[4]};
//   transition: padding-left ${transitionQuart};
//   &:hover {
//     color: ${props => props.active ? props.color : props.theme.controlPanel.textSoft[3]};
//   }
// `
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
const Divider = styled.hr`
  padding: 0;
  margin: ${UNIT}px auto;
  border-top: 1px solid ${({theme}) => theme.controlPanel.bg[9]};
  width: 80%;
`
// const BulletWrapper = styled.div`
//   padding: 0 ${UNIT}px 0 ${UNIT}px;
// `
//
// const Bullet = () => <BulletWrapper>&bull;</BulletWrapper>

function toggleTheme(theme){
  if(theme === 'light') return 'dark';
  else return 'light'
}

const ControlPanel = ({ theme, themeName, mode, changeMode, changeTheme }) => {
  // list data dependent on props
  const controls = [
    {
      label: 'Lights Off',
      labelActive: 'Lights On',
      type: 'toggle',
      icon: 'far fa-lightbulb',
      iconActive: 'fas fa-lightbulb',
      active: themeName === 'light',
      activeColor: theme.secondary[5],
      onClick: ()=>changeTheme(toggleTheme(themeName)),
      disabled: false,
    }, {
      type: 'divider',
    }, {
      label: 'Navigate',
      type: 'action',
      mode: MODE.move,
      icon: 'fas fa-hand-paper',
      active: [MODE.move, MODE.movePage, MODE.moveTable].includes(mode),
      activeColor: theme.primary[5],
      onClick: ()=>changeMode(MODE.move),
      disabled: false,
    }, {
      label: 'Create Table',
      type: 'action',
      mode: MODE.create,
      icon: 'fas fa-plus',
      active: [MODE.create, MODE.createTable].includes(mode),
      activeColor: theme.primary[5],
      onClick: ()=>changeMode(MODE.create),
      disabled: false,
    }, {
      label: 'Delete Table',
      type: 'action',
      mode: MODE.delete,
      icon: 'fas fa-trash',
      active: mode===MODE.delete,
      activeColor: theme.primary[5],
      onClick: ()=>changeMode(MODE.delete),
      disabled: false,
    }
  ]

  function renderListItem(c,i) {
    return (
      <ListItem
        key={i}
        theme={theme}
        active={c.active}
        color={c.activeColor}
        disabled={c.disabled}
        cursor={c.type === 'toggle' || c.mode !== mode ? 'pointer' : 'auto'}
        onClick={c.onClick}
      >
        <IconWrapper>
          <Icon className={c.active ? c.iconActive || c.icon : c.icon} />
        </IconWrapper>
        <Label>{c.type === 'toggle' && c.active ? c.labelActive : c.label}</Label>
      </ListItem>
    )
  }

  // function renderSublist(c,i,f) {
  //   return (
  //     <Sublist open={c.active} theme={theme} size={c.items.length}>
  //       <SublistItemContainer>
  //         {c.items.map((item,i) => (
  //           <SublistItem
  //             className='ControlPanel__SublistItem'
  //             active={themeName===item}
  //             theme={theme}
  //             color={}
  //             onClick={f ? ()=>{
  //               f(item)
  //               changeMode('nav')
  //             } : null}
  //           >
  //             {item[0].toUpperCase() + item.slice(1)}
  //           </SublistItem>
  //         ))}
  //       </SublistItemContainer>
  //     </Sublist>
  //   )
  // }

  return (
    <Container theme={theme}>
      <List>
        {controls.map((c,i) => {
          switch(c.type){
            case 'action':
            case 'toggle':
              return renderListItem(c,i)
            case 'divider':
              return <Divider key={i} theme={theme} />
            default:
              return null
          }
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
