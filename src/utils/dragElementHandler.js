export default (options = {}) => {

  const condition = options.clickCondition || false
  const prevent = options.preventDefault || false
  const onInit = options.onInit || false
  const onMove = options.onMove || false
  const onQuit = options.onQuit || false

  return (e) => {
    if (!condition(e)) return null;
    if (prevent) e.preventDefault()

    const coords = {
      x: e.clientX || 0,
      y: e.clientY || 0,
    }

    if (!!onInit) onInit()

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
      if (!!onMove) onMove(d)
    }

    function quit(e){
      if (prevent) e.preventDefault()
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', quit)
      if (!!onQuit) onQuit(coords)
    }
  }
}
