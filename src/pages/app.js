import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { lighten } from 'polished'
// components
import AppLayout from '../components/layouts/AppLayout'
import TabContainer from '../components/app/TabContainer'
import ControlPanel from '../components/app/ControlPanel'
import Workspace from '../components/app/Workspace'
import Fluid from '../components/common/Fluid'
// styles
import '../styles/fontawesome/css/all.css'
// store
import createStore from '../state/createStore'
// constants
import { UNIT, BLACK } from '../vars/theme'
import { TAB_HEIGHT, CONTROL_WIDTH } from '../vars/ui'

const store = createStore();

const FlexContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
`
const TabWrapper = styled.div`
  flex: 0 0 ${TAB_HEIGHT}px;
  width: 100%;
`
const Interface = styled.div`
  flex: 1 1 auto;
  width: 100%;
  border-bottom: 1px solid ${lighten(0.2, BLACK)};
  position: relative;
`
const ControlPanelWrapper = styled.div`
  position: absolute;
  top: ${UNIT}px;
  left: ${UNIT}px;
  height: auto;
  width: auto;
  z-index: 2;
`
const WorkspaceWrapper = styled(Fluid)`
  position: relative;
  z-index: 1;
`

const App = (props) => (
  <Provider store={store}>
    <AppLayout>
      <FlexContainer>
        <TabWrapper>
          <TabContainer data='Hello data' />
        </TabWrapper>
        <Interface>
          <WorkspaceWrapper>
            <Workspace />
          </WorkspaceWrapper>
          <ControlPanelWrapper>
            <ControlPanel />
          </ControlPanelWrapper>
        </Interface>
      </FlexContainer>
    </AppLayout>
  </Provider>
)

export default App;
