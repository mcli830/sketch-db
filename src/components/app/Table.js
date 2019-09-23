import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { THEME } from '../../vars/theme'
import { TABLE_DIM } from '../../vars/ui'

const c = TABLE_DIM

const Rect = styled.rect`
  fill: ${({theme}) => theme.bg[3]};
  stroke: ${({theme}) => theme.bg[8]}
  stroke-width: 1;
`
const Centered = styled.text`
  text-anchor: middle;
  dominant-baseline: middle;
`
const Name = styled(Centered)`
  fill: ${({theme}) => theme.text[3]};
  font-size: ${TABLE_DIM.name.fontSize};
  font-weight: bold;
`
const Field = styled(Centered)`
  fill: ${({theme}) => theme.textSoft[5]};
  font-size: ${TABLE_DIM.field.fontSize};
`

function Table({theme, name, coords, fields, filter}){

  const tableHeight = c.name.lineHeight + c.field.lineHeight*fields.length + c.padding*2;
  const center = coords.x + c.width*0.5;
  const calcFieldYMid = n => {
    return coords.y + c.padding + c.name.lineHeight + c.field.lineHeight*n - c.field.lineHeight*0.5;
  }

  return (
    <g>
      <Rect
        theme={theme}
        x={coords.x}
        y={coords.y}
        width={c.width}
        height={tableHeight}
        filter={filter ? `url(#${filter})` : ''}
      />
      <Name
        theme={theme}
        x={center}
        y={coords.y + c.padding + c.name.lineHeight*.5}
      >
        {name}
      </Name>
      {fields.map((f, i) => (
        <Field
          theme={theme}
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

const mapStateToProps = state => ({
  theme: THEME[state.app.theme]
})

export default connect(
  mapStateToProps,
  null
)(Table)
