import styled from 'styled-components'
// constants
import { TEXT_PADDING, BOX_SHADOW } from '../../vars/theme'

export default styled.input`
  background-color: ${({theme}) => theme.bg[3]};
  color: ${({theme}) => theme.text[5]};
  padding: ${TEXT_PADDING.y}px ${TEXT_PADDING.x}px;
  border-radius: 10px;
  border: 2px solid ${({theme}) => theme.bg[7]};
  box-shadow: ${BOX_SHADOW.md};
  ::placeholder {
    color: ${({theme}) => theme.bg[7]};
  }
  &:focus,
  &:active {
    outline: none;
    border-color: ${({theme}) => theme.bg[9]};
  }
`
