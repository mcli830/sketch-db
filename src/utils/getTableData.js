export default function getTableData(t){
  const p = t.tagName === 'g' ? t : t.parentNode
  return (
    p.tagName === 'g'
    && p.classList.contains('Table')
  ) ? {
    name: p.dataset.table,
    index: parseInt(p.dataset.index, 10),
    node: p,
  } : null
}
