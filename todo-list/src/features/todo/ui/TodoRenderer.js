export function createTodoElement(todoObject) {
    const template = document.getElementById('todo-template');
    const gridContainer = document.getElementById('grid-container');

    // Clone template content
    const todoElement = template.content.cloneNode(true);
    todoElement.querySelector("div").setAttribute('data-id', todoObject.id);
    console.log(todoObject.id);
    // todoElement.dataset.id = todoObject.id;
    // todoElement.setAttribute('dataset-id', todoObject.id);

    // Populate todo title
    const title = todoElement.getElementById('title');
    title.textContent = todoObject.name;

    // Populate todo body
    const todoBody = todoElement.querySelector('.todo-body');
    for (const [key, value] of Object.entries(todoObject)) {
        if (key !== "name" && key !== "id") {
            const todoBodyItem = document.createElement('p');
            todoBodyItem.id = key;
            todoBodyItem.textContent = value;
            todoBody.appendChild(todoBodyItem);
        }
    }

    // Append todo to grid container
    gridContainer.appendChild(todoElement);
}
