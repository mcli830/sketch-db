import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// components
import Fluid from '../common/Fluid'
import GridPattern from '../svg/GridPattern'
import DropShadow from '../svg/DropShadow'
import Table from './Table'
import FloatingInput from './FloatingInput'
// actions
import { changeMode } from '../../state/actions/app'
import { createTable } from '../../state/actions/data'
// constants
import { TEXT_PADDING, GRID_PATTERN } from '../../vars/theme'
import { TABLE_DIM } from '../../vars/ui'

const idGridPattern = 'svg-grid-pattern'
const idDropShadow = 'svg-drop-shadow'

const SvgWrapper = styled(Fluid)`
  overflow: hidden;
`
const Svg = styled.svg`
  background-color: ${GRID_PATTERN.bg};
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
  width: '100%',
  height: '100%',
  fill: `url(#${pattern})`
}))``

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
    this.handleCreating = this.handleCreating.bind(this)
    this.handleCreateTable = this.handleCreateTable.bind(this)
  }

  // lifecycle
  componentDidMount(){
    // testing
    window.addEventListener('click', ()=>{
      console.log('GLOBAL CLICK')
    })
    // set svg viewBox

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
    window.removeEventListener('keydown', this.creatingTableListener)
  }

  // listeners
  creatingTableListener(e){
    switch(e.keyCode){
      case 27:
        return this.cancelCreating();
      default: return null;
    }
  }

  generateOnClickFunc(){
    switch(this.props.app.mode){
      case 'create':
        if (!this.state.creating) return this.handleCreating;
        break;
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
          >
            <defs>
              <GridPattern size={12} id={idGridPattern} />
            </defs>
            <Bg pattern={idGridPattern} />
            {workspace.tables.map((t,i) => (
              <Table
                key={i}
                coords={t.coords}
                name={t.name}
                fields={t.fields}
              />
            ))}
          </Svg>
        </SvgWrapper>
        <FloatingInput
          x={this.state.mouse.coords.x}
          y={this.state.mouse.coords.y}
          on={this.state.creating}
          label='New Table Name'
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
