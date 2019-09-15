import React from 'react'
import PropTypes from 'prop-types'

const DropShadow = ({id, dx, dy, stDeviation, color, opacity }) => (
  <filter id={id}>
    <feDropShadow in='SourceGraphic' dx={dx} dy={dy} stdDeviation={stdDeviation} flood-color={color} flood-opacity={opacity} />
  </filter>
)

DropShadow.propTypes = {
  id: PropTypes.string.isRequired,
  dx: PropTypes.number,
  dy: PropTypes.number,
  stdDeviation: PropTypes.number,
  color: PropTypes.string,
  opacity: PropTypes.number,
}

DropShadow.defaultProps = {
  dx: 4,
  dy: 4,
  stdDeviation: 6,
  color: '#444',
  opacity: 0.8,
}

export default DropShadow
