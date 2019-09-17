import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten } from 'polished'
import { UNIT, FONT_SIZE, BLACK, WHITE_SOFT, WHITE } from '../../vars/theme'
import { TABLE_DIM } from '../../vars/ui'

const c = TABLE_DIM

const Rect = styled.rect`
  fill: ${lighten(0.1, BLACK)};
`
const Centered = styled.text`
  text-anchor: middle;
  dominant-baseline: middle;
`
const Name = styled(Centered)`
  fill: ${WHITE};
`
const Field = styled(Centered)`
  fill: ${WHITE_SOFT}
`

function Table(props){

  const { name, coords, fields, filter } = props

  const tableHeight = c.name.lineHeight + c.field.lineHeight*fields.length + c.padding*2;
  const center = coords.x + c.width*0.5;
  const calcFieldYMid = n => {
    return coords.y + c.padding + c.name.lineHeight + c.field.lineHeight*n - c.field.lineHeight*0.5;
  }

  return (
    <g>
      <Rect
        x={coords.x}
        y={coords.y}
        width={c.width}
        height={tableHeight}
        filter={filter ? `url(#${filter})` : ''}
      />
      <Name
        x={center}
        y={coords.y + c.padding + c.name.lineHeight*.5}
        fontSize={c.name.fontSize}
      >
        {name}
      </Name>
      {fields.map((f, i) => (
        <Field
          key={i}
          x={center}
          y={calcFieldYMid(i+1)}
        >
          {f.name}: {f.type}
        </Field>
      ))}
    </g>
  );
}

Table.propTypes = {
  name: PropTypes.string.isRequired,
  coords: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  filter: PropTypes.string,
}

export default Table;
