import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
// components
import AppLayout from '../components/layouts/AppLayout'
import TabContainer from '../components/app/TabContainer'
import ControlPanel from '../components/app/ControlPanel'
import Workspace from '../components/app/Workspace'
// styles
import '../styles/fontawesome/css/all.css'
// store
import createStore from '../state/createStore'
// constants
import { UNIT } from '../vars/theme'
import { TAB_HEIGHT } from '../vars/ui'

const store = createStore();

const TabWrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: ${TAB_HEIGHT}px;
  width: 100vw;
  z-index: 3;
`
const ControlPanelWrapper = styled.div`
  position: fixed;
  top: ${UNIT}px;
  left: ${UNIT}px;
  height: auto;
  width: auto;
  z-index: 2;
`
const WorkspaceWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: ${TAB_HEIGHT}px;
`

const App = (props) => (
  <Provider store={store}>
    <AppLayout>
      <WorkspaceWrapper>
        <Workspace />
      </WorkspaceWrapper>
      <TabWrapper>
        <TabContainer data='Hello data' />
      </TabWrapper>
      <ControlPanelWrapper>
        <ControlPanel />
      </ControlPanelWrapper>
    </AppLayout>
  </Provider>
)

export default App
