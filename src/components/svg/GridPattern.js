import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// constants
import { GRID_PATTERN } from '../../vars/theme'

const g = GRID_PATTERN

const Line = styled.line`
  stroke-width: ${g.stroke};
  stroke: ${({color})=>color};
`

const GridPattern = ({id, size}) => (
  <pattern id={id} x='0' y='0' width={size*10+1} height={size*10+1} patternUnits='userSpaceOnUse'>
    {Array.from(Array(10)).map((x,i) => {
      const n = i+1;
      const color = n === 10 ? g.lg : n === 5 ? g.md : g.sm;
      return (
        <React.Fragment key={i}>
          <Line x1={size*n} x2={size*n} y1='0' y2={size*10} color={color} />
          <Line x1='0' x2={size*10} y1={size*n} y2={size*n} color={color} />
        </React.Fragment>
      );
    })}
  </pattern>
)

GridPattern.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.number
}

GridPattern.defaultProps = {
  size: 10,
}

export default GridPattern
