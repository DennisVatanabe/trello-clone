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
  counterDoneElement,
  modifyModaleElement,
  modifyTitleElement,
  modifyInnerElement,
  modifyUserElement,
  modifyCategoryElement,
  limitModaleElement,
  todoBoardsElements
} from "./app.js"

import { Task } from "./conctructors.js"
import { KEYS } from "./constants.js"

import { getItem, setItem } from "./storageManager.js"

import { buildCardTemplate } from "./templates.js"

const time = setInterval(() => {
  timeElement.innerHTML = new Date().toLocaleTimeString()
}, 1000)

function newModale() {
  newModaleElement.classList.add('open')
}

function callModifyModale(event) {
  const elementId = parseInt(event.target.parentElement.parentElement.id)
  const tasks = getItem('tasks')
  const result = tasks.find((el) => el.id === elementId)

  modifyTitleElement.value = result.title
  modifyInnerElement.value = result.description
  modifyUserElement.value = result.user

  modifyModaleElement.id = elementId
  modifyModaleElement.classList.add('open')
}

function addDocumentClick(event) {
  if (event.target.classList.contains('modify')) {
    callModifyModale(event)
  }
  if (event.target.classList.contains('todo__remove')) {
    showRemoveModale(event)
  }
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
    tasks.forEach((element) => {
      buildCardTemplate(element)
    })
  }
  counter()
}

function counter() {
  const tasks = getItem('tasks')
  const resultTodo = tasks.filter((el) => el.category === 'todo')
  const resultProgress = tasks.filter((el) => el.category === 'progress')
  const resultDone = tasks.filter((el) => el.category === 'done')

  counterTodoElement.innerHTML = resultTodo.length
  counterProgressElement.innerHTML = resultProgress.length
  counterDoneElement.innerHTML = resultDone.length
}

function createCard() {
  const title = newTodoTitleElement.value
  const description = newTodoInnerElement.value
  const user = newTodoNameElement.value
  const category = newTodoCategoryElement.value
  const task = new Task({ title, description, user, category })
  const items = getItem('tasks')

  const progress = items.filter((el) => el.category === 'progress')
  if (category === 'progress' && progress.length > 5 ) {
    newModaleElement.classList.remove('open')
    callLimitModale()
    } else {
      items.push(task)
      setItem('tasks', items)
      clearCard()
      render()
    }
}

function modifyCard(event) {
  const title = modifyTitleElement.value
  const description = modifyInnerElement.value
  const user = modifyUserElement.value
  const category = modifyCategoryElement.value
  const elementId = parseInt(
    event.target.parentElement.parentElement.parentElement.id
  )

  const tasks = getItem('tasks')
  const progress = tasks.filter((el) => el.category === 'progress')

  if (progress.length <= 6 ) {
    const result = tasks.map((el) => {
      if (el.id === elementId) {
        return {
          ...el,
          title,
          description,
          user,
          category
        }
      }
      return el
    })
    setItem('tasks', result)
    hideRemoveModale()
    render()
  }
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
    const progress = tasks.filter((el) => el.category === 'progress')
    if (progress.length > 5 && event.target.value === 'progress') {
    callLimitModale()
    } else {
      const result = tasks.map((el) => ({
      ...el,
      category:
        el.id === parseInt(elementId) ? event.target.value : el.category,
    }))
    setItem('tasks', result)
    render()
    }
  }
}

function showRemoveModale(event) {
  removeMadaleElement.id = event.target.parentElement.parentElement.id
  removeMadaleElement.classList.add('open')
}

function hideRemoveModale() {
  removeMadaleElement.classList.remove('open')
  modaleAllElement.classList.remove('open')
  modifyModaleElement.classList.remove('open')
  limitModaleElement.classList.remove('open')
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
  const elements = getItem('tasks')
  const result = elements.filter((el) => el.category !== 'done')

  setItem('tasks', result)
  hideRemoveModale()
  render()
}

function showDeleteAll() {
  modaleAllElement.classList.add('open')
}

function callLimitModale() {
  limitModaleElement.classList.add('open')
}

let draggetTodo = null

function dragStart(event) {
    if (event.target.classList.contains('todo__card')) {
      draggetTodo = event.target
      setTimeout(() => {
        draggetTodo.style.display = 'none'
      }, 0)
  }
}

function dragOver(event) {
  event.preventDefault()
}

// function dragEnter(event) {
//   if (event.target.classList.contains('todo__card')) {
//     const board = todoBoardsElements.target
//   }
// }

function dragEnd(event) {
  if (event.target.classList.contains('todo__card')) {
      event.target.style.display = 'block'
  }
}

function dragLeave(event) {
  if (event.target.classList.contains('todo__card')) {
  }
}

function drop(event) {
  const elements = getItem('tasks')
  if (event.target.classList.contains('container')) {
    event.target.style.display = 'block'
    const category = event.target.getAttribute('category')
    const progress = elements.filter((el) => el.category === 'progress')
    if (category === 'progress' && progress.length > 5) {
      callLimitModale()
    } else {
      const todos = elements.map((el) => {
        if (el.id === parseInt(draggetTodo.id)) {
          return {...el, category}
        }
        return el
      })
      event.target.append(draggetTodo)
      draggetTodo = null
      setItem('tasks', todos)
      render()
    }
  }
}

export {
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
  counter,
  modifyCard,
  addDocumentClick,
  dragStart,
  dragEnd,
  // dragEnter,
  dragLeave,
  drop,
  dragOver
}
