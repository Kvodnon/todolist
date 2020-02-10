(function() {
  'use strict';

  let headerButton = document.querySelector('.header-button'),
    toDoStart = document.querySelector('.todo:not(.todo-completed)'),
    toDoCompleted = document.querySelector('.todo-completed'),
    headerInput = document.querySelector('.header-input');

  let toDo = {
    itemCopy: {},
    completeLink: {},
    storageStart: [],
    storageComplete: [],
    addItem: function(event) {
      event.preventDefault();

      let clone = this.cloneItem(headerInput.value);
      this.setButtonsListener(clone);

      toDoStart.appendChild(clone);

      this.storageStart.push(headerInput.value);
      this.updateStorage('start', this.storageStart);

      headerInput.value = '';
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

      let item = event.target.parentNode.parentNode;
      let toDo = item.parentNode;
      let children = toDo.children;

      children = Array.from(children);
      
      if (toDo.classList.contains('todo-completed')) {
        this.storageComplete.splice(children.indexOf(item), 1);
        this.updateStorage('complete', this.storageComplete);
      } else {
        this.storageStart.splice(children.indexOf(item), 1);
        this.updateStorage('start', this.storageStart);
      }

      event.target.parentNode.parentNode.remove();
    },
    completeItem: function(event) {
      event.preventDefault();

      let item = event.target.parentNode.parentNode;
      let todoComplete = item.parentNode;

      event.target.removeEventListener('click', this.completeLink);

      let children = Array.from(toDoStart.children);
      this.storageStart.splice(children.indexOf(item), 1);

      toDoCompleted.appendChild(item);

      this.storageComplete.push(item.textContent);

      this.updateStorage('complete', this.storageComplete);
      this.updateStorage('start', this.storageStart);
    },
    setListener: function(parent, listener) {      
      parent.forEach(function(button) {
        button.addEventListener('click', listener);
      });
    },
    setButtonsListener: function(parent) {
      const buttons = parent.getElementsByTagName('button');

      buttons[0].addEventListener('click', this.removeItem.bind(this));
      buttons[1].addEventListener('click', this.completeLink);
    },
    getStorage: function() {
      if (localStorage.start) {
        this.storageStart = localStorage.start.split(',');
        this.addFromStorage(toDoStart, this.storageStart);
      }

      if (localStorage.complete) {
        this.storageComplete = localStorage.complete.split(',');
        this.addFromStorage(toDoCompleted, this.storageComplete);
      }
    },
    updateStorage: function(key, storage) {
      localStorage[key] = storage;
    },
    removeItems: function() {
      let items = document.querySelectorAll('.todo-item');

      items.forEach(function(item) {
        item.remove();
      });
    },
    addFromStorage: function(parent, storage) {
      storage.forEach(function(value) {
        let clone = this.cloneItem(value);
        parent.appendChild(clone);
      }, this);
    }
  };

  let link = toDo;

  link.createEmptyItem();
  link.removeItems();
  link.getStorage();

  link.completeLink = link.completeItem.bind(link);

  let buttonsRemove = document.querySelectorAll('.todo-remove'),
    buttonsComplete = toDoStart.querySelectorAll('.todo-complete');

  link.setListener(buttonsRemove, link.removeItem.bind(link));
  link.setListener(buttonsComplete, link.completeLink);

  headerButton.addEventListener('click', link.addItem.bind(link));

  headerButton.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && headerInput.hasFocus()) {
      event.preventDefault();
      headerButton.click();
    }
  });
})();