export default function getTableData(t){
  const p = t.parentNode
  const has = Object.prototype.hasOwnProperty
  return (
    p.tagName === 'g'
    && p.classList.contains('Table')
    && has.call(p, 'dataset')
  ) ? {
    name: p.dataset.table,
    index: p.dataset.index,
  } : null
}
