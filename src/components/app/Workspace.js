import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// components
import Fluid from '../common/Fluid'
import { GridPattern, staticGridPattern } from '../svg/GridPattern'
import DropShadow from '../svg/DropShadow'
import Table from './Table'
import FloatingInput from './FloatingInput'
// actions
import { changeMode } from '../../state/actions/app'
import { createTable } from '../../state/actions/data'
// constants
import { TEXT_PADDING, GRID_PATTERN } from '../../vars/theme'
import { WORKSPACE_SIZE, TABLE_DIM } from '../../vars/ui'

const idGridPattern = 'svg-grid-pattern'
const idDropShadow = 'svg-drop-shadow'

const gridPattern = staticGridPattern(12, true)

const SvgWrapper = styled(Fluid)`
  overflow: hidden;
`
const Svg = styled.svg`
  background-color: ${GRID_PATTERN.bg};
  background-image: ${gridPattern.html};
  width: 100%;
  height: 100%;
  cursor: ${({mode}) => {
    switch(mode){
      case 'nav': return 'grab';
      case 'create': return 'cell';
      case 'delete': return 'crosshair';
      default: return 'auto';
    }
  }}
`
const Bg = styled.rect.attrs(({pattern}) => ({
  x: 0,
  y: 0,
  width: '500%',
  height: '500%',
  fill: `url(#${pattern})`,
}))`
  transform: translate(-50%, -50%);
`

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
  // getters
  get viewBox(){
    const vb = this.svgRef.current.getAttribute('viewBox')
    return vb ? vb.split(' ').map(str => parseInt(str, 10)) : vb;
    // returns an array or null
  }
  // setters
  set viewBox(arr){
    this.svgRef.current.setAttribute('viewBox', `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]}`)
  }

  cancelCreating(){
    return this.setState({
      creating: false,
    })
  }

  // handlers
  handleNav(e){
    console.log({
      current: e.currentTarget,
      target: e.target
    })
    // if (e.target !== e.currentTarget) return null;
    const coords = {
      x: e.clientX,
      y: e.clientY,
    }
    const svg = this
    const viewBox = this.viewBox;
    const origin = viewBox.slice(0,2)
    const dims = viewBox.slice(2)
    const move = navMove.bind(this)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', navQuit)
    function navMove(e){
      const d = {
        x: e.clientX - coords.x,
        y: e.clientY - coords.y,
      }
      coords.x = e.clientX
      coords.y = e.clientY
      const vb = svg.viewBox
      this.viewBox = [
        vb[0] - d.x,
        vb[1] - d.y,
        ...dims,
      ]
    }
    function navQuit(){
      window.removeEventListener('mousemove', move)
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
              <GridPattern size={12} id={idGridPattern} />
              <DropShadow id={idDropShadow} />
            </defs>
            <Bg pattern={idGridPattern} />
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
