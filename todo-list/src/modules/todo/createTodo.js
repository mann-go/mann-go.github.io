export default function createTodo(title, desc, dueDate, prority, notes) {

    const todoItem = { title, desc, dueDate, prority, notes };

    const gridContainer = document.getElementById('grid-container');
    
    const gridItem = document.createElement('div');
    gridItem.className = "grid-item";

    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';

    /* TODO HEADER */

    const todoHeaderDiv = document.createElement('div');
    todoHeaderDiv.className = 'todo-header';

    const todoTitle = document.createElement('h2');
    todoTitle.id = "title";
    todoTitle.textContent = todoItem.title; 

    /* TODO ICONS */ 
    const todoIcons = document.createElement('div');
    todoIcons.className = "todo-icons"

    /* Edit */
    const buttonEdit = document.createElement('button');
    buttonEdit.classList = "todo-button";
    buttonEdit.id = 'editTodoButton';

    const editSpan = document.createElement('span');
    const editIcon = document.createElement('i');
    editIcon.className = 'bx bx-edit';

    editSpan.appendChild(editIcon);
    buttonEdit.appendChild(editSpan);

    /* Change status */
    const buttonStatus = document.createElement('button');
    buttonStatus.classList = "todo-button";
    buttonStatus.id = 'todoStatusButton';

    const statusSpan = document.createElement('span');
    const statusIcon = document.createElement('i');
    statusIcon.className = 'bx bx-check';

    statusSpan.appendChild(statusIcon);
    buttonStatus.appendChild(statusSpan);

    /* Delete */   
    const buttonDelete = document.createElement('button');
    buttonDelete.classList = "todo-button";
    buttonDelete.id = 'deleteTodoButton';

    const deleteSpan = document.createElement('span');
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bx bx-trash';

    deleteSpan.appendChild(deleteIcon);
    buttonDelete.appendChild(deleteSpan);

    /* Add to todo-icons div */
    todoIcons.appendChild(buttonEdit);
    todoIcons.appendChild(buttonStatus);
    todoIcons.appendChild(buttonDelete);

    /* Add to header */
    todoHeaderDiv.appendChild(todoTitle);
    todoHeaderDiv.appendChild(todoIcons);
    
    /* TODO BODY */

    const todoBodyDiv = document.createElement('div');
    todoBodyDiv.className = 'todo-body';

    for (const [key, value] of Object.entries(todoItem)) {
        if (key !== 'title') {
            console.log('Key: ' + key);
            console.log("Adding " + value);
            let todoBodyItem = document.createElement('p');
            todoBodyItem.textContent = value;
            todoBodyItem.id = key;
            todoBodyDiv.appendChild(todoBodyItem);
        }
    }

    /* ADD ITEMS TO TODO DIV */
    todoDiv.appendChild(todoHeaderDiv);
    todoDiv.appendChild(todoBodyDiv);
    
    gridItem.appendChild(todoDiv);
    gridContainer.appendChild(gridItem);

    return;

}