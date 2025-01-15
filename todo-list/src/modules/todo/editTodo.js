import { openEditTodoModal } from "../modal/modalManager";

function extractTodoData(todoDiv) {
    return {
        title: todoDiv.querySelector('#title').textContent,
        description: todoDiv.querySelector('#desc').textContent,
        dueDate: todoDiv.querySelector('#dueDate').textContent,
        priority: todoDiv.querySelector('#priority').textContent,
        notes: todoDiv.querySelector('#notes').textContent
    };
}

function populateForm(todoData) {
    document.getElementById('edit-todo-name').value = todoData.title;
    document.getElementById('edit-todo-desc').value = todoData.description;
    document.getElementById('edit-todo-due').value = todoData.dueDate;
    document.getElementById('edit-todo-priority').value = todoData.priority;
    document.getElementById('edit-todo-notes').value = todoData.notes;
}

function saveTodo(todoDiv) {
    const updatedData = {
        title: document.getElementById('edit-todo-name').value,
        description: document.getElementById('edit-todo-desc').value,
        dueDate: document.getElementById('edit-todo-due').value,
        priority: document.getElementById('edit-todo-priority').value,
        notes: document.getElementById('edit-todo-notes').value
    };

    // Update todo
    todoDiv.querySelector('#title').textContent = updatedData.title;
    todoDiv.querySelector('#desc').textContent = updatedData.description;
    todoDiv.querySelector('#dueDate').textContent = updatedData.dueDate;
    todoDiv.querySelector('#priority').textContent = updatedData.priority;
    todoDiv.querySelector('#notes').textContent = updatedData.notes;
}

export default function editTodoHandler(todoDiv) {
    const todoData = extractTodoData(todoDiv);
    populateForm(todoData);
    openEditTodoModal(() => {
        saveTodo(todoDiv);
    });
}