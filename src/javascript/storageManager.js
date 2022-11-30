
function getItem(key) {
  const value = localStorage.getItem(key)

  return value ? JSON.parse(value) : []
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export { getItem,  setItem }
