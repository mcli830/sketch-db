function offset(start, end){
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  }
}

export default (options = {}) => {

  const payloadIsFunction = typeof options.payload === 'function'
  const condition = options.condition || false
  const prevent = options.preventDefault || false
  const onInit = options.onInit || false
  const onMove = options.onMove || false
  const onQuit = options.onQuit || false

  return (e) => {

    const payload = payloadIsFunction ? options.payload(e) : (options.payload || null)

    if (!condition(payload)) return null
    if (prevent) e.preventDefault()

    const origin =  {
      x: e.clientX || 0,
      y: e.clientY || 0,
    }
    const coords = {...origin}

    if (!!onInit) onInit(payload, origin)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', quit)

    function move(e){
      if (prevent) e.preventDefault()
      const delta = {
        x: e.clientX - coords.x,
        y: e.clientY - coords.y,
      }
      coords.x = e.clientX
      coords.y = e.clientY
      if (!!onMove) {
        onMove({
          payload,
          origin,
          delta,
          offset: offset(origin, coords),
        })
      }
    }

    function quit(e){
      if (prevent) e.preventDefault()
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', quit)
      if (!!onQuit) {
        onQuit({
          payload,
          origin,
          offset: offset(origin, coords),
        })
      }
    }
  }
}
