export function createTodoElement(todoObject) {
    const template = document.getElementById('todo-template');
    const gridContainer = document.getElementById('grid-container');

    // Clone template content
    const todoElement = template.content.cloneNode(true);
    const todoDiv = todoElement.querySelector(".todo"); 
    todoDiv.setAttribute('data-id', todoObject.id);

    // Populate todo name
    const name = todoDiv.querySelector('#name');
    name.textContent = todoObject.name;

    // Populate todo body
    const todoBody = todoDiv.querySelector('.todo-body');
    for (const [key, value] of Object.entries(todoObject)) {
        if (key !== "name" && key !== "id" && key !== "completed") {
            if (value === null) {
                console.log("Would be empty");
                const element = document.createElement('p');
                element.textContent = "No", key;
            }

            const label = document.createElement('label');
            label.id = key + "-label";
            label.setAttribute("for", key);
            label.textContent =  key.toLocaleUpperCase();

            const todoBodyItem = document.createElement('p');
            todoBodyItem.id = key;
            todoBodyItem.textContent = value;
            todoBody.appendChild(label);
            todoBody.appendChild(todoBodyItem);
        }
    }
    const isCompleted = todoObject.completed !== undefined ? todoObject.completed : false;
    isCompleted ? todoDiv.classList.add('todo-done') : todoDiv.classList.remove('todo-done');

    // Append todo to grid container
    gridContainer.appendChild(todoElement);
}
