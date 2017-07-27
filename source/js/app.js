const todoForm = document.getElementById('todo-form'),
      addInput = document.getElementById('add-input'),
      todoList = document.getElementById('todo-list'),
      todoItems = document.querySelectorAll('.todo-item');

      function createTodoItem(title) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        const label = document.createElement('label');
        label.innerText = title;
        label.className = 'title';

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'textfield';

        const editButtom = document.createElement('button');
        editButtom.innerText = 'Изменить';
        editButtom.className = 'edit';

        const deleteButtom = document.createElement('button');
        deleteButtom.innerText = 'Удалить';
        deleteButtom.className = 'delete';

        const listItem = document.createElement('li');
        listItem.className = 'todo-item';

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButtom);
        listItem.appendChild(deleteButtom);

        bindEvents(listItem);

        return listItem;
      }

      function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButtom = todoItem.querySelector('button.edit');
        const deleteButtom = todoItem.querySelector('button.delete');

        checkbox.addEventListener('change', toggleTodoItem);
        editButtom.addEventListener('click', editTodoItem);
        deleteButtom.addEventListener('click', deleteTodoItem);
      }

      function addTodoItem(e) {
        e.preventDefault();

        if (addInput.value === '') return alert('Введите название задачи');

        const todoItem = createTodoItem(addInput.value)
        todoList.appendChild(todoItem);
        addInput.value = '';
      }

      function toggleTodoItem({ target })  {
        const listItem = this.parentNode;
        listItem.classList.toggle('completed')
      }

      function editTodoItem() {
        const listItem = this.parentNode;
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
          title.innerText = editInput.value;
          this.innerText = 'Изменить';
        } else {
          editInput.value = title.innerText;
          this.innerText = 'Сохранить';
        }

        listItem.classList.toggle('editing');
      }

      function deleteTodoItem() {
        const listItem = this.parentNode;
        todoList.removeChild(listItem);
      }

// call app
      (function main() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach(item => bindEvents(item));
      })();
