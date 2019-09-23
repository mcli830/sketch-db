import React from 'react'
import { lighten, darken } from 'polished'

export const UNIT = 8

export const FONT = 'sans-serif'
export const FONT_SIZE = UNIT * 2

export const TEXT_PADDING = {
  x: UNIT*1.5,
  y: UNIT,
}

export const BLACK = '#212121'
export const BLACK_HARD = darken(0.2, BLACK)
export const BLACK_SOFT = lighten(0.2, BLACK)
export const BLACK_DIM = lighten(0.4, BLACK)
export const WHITE = '#f0f0f0'
export const WHITE_HARD = lighten(0.2, WHITE)
export const WHITE_SOFT = darken(0.2, WHITE)
export const WHITE_DIM = darken(0.4, WHITE)
export const PRIMARY = '#03a9f4'
export const SECONDARY = '#ffb74d'

const paletteStep = .05

export function palette(color){
  return Array.from(Array(11)).map((_,i) => {
    if (i < 5){
      return lighten((5-i)*paletteStep, color)
    } else if (i > 5){
      return darken((i-5)*paletteStep, color)
    } else {
      return color
    }
  })
}

export const PALETTE = {
  white: palette(WHITE),
  whiteSoft: palette(darken(paletteStep*5, WHITE)),
  black: palette(BLACK),
  blackSoft: palette(lighten(paletteStep*5, BLACK)),
  primary: palette(PRIMARY),
  secondary: palette(SECONDARY),
}

export const PALETTE_REV = {
  white: PALETTE.white.slice().reverse(),
  whiteSoft: PALETTE.whiteSoft.slice().reverse(),
  black: PALETTE.black.slice().reverse(),
  blackSoft: PALETTE.blackSoft.slice().reverse(),
  primary: PALETTE.primary.slice().reverse(),
  secondary: PALETTE.secondary.slice().reverse(),
}

const controlPanel = {
  bg: PALETTE_REV.black,
  text: PALETTE_REV.white,
  textSoft: PALETTE_REV.whiteSoft,
}

export const THEME = {
  light: {
    bg: PALETTE.white,
    text: PALETTE.black,
    textSoft: PALETTE.blackSoft,
    primary: PALETTE.primary,
    secondary: PALETTE.secondary,
    controlPanel,
  },
  dark: {
    bg: PALETTE.black.slice().reverse(),
    text: PALETTE.white.slice().reverse(),
    textSoft: PALETTE.whiteSoft.slice().reverse(),
    primary: PALETTE.primary.slice().reverse(),
    secondary: PALETTE.secondary.slice().reverse(),
    controlPanel,
  }
}

console.log(THEME)

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
    quart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    quint: 'cubic-bezier(0.23, 1, 0.32, 1)',
    bounce: 'cubic-bezier(.21,1.11,.6,1.15)',
  }
}
