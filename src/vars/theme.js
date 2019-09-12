import { lighten, darken } from 'polished'

export const UNIT = 8

export const FONT = 'sans-serif'
export const FONT_SIZE = UNIT * 2

export const BLACK = '#212121'
export const BLACK_SOFT = lighten(0.2, BLACK)
export const BLACK_HARD = darken(0.2, BLACK)
export const WHITE = '#f0f0f0'
export const WHITE_SOFT = darken(0.2, WHITE)
export const WHITE_HARD = lighten(0.2, WHITE)
export const PRIMARY = '#03a9f4'
export const SECONDARY = '#ffb74d'

export const BOX_SHADOW = {
  sm: `1px 1px 5px rgba(0,0,0,0.1)`,
  md: `3px 3px 10px rgba(0,0,0,0.25)`,
  lg: `5px 5px 15px rgba(0,0,0,0.4)`,
}

export const TRANSITION = {
  speed: {
    1: '150ms',
    2: '250ms',
    3: '500ms',
    4: '750ms',
    5: '1s',
  },
  curve: {
    quint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    bounce: 'cubic-bezier(.21,1.11,.6,1.15)',
  }
}

// WORKSPACE_GRID
const gridLine = 1
const gridUnit = 16
const gridSpace = gridUnit - gridLine
const grid = {
  space: {
    sm: gridSpace,
    md: 5*gridUnit - gridLine,
    lg: 10*gridUnit - gridLine,
  },
  color: {
    sm: lighten(0.05, BLACK),
    md: lighten(0.1, BLACK),
    lg: lighten(0.15, BLACK),
  }
}

console.log(grid)

export const WORKSPACE_GRID = `
  repeating-linear-gradient(90deg,
    transparent,
    transparent ${grid.space.lg}px,
    ${grid.color.lg} ${grid.space.lg}px,
    ${grid.color.lg} ${grid.space.lg + gridLine}px
  ),
  repeating-linear-gradient(
    transparent,
    transparent ${grid.space.lg}px,
    ${grid.color.lg} ${grid.space.lg}px,
    ${grid.color.lg} ${grid.space.lg + gridLine}px
  ),
  repeating-linear-gradient(90deg,
    transparent,
    transparent ${grid.space.md}px,
    ${grid.color.md} ${grid.space.md}px,
    ${grid.color.md} ${grid.space.md + gridLine}px
  ),
  repeating-linear-gradient(
    transparent,
    transparent ${grid.space.md}px,
    ${grid.color.md} ${grid.space.md}px,
    ${grid.color.md} ${grid.space.md + gridLine}px
  ),
  repeating-linear-gradient(90deg,
    transparent,
    transparent ${grid.space.sm}px,
    ${grid.color.sm} ${grid.space.sm}px,
    ${grid.color.sm} ${gridUnit}px
  ),
  repeating-linear-gradient(
    transparent,
    transparent ${grid.space.sm}px,
    ${grid.color.sm} ${grid.space.sm}px,
    ${grid.color.sm} ${gridUnit}px
  );
`
