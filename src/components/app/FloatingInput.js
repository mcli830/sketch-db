import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// components
import Input from '../common/Input'
import Modal from '../common/Modal'
// constants
import { TEXT_PADDING, BLACK } from '../../vars/theme'
import { TABLE_DIM } from '../../vars/ui'

const Floating = styled.div`
  display: ${({on})=> on ? '' : 'none'};
  position: fixed;
  left: ${({x}) => x || 100}px;
  top: ${({y}) => y || 100}px;
  height: auto;
  width: ${TABLE_DIM.width}px;
`

const TextInput = styled(Input)`
  transform: translate(-${TEXT_PADDING.x}%, -50%);
  width: 100%;
`

const FloatingInput = ({x, y, on, label, type, onSubmit, onCancel}) => {

  const inputRef = React.useRef();

  const handleSubmit = f => e => {
    e.preventDefault();
    f(inputRef.current.value);
  }

  // auto focus when turned on
  React.useEffect(() => {
    if (on) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }, [on])

  return (
    <Modal on={on} color={BLACK} onExit={onCancel}>
      <Floating
        x={x}
        y={y}
        on={on}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            ref={inputRef}
            type={type}
            placeholder={label}
          />
        </form>
      </Floating>
    </Modal>
  )
}

FloatingInput.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  on: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  onSubmit: PropTypes.func,
}

FloatingInput.defaultProps = {
  on: false,
  label: 'Enter a value',
  type: 'text',
  onSubmit: val => console.log(val),
}

export default FloatingInput
