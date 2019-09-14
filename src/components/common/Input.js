import styled from 'styled-components'
import { lighten } from 'polished'
// constants
import { TEXT_PADDING, BLACK, BLACK_HARD, BLACK_SOFT, WHITE_SOFT, BOX_SHADOW } from '../../vars/theme'

export default styled.input`
  background-color: ${BLACK_HARD};
  color: ${WHITE_SOFT};
  padding: ${TEXT_PADDING.y}px ${TEXT_PADDING.x}px;
  border-radius: 10px;
  border: 2px solid ${lighten(0.1, BLACK)};
  box-shadow: ${BOX_SHADOW.md};
  ::placeholder {
    color: ${lighten(0.1, BLACK_SOFT)};
  }
  &:focus,
  &:active {
    outline: none;
    border-color: ${BLACK_SOFT};
  }
`
