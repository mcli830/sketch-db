import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// components
import Fluid from '../common/Fluid'
// constants
import { THEME } from '../../vars/theme'

const Container = styled(Fluid)`
  background-color: ${({theme}) => theme.bg[1]};
  color: ${({theme}) => theme.text[5]};
`

const TabContainer = ({ theme, data }) => (
  <Container theme={theme}>
    {data}
  </Container>
)

const mapStateToProps = state => ({
  theme: THEME[state.app.theme],
})

export default connect(
  mapStateToProps,
  null,
)(TabContainer)
