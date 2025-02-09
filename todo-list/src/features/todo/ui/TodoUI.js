import { attachListeners } from './TodoListeners';
import { createTodoElement } from "./TodoRenderer";

export function renderTodos(todos) {
    todos.forEach(todo => {
        console.log("Adding: " + todo.name);
        createTodoElement(todo);
    });
    
    attachListeners();
}

export function extractTodoForm() {
    const name = document.getElementById('todo-name').value;
    const description = document.getElementById('todo-description').value;
    const dueDate = document.getElementById('todo-due').value;
    const priority = document.getElementById('todo-priority').value;
    const notes = document.getElementById('todo-notes').value;

    const todoInfo = { name, description, dueDate, priority, notes };

    return todoInfo; 
}    

export function extractTodoEditForm() {
    const id = document.getElementById('edit-todo-id').value;
    const name = document.getElementById('edit-todo-name').value;
    const description = document.getElementById('edit-todo-description').value;
    const dueDate = document.getElementById('edit-todo-due').value;
    const priority = document.getElementById('edit-todo-priority').value;
    const notes = document.getElementById('edit-todo-notes').value;

    const editTodoInfo = { id, name, description, dueDate, priority, notes };

    return editTodoInfo; 
}    

export function extractTodoData(todoId, todoDiv) {
    return {
        id: todoId,
        name: todoDiv.querySelector('#name').textContent,
        description: todoDiv.querySelector('#description').textContent,
        dueDate: todoDiv.querySelector('#dueDate').textContent,
        priority: todoDiv.querySelector('#priority').textContent,
        notes: todoDiv.querySelector('#notes').textContent
    };
}

// Populates the form with the data of the todo the user is trying to update
export function populateForm(todoData) {
    // console.log("Populate form with:", todoData);
    document.getElementById('edit-todo-id').textContent = todoData.id,
    document.getElementById('edit-todo-name').value = todoData.name;
    document.getElementById('edit-todo-description').value = todoData.description;
    document.getElementById('edit-todo-due').value = todoData.dueDate;
    document.getElementById('edit-todo-priority').value = todoData.priority;
    document.getElementById('edit-todo-notes').value = todoData.notes;
}

// Updates the todo that the user is trying to update
export function saveTodo() {
    const updatedData = {
        id: document.getElementById('edit-todo-id').textContent,
        name: document.getElementById('edit-todo-name').value,
        description: document.getElementById('edit-todo-description').value,
        dueDate: document.getElementById('edit-todo-due').value,
        priority: document.getElementById('edit-todo-priority').value,
        notes: document.getElementById('edit-todo-notes').value,
    };

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    let projectIndex = projects.findIndex(p => p.todos && p.todos.some(todo => todo.id === updatedData.id));

    if (projectIndex !== -1) {
        projects[projectIndex].todos = projects[projectIndex].todos.map(todo => 
            todo.id === updatedData.id ? { ...todo, ...updatedData } : todo
        );
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    updateTodoUI(updatedData);
    // return updatedData;
}

function updateTodoUI(updatedData) {
    const editedTodoDiv = document.querySelector(`[data-id="${updatedData.id}"]`);
    if (editedTodoDiv) {
        editedTodoDiv.querySelector('#name').textContent = updatedData.name;
        editedTodoDiv.querySelector('#description').textContent = updatedData.description;
        editedTodoDiv.querySelector('#dueDate').textContent = updatedData.dueDate;
        editedTodoDiv.querySelector('#priority').textContent = updatedData.priority;
        editedTodoDiv.querySelector('#notes').textContent = updatedData.notes;
        console.log("updated successfully");
        return;
    }

    console.error("Todo with id " + updatedData.id + " not found.");
}