import React from 'react'
import PropTypes from 'prop-types'

const Container = ({ children, className, style, fill }) => (
  <div
    className={className}
    style={{
      margin: 'auto',
      maxWidth: 600,
      minHeight: fillValue(fill),
      ...style
    }}
  >
    {children}
  </div>
)

function fillValue(fill){
  switch(fill) {
    case 'parent': return '100%';
    case 'window': return '100vh';
    case 'none':
    default:
      return null;
  }
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string,
}

Container.defaultProps = {
  className: '',
  style: {},
  fill: 'none',
}

export default Container;
