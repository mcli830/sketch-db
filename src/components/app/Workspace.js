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
import { changeMode, creatingTable } from '../../state/actions/app'
import { createTable } from '../../state/actions/data'
// constants
import { UNIT, THEME, TEXT_PADDING } from '../../vars/theme'
import { WORKSPACE_SIZE, TABLE_DIM } from '../../vars/ui'

// const idGridPattern = 'svg-grid-pattern'
const idDropShadow = 'svg-drop-shadow'

const SvgWrapper = styled.div`
  width: ${WORKSPACE_SIZE}px;
  height: ${WORKSPACE_SIZE}px;
`
const Svg = styled.svg.attrs(props => ({
  height: WORKSPACE_SIZE,
  width: WORKSPACE_SIZE,
}))`
  background-color: ${({theme}) => theme.bg[5]};
  background-image: ${({theme}) => staticGridPattern(theme, UNIT, true).html};
  cursor: ${({mode}) => {
    switch(mode){
      case 'nav': return 'grab';
      case 'moving': return 'grabbing';
      case 'create': return 'cell';
      case 'delete': return 'crosshair';
      default: return 'auto';
    }
  }}
`

class Workspace extends React.Component {

  constructor(props){
    super(props)
    // refs
    this.svgRef = React.createRef();
    // bindings
    this.globalKeypress = this.globalKeypress.bind(this)
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
    window.addEventListener('keyup', this.globalKeypress)
  }

  componentWillUnmount(){
    // cleanup
    window.removeEventListener('keyup', this.globalKeypress)
  }
  // listeners
  globalKeypress(e){
    switch(e.keyCode){
      case 27:
        if (this.props.app.mode !== 'nav'){
          if (this.props.app.mode === 'creating'){
            return this.props.changeMode('create');
          }
          this.props.changeMode('nav')
        }
        break;
      default:
    }
  }

  // function generators for different states
  generateOnClickFunc(){
    switch(this.props.app.mode){
      case 'create':
        return this.handleCreating;
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
  // handlers
  handleNav(e){
    if (e.target !== e.currentTarget) return null;
    e.preventDefault();
    const coords = {
      x: e.clientX,
      y: e.clientY,
    }
    const changeMode = this.props.changeMode
    changeMode('moving')
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
      changeMode('nav')
    }
  }
  handleCreating(e){
    e.preventDefault();
    this.props.creatingTable({
      client: {
        x: e.clientX,
        y: e.clientY,
      },
      page: {
        x: e.pageX,
        y: e.pageY,
      }
    })
  }
  handleCreateTable(name){
    const { app } = this.props;
    this.props.createTable(app.workingspace, name, {
      x: this.props.app.coords.page.x - TEXT_PADDING.x,
      y: this.props.app.coords.page.y - TABLE_DIM.name.lineHeight*0.5,
    });
    this.props.changeMode('create')
  }

  // render
  render() {

    const { app, data } = this.props
    const workspace = data[app.workingspace]
    const viewBox = workspace.viewBox

    console.log(this.props.theme)

    return (
      <React.Fragment>
        <SvgWrapper>
          <Svg
            ref={this.svgRef}
            mode={app.mode}
            onClick={this.generateOnClickFunc()}
            onMouseDown={this.generateOnMouseDownFunc()}
            theme={this.props.theme}
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
                theme={this.props.theme}
              />
            ))}
          </Svg>
        </SvgWrapper>
        <FloatingInput
          x={this.props.app.coords.client.x}
          y={this.props.app.coords.client.y}
          on={this.props.app.mode === 'creating'}
          label='New Table'
          onSubmit={this.handleCreateTable}
          onCancel={()=>this.props.changeMode('create')}
          theme={this.props.theme}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  theme: THEME[state.app.theme],
  data: state.data,
})

const mapDispatchToProps = dispatch => ({
  changeMode: (mode) => dispatch(changeMode(mode)),
  creatingTable: (coords) => dispatch(creatingTable(coords)),
  createTable: (workspace, name, coords) => dispatch(createTable(workspace, name, coords)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspace)
