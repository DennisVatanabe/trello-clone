import { timeElement } from './app.js'

setInterval(() => {
    timeElement.innerHTML = new Date().toLocaleTimeString()
}, 1000)

export { setInterval }
