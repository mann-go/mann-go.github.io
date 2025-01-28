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
    const desc = document.getElementById('todo-desc').value;
    const dueDate = document.getElementById('todo-due').value;
    const priority = document.getElementById('todo-priority').value;
    const notes = document.getElementById('todo-notes').value;

    const todoInfo = { name, desc, dueDate, priority, notes };

    return todoInfo; 
}    

export function extractTodoData(todoDiv) {
    return {
        name: todoDiv.querySelector('#name').textContent,
        description: todoDiv.querySelector('#desc').textContent,
        dueDate: todoDiv.querySelector('#dueDate').textContent,
        priority: todoDiv.querySelector('#priority').textContent,
        notes: todoDiv.querySelector('#notes').textContent
    };
}

// Populates the form with the data of the todo the user is trying to update
export function populateForm(todoData) {
    document.getElementById('edit-todo-name').value = todoData.name;
    document.getElementById('edit-todo-desc').value = todoData.description;
    document.getElementById('edit-todo-due').value = todoData.dueDate;
    document.getElementById('edit-todo-priority').value = todoData.priority;
    document.getElementById('edit-todo-notes').value = todoData.notes;
}

// Updates the todo that the user is trying to update
export function saveTodo(todoDiv) {
    const updatedData = {
        id: todoDiv.dataset.id,
        name: document.getElementById('edit-todo-name').value,
        description: document.getElementById('edit-todo-desc').value,
        dueDate: document.getElementById('edit-todo-due').value,
        priority: document.getElementById('edit-todo-priority').value,
        notes: document.getElementById('edit-todo-notes').value
    };

    // Update todo
    todoDiv.querySelector('#name').textContent = updatedData.name;
    todoDiv.querySelector('#desc').textContent = updatedData.description;
    todoDiv.querySelector('#dueDate').textContent = updatedData.dueDate;
    todoDiv.querySelector('#priority').textContent = updatedData.priority;
    todoDiv.querySelector('#notes').textContent = updatedData.notes;

    return updatedData;
}