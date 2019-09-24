export default function getTableName(t){
  const p = t.parentNode
  const has = Object.prototype.hasOwnProperty
  return (
    p.tagName === 'g'
    && has.call(p, 'dataset')
    && has.call(p.dataset, 'table')
  ) ? p.dataset.table : null
}
