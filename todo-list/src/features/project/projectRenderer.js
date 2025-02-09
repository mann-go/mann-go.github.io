import { attachListeners } from "../todo/ui/TodoListeners";
import { createTodoElement } from "../todo/ui/TodoRenderer";

// Used within the `My Projects` modal
export function createProjectElement(projectObject) {
    const template = document.getElementById('project-template');
    const gridContainer = document.getElementById('grid-container-modal');

    // Clone template content
    const projectTemplate = template.content.cloneNode(true);
    const projectElement = projectTemplate.querySelector('.project');

    projectElement.setAttribute('data-id', projectObject.id);

    // Populate project name
    const name = projectTemplate.getElementById('project-name');
    name.textContent = projectObject.name;

    const desc = projectTemplate.getElementById('project-description');
    desc.textContent = projectObject.desc;
    
    const dueDate = projectTemplate.getElementById('project-dueDate');
    dueDate.textContent = 'Date due:', projectObject.dueDate;

    const todoUl = projectTemplate.getElementById('todos');
    if(projectObject.todos.length !== 0) {
        projectObject.todos.forEach(todo => {
            let todoLi = document.createElement('li');
            todoLi.textContent = todo.name;
            todoUl.appendChild(todoLi);
        });
    } else {
        todoUl.textContent = "No todos to display.";
    }
    // Append project to grid container
    gridContainer.appendChild(projectTemplate);
}


export function createProjectInstance(projectObject) {
    // Reset grid container
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = "";

    // Populate project fields
    document.getElementById('project-title').textContent = projectObject.name;
    document.getElementById('project-description').textContent = projectObject.description;
    document.getElementById('project-dueDate').textContent = projectObject.dueDate;

    // Show 'create todo' button
    const createTodoButton = document.getElementById('main-header-actions');
    createTodoButton.style.display = "flex";

    if(projectObject.todos.length !== 0) {
        projectObject.todos.forEach(todo => {
            createTodoElement(todo);
        });
    } else {
        // const h2 = document.createElement('h2');
        // gridContainer.append(h2);
        // h2.textContent = "No todos to display.";
    }
}

export function reRenderProjectTodos(projectId) {
    const gridContainer = document.getElementById('grid-container');

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find(p => p.id === projectId);

    if (project) {
        // Clear existing todos
        gridContainer.innerHTML = "";

        // Rerender todos
        project.todos.forEach(todo => {
            createTodoElement(todo);
            attachListeners();
        });
    } else {
        console.error("Project not found");
    }
}