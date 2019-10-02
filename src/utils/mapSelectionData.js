export default function mapSelectionData(state){
  const transform = JSON.parse(JSON.stringify(state.data))
  transform[state.app.workingspace].tables.map((t,i) => {
    t.selected = state.app.selection.includes(i)
  })
  return transform
}
