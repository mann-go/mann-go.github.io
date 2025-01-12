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
    todoTitle.textContent = todoItem.title; 

    todoHeaderDiv.appendChild(todoTitle);
    
    /* TODO BODY */

    const todoBodyDiv = document.createElement('div');
    todoBodyDiv.className = 'todo-body';

    for (const [key, value] of Object.entries(todoItem)) {
        if (key !== 'title') {
            console.log("Adding " + value);
            let todoBodyItem = document.createElement('p');
            todoBodyItem.textContent = value;
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