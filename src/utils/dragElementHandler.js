export default (options = {}) => {

  const dataType = typeof options.data
  const condition = options.condition || false
  const prevent = options.preventDefault || false
  const onInit = options.onInit || false
  const onMove = options.onMove || false
  const onQuit = options.onQuit || false

  return (e) => {

    const data = dataType === 'function' ? options.data(e) : options.data || null

    if (!condition(data)) return null;
    if (prevent) e.preventDefault()

    const coords = {
      x: e.clientX || 0,
      y: e.clientY || 0,
    }

    if (!!onInit) onInit(data)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', quit)

    function move(e){
      if (prevent) e.preventDefault()
      const d = {
        x: e.clientX - coords.x,
        y: e.clientY - coords.y,
      }
      coords.x = e.clientX
      coords.y = e.clientY
      if (!!onMove) onMove(data, d)
    }

    function quit(e){
      if (prevent) e.preventDefault()
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', quit)
      if (!!onQuit) onQuit(data, coords)
    }
  }
}
