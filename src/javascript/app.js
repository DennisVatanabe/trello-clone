import {
  time,
  addCard,
  render,
  newModale,
  cancelAddTodo,
  removeTodo,
  createCard,
  hideRemoveModale,
  deleteTodo,
  changeContainer,
  showDeleteAll
} from "./functions.js"

import { buildCardTemplate } from "./templates.js"

document.addEventListener('DOMContentLoaded', function() {
  render()
})

const timeElement = document.querySelector('#currentTime')
const addCardButtonElement = document.querySelector('#todo-footer')
const newTodoElement = document.querySelector('#todo-create')
const newModaleElement = document.querySelector('#modale')
const confirmTodoElement = document.querySelector('#modale__card-confirm')
const newTodoTitleElement = document.querySelector('#titleValue')
const newTodoInnerElement = document.querySelector('#modale-textarea')
const newTodoNameElement = document.querySelector('#modale__user')
const cancelAddTodoElement = document.querySelector('#modale__card-cancel')
const removeTodoElement = document.querySelector('#todo__remove')
const newTodoCategoryElement = document.querySelector('#modale__select')
const containersElements = document.querySelectorAll('.container')
const cancelRemoveElement = document.querySelector('.cancel-remove')
const removeMadaleElement = document.querySelector('.modale__remove-wrapper')
const deleteTodoElement = document.querySelector('.confirm-remove')
const deleteAllDoneElement = document.querySelector('#done-footer')
const modaleAllElement = document.querySelector('.modale__remove-wrapper-all')
const cancelDeleteAllElement = document.querySelector('.cancel-remove-all')

document.addEventListener('change', changeContainer)
cancelDeleteAllElement.addEventListener('click', hideRemoveModale)
deleteAllDoneElement.addEventListener('click', showDeleteAll)
deleteTodoElement.addEventListener('click', deleteTodo)
cancelRemoveElement.addEventListener('click', hideRemoveModale)
cancelAddTodoElement.addEventListener('click', cancelAddTodo)
addCardButtonElement.addEventListener('click', newModale)
confirmTodoElement.addEventListener('click', createCard)

export {
  timeElement,
  addCardButtonElement,
  newTodoElement,
  newModaleElement,
  confirmTodoElement,
  newTodoTitleElement,
  newTodoInnerElement,
  newTodoNameElement,
  cancelAddTodoElement,
  removeTodoElement,
  newTodoCategoryElement,
  containersElements,
  cancelRemoveElement,
  removeMadaleElement,
  deleteAllDoneElement,
  modaleAllElement,
  cancelDeleteAllElement
}
