(function() {
  'use strict';

  let headerButton = document.querySelector('.header-button'),
    toDoStart = document.querySelector('.todo:not(.todo-completed)'),
    toDoCompleted = document.querySelector('.todo-completed'),
    headerInput = document.querySelector('.header-input'),
    buttonsRemove = document.querySelectorAll('.todo-remove'),
    buttonsComplete = document.querySelectorAll('.todo-complete');

  let toDo = {
    itemCopy: {},
    addItem: function(event) {
      event.preventDefault();

      let clone = this.cloneItem(headerInput.value);
      this.setButtonsListener(clone);

      toDoStart.appendChild(clone);
    },
    cloneItem: function(value) {
      let clone = this.itemCopy.cloneNode(true);
      clone.prepend(value);

      return clone;
    },
    createEmptyItem: function() {
      this.itemCopy = document.createElement('li');
      this.itemCopy.classList.add('todo-item');

      let buttons = document.createElement('div');
      buttons.classList.add('todo-buttons');

      let todoRemove = document.createElement('button');
      todoRemove.classList.add('todo-remove');

      let todoComplete = document.createElement('button');
      todoComplete.classList.add('todo-complete');

      buttons.appendChild(todoRemove);
      buttons.appendChild(todoComplete);

      this.itemCopy.appendChild(buttons);
    },
    removeItem: function(event) {
      event.preventDefault();

      event.target.parentNode.parentNode.remove();
    },
    completeItem: function(event) {
      event.preventDefault();

      event.target.removeEventListener('click', this.completeItem);

      toDoCompleted.appendChild(event.target.parentNode.parentNode);
    },
    setListener: function(parent, listener) {
      parent.forEach(function(button) {
        button.addEventListener('click', listener.bind(this));
      }, this);
    },
    setButtonsListener: function(parent) {
      let buttons = parent.getElementsByTagName('button');

      buttons[0].addEventListener('click', this.removeItem);
    }
  };

  let link = toDo;

  link.createEmptyItem();
  link.setListener(buttonsRemove, link.removeItem);
  link.setListener(buttonsComplete, link.completeItem);

  headerButton.addEventListener('click', link.addItem.bind(link));
})();