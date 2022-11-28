import {
  newTodoTitleElement,
  newTodoInnerElement,
  newTodoNameElement,
  timeElement,
  newModaleElement,
  newTodoCategoryElement,
  containersElements,
  removeMadaleElement,
  modaleAllElement,
  counterTodoElement,
  counterProgressElement,
  counterDoneElement
} from './app.js'

import { Task } from './conctructors.js'

import { getItem, setItem } from './storageManager.js'

import { buildCardTemplate } from './templates.js'

const time = setInterval(() => {
    timeElement.innerHTML = new Date().toLocaleTimeString()
}, 1000)

function newModale() {
  newModaleElement.classList.add('open')
}

function cancelAddTodo() {
  newModaleElement.classList.remove('open')
}

function removeTodo() {
  newTodoElement.innerHTML = ''
}

function render() {
  const tasks = getItem('tasks')
  clearContainers()
  if (tasks.length) {
    tasks.forEach(element => {
      buildCardTemplate(element)
    })
  }
  counter()
}

function counter() {
  const tasks = getItem('tasks')
  const resultTodo = tasks.filter((el) => el.category === "todo")
  const resultProgress = tasks.filter((el) => el.category === "progress")
  const resultDone = tasks.filter((el) => el.category === "done")
  counterTodoElement.innerHTML = resultTodo.length
  counterProgressElement.innerHTML = resultProgress.length
  counterDoneElement.innerHTML = resultDone.length
}

function createCard() {
  const title = newTodoTitleElement.value
  const description = newTodoInnerElement.value
  const user = newTodoNameElement.value
  const category = newTodoCategoryElement.value
  const task = new Task({title, description, user, category})
  const items = getItem('tasks')

  items.push(task)
  setItem('tasks', items)

  clearCard()
  render()
}

function clearCard() {
  newTodoTitleElement.value = ''
  newTodoInnerElement.value = ''
  newTodoNameElement.value = ''
}

function clearContainers() {
  containersElements.forEach((element) => {
    element.innerHTML = ''
  })
}

function changeContainer(event) {
  const target = document.querySelector('.card__select')
  if (event.target.classList.contains('card__select')) {
    const elementId = event.target.parentElement.parentElement.id
    const tasks = getItem('tasks')
    const result = tasks.map((el) => ({
    ...el,
    category: el.id === parseInt(elementId) ? event.target.value : el.category
    }))
    setItem('tasks', result)
    render()
  }
}

function showRemoveModale(event) {
  removeMadaleElement.id = event.target.parentElement.parentElement.id
  removeMadaleElement.classList.add('open')
}

function hideRemoveModale() {
  removeMadaleElement.classList.remove('open')
  modaleAllElement.classList.remove('open')
}

function deleteTodo(event) {
  const elementId = parseInt(event.target.parentElement.parentElement.id)
  const elements = getItem('tasks')
  const result = elements.filter((el) => el.id !== elementId)
  setItem('tasks', result)
  hideRemoveModale()
  render()
}

function deleteAllDoneTodo() {
  elements = getItem('tasks')
  const result = elements.filter((el) => el.category !== "done")
  setItem('tasks', result)
  hideRemoveModale()
  render()
}

function showDeleteAll() {
  modaleAllElement.classList.add('open')
}

export {
  addCard,
  newModale,
  cancelAddTodo,
  removeTodo,
  render,
  createCard,
  clearContainers,
  changeContainer,
  showRemoveModale,
  hideRemoveModale,
  deleteTodo,
  showDeleteAll,
  deleteAllDoneTodo,
  counter
}
