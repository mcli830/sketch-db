import React from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
// constants
import { GRID_PATTERN } from '../../vars/theme'

const g = GRID_PATTERN

const GridPattern = ({id, size}) => (
  <pattern id={id} x='0' y='0' width={size*10+1} height={size*10+1} patternUnits='userSpaceOnUse'>
    {Array.from(Array(10)).map((x,i) => {
      const n = i+1;
      const color = n === 10 ? g.lg : n === 5 ? g.md : g.sm;
      return (
        <React.Fragment key={i}>
          <line x1={size*n} x2={size*n} y1='0' y2={size*10} stroke={color} strokeWidth={g.stroke} />
          <line x1='0' x2={size*10} y1={size*n} y2={size*n} stroke={color} strokeWidth={g.stroke} />
        </React.Fragment>
      );
    })}
  </pattern>
)

GridPattern.propTypes = {
  id: PropTypes.string,
  size: PropTypes.number
}

GridPattern.defaultProps = {
  id: null,
  size: 10,
}

const staticGridPattern = (size = 12, url = false) => {
  const html = ReactDOMServer.renderToStaticMarkup(<GridPattern size={size} />)
  return {
    size: size*10 + 1,
    html: !url ? html : `url('${html
      .replace('<pattern', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"')
      .replace('</pattern>', '</svg>')
      .replace(/#/g, '%23')}')`
  }
}

export { GridPattern, staticGridPattern }
export default GridPattern
