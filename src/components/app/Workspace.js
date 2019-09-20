import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// components
import Fluid from '../common/Fluid'
import { staticGridPattern } from '../svg/GridPattern'
import DropShadow from '../svg/DropShadow'
import Table from './Table'
import FloatingInput from './FloatingInput'
// actions
import { changeMode } from '../../state/actions/app'
import { createTable } from '../../state/actions/data'
// constants
import { TEXT_PADDING, GRID_PATTERN } from '../../vars/theme'
import { WORKSPACE_SIZE, TABLE_DIM } from '../../vars/ui'

// const idGridPattern = 'svg-grid-pattern'
const idDropShadow = 'svg-drop-shadow'

const gridPattern = staticGridPattern(12, true)

const SvgWrapper = styled.div`
  width: ${WORKSPACE_SIZE}px;
  height: ${WORKSPACE_SIZE}px;
`
const Svg = styled.svg.attrs(props => ({
  height: WORKSPACE_SIZE,
  width: WORKSPACE_SIZE,
}))`
  background-color: ${GRID_PATTERN.bg};
  background-image: ${gridPattern.html};
  cursor: ${({mode}) => {
    switch(mode){
      case 'nav': return 'grab';
      case 'create': return 'cell';
      case 'delete': return 'crosshair';
      default: return 'auto';
    }
  }}
`
// const Bg = styled.rect.attrs(({pattern}) => ({
//   x: 0,
//   y: 0,
//   width: '500%',
//   height: '500%',
//   fill: `url(#${pattern})`,
// }))`
//   transform: translate(-50%, -50%);
// `

class Workspace extends React.Component {

  constructor(props){
    super(props)
    // local state
    this.state = {
      creating: false,
      mouse: {
        coords: this.props.app.mouse.coords
      }
    }
    // refs
    this.svgRef = React.createRef();
    // bindings
    this.cancelCreating = this.cancelCreating.bind(this)
    this.creatingTableListener = this.creatingTableListener.bind(this)
    this.handleNav = this.handleNav.bind(this)
    this.handleCreating = this.handleCreating.bind(this)
    this.handleCreateTable = this.handleCreateTable.bind(this)
  }

  // lifecycle
  componentDidMount(){
    // testing
    window.addEventListener('click', ()=>{
      console.log('GLOBAL SVG CLICK')
    })
    // key listener for creating table
    if (this.state.creating){
      window.addEventListener('keydown', this.creatingTableListener);
    }
    console.log({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    })
  }
  componentDidUpdate(prevProps, prevState){
    // manage key listeners
    if (!prevState.creating && this.state.creating){
      window.addEventListener('keydown', this.creatingTableListener);
    } else if (prevState.creating && !this.state.creating) {
      window.removeEventListener('keydown', this.creatingTableListener);
    }
    // todo: turn off floating input if not in create mode
  }
  componentWillUnmount(){
    // cleanup
    window.removeEventListener('keydown', this.creatingTableListener);
  }
  // listeners
  creatingTableListener(e){
    switch(e.keyCode){
      case 27:
        return this.cancelCreating();
      default: return null;
    }
  }
  // function generators for different states
  generateOnClickFunc(){
    switch(this.props.app.mode){
      case 'create':
        if (!this.state.creating) return this.handleCreating;
        break;
      default: return null;
    }
  }

  generateOnMouseDownFunc(){
    switch(this.props.app.mode){
      case 'nav':
        return this.handleNav;
      default: return null;
    }
  }
  // setters
  cancelCreating(){
    return this.setState({
      creating: false,
    })
  }

  // handlers
  handleNav(e){
    if (e.target !== e.currentTarget) return null;
    e.preventDefault();
    const coords = {
      x: e.clientX,
      y: e.clientY,
    }
    console.log({
      scrollTop: document.body.scrollTop
    })
    // const svg = this
    // const origin = viewBox.slice(0,2)
    // const dims = viewBox.slice(2)
    // const move = navMove.bind(this)
    window.addEventListener('mousemove', navMove)
    window.addEventListener('mouseup', navQuit)
    function navMove(e){
      e.preventDefault();
      const d = {
        x: e.clientX - coords.x,
        y: e.clientY - coords.y,
      }
      coords.x = e.clientX
      coords.y = e.clientY
      window.scrollBy(-d.x, -d.y, { behavior: 'smooth'})
    }
    function navQuit(e){
      e.preventDefault();
      window.removeEventListener('mousemove', navMove)
      window.removeEventListener('mouseup', navQuit)
    }
  }
  handleCreating(e){
    e.preventDefault();
    this.setState({
      creating: true,
      mouse: {
        ...this.state.mouse,
        coords: {
          x: e.clientX,
          y: e.clientY,
        }
      }
    });
  }
  handleCreateTable(name){
    const { app } = this.props;
    this.props.createTable(app.workingspace, name, {
      x: this.state.mouse.coords.x - TEXT_PADDING.x,
      y: this.state.mouse.coords.y - TABLE_DIM.name.lineHeight*0.5,
    });
    this.cancelCreating();
  }

  // render
  render() {

    const { app, data } = this.props;
    const workspace = data[app.workingspace];
    const viewBox = workspace.viewBox

    return (
      <React.Fragment>
        <SvgWrapper>
          <Svg
            ref={this.svgRef}
            mode={app.mode}
            onClick={this.generateOnClickFunc()}
            onMouseDown={this.generateOnMouseDownFunc()}
          >
            <defs>
              <DropShadow id={idDropShadow} />
            </defs>
            {workspace.tables.map((t,i) => (
              <Table
                key={i}
                coords={t.coords}
                name={t.name}
                fields={t.fields}
                filter={idDropShadow}
              />
            ))}
          </Svg>
        </SvgWrapper>
        <FloatingInput
          x={this.state.mouse.coords.x}
          y={this.state.mouse.coords.y}
          on={this.state.creating}
          label='New Table'
          onSubmit={this.handleCreateTable}
          onCancel={this.cancelCreating}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  data: state.data,
})

const mapDispatchToProps = dispatch => ({
  changeMode: (mode) => dispatch(changeMode(mode)),
  createTable: (workspace, name, coords) => dispatch(createTable(workspace, name, coords)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace)
