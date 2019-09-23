import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// components
import Fluid from '../common/Fluid'
import { staticGridPattern } from '../svg/GridPattern'
import DropShadow from '../svg/DropShadow'
import Table from './Table'
import FloatingInput from './FloatingInput'
// util
import dragElementHandler from '../../utils/dragElementHandler'
// actions
import { changeMode, creatingTable } from '../../state/actions/app'
import { createTable } from '../../state/actions/data'
// constants
import { UNIT, THEME, TEXT_PADDING, BOX_SHADOW } from '../../vars/theme'
import { WORKSPACE_SIZE, TABLE_DIM } from '../../vars/ui'
import { MODE } from '../../vars/data'

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
      case MODE.move:
        return 'grab';
      case MODE.movePage:
      case MODE.moveTable:
        return 'grabbing';
      case MODE.create:
        return 'cell';
      case MODE.delete:
        return 'crosshair';
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
    this.handleMove = this.handleMove.bind(this)
    this.handleCreating = this.handleCreating.bind(this)
    this.handleCreateTable = this.handleCreateTable.bind(this)
  }

  // lifecycle
  componentDidMount(){
    // testing
    window.addEventListener('click', (e)=>{
      console.log('GLOBAL SVG CLICK')
      if (e.target.dataset.table) console.log(e.target.dataset.table)

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
        if (this.props.app.mode !== MODE.move){
          if (this.props.app.mode === MODE.createTable){
            return this.props.changeMode(MODE.create);
          }
          this.props.changeMode(MODE.move)
        }
        break;
      default:
    }
  }

  // function generators for different states
  generateOnClickFunc(){
    switch(this.props.app.mode){
      case MODE.create:
        return this.handleCreating;
        break;
      default: return null;
    }
  }

  generateOnMouseDownFunc(){
    switch(this.props.app.mode){
      case MODE.move:
        return this.handleMove;
      default: return null;
    }
  }
  // handlers
  handleMove = dragElementHandler({
    condition: e => e.target === e.currentTarget,
    preventDefault: true,
    onInit: () => changeMode(MODE.movePage),
    onMove: d => window.scrollBy(-d.x, -d.y, { behavior: 'smooth' }),
    onQuit: () => changeMode(MODE.move),
  })

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
    this.props.changeMode(MODE.create)
  }

  // render
  render() {

    const { app, data, theme } = this.props
    const workspace = data[app.workingspace]
    const viewBox = workspace.viewBox

    return (
      <React.Fragment>
        <SvgWrapper>
          <Svg
            ref={this.svgRef}
            mode={app.mode}
            onClick={this.generateOnClickFunc()}
            onMouseDown={this.generateOnMouseDownFunc()}
            theme={theme}
          >
            <defs>
              <DropShadow
                id={idDropShadow}
                color={BOX_SHADOW.md.color}
                opacity={BOX_SHADOW.md.alpha}
                dx={BOX_SHADOW.md.delta}
                dy={BOX_SHADOW.md.delta}
                stdDeviation={BOX_SHADOW.md.stdDev}
              />
            </defs>
            {workspace.tables.map((t,i) => (
              <Table
                key={i}
                coords={t.coords}
                name={t.name}
                fields={t.fields}
                filter={idDropShadow}
                theme={theme}
              />
            ))}
          </Svg>
        </SvgWrapper>
        <FloatingInput
          x={app.coords.client.x}
          y={app.coords.client.y}
          on={app.mode === MODE.createTable}
          label='New Table'
          onSubmit={this.handleCreateTable}
          onCancel={()=>this.props.changeMode(MODE.create)}
          theme={theme}
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
