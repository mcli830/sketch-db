import React from 'react'
import { Link } from 'gatsby'

export default props => (
  <Link
    {...props}
    style={{
      textDecoration: 'none',
      boxShadow: 'none',
      textShadow: 'none',
      backgroundImage: 'none',
    }}
  >
    {props.children}
  </Link>
)
