export default function extractTodoForm() {
    const todoName = document.getElementById('todo-name').value;
    const todoDesc = document.getElementById('todo-desc').value;
    const todoDueDate = document.getElementById('todo-due').value;
    const todoPriority = document.getElementById('todo-priority').value;
    const todoNotes = document.getElementById('todo-notes').value;

    const todoInfo = { todoName, todoDesc, todoDueDate, todoPriority, todoNotes };

    return todoInfo; 
}