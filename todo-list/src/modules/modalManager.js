/* NEW TODO FUNCTIONS */

export function openTodoModal() {
    const modal = document.getElementById('todo-add-modal');
    modal.style.display = 'block';
}

export function closeTodoModal() {
    const modal = document.getElementById('todo-add-modal');
    modal.style.display = 'none';
}

export function resetTodoModal() {
    document.getElementById('todo-add-form').reset();
}

/* EDIT TODO FUNCTIONS */
export function openEditTodoModal(saveCallback) {
    const modal = document.getElementById('todo-edit-modal');
    modal.style.display = 'block';

    const saveButton = document.getElementById('saveTodoButton');
    saveButton.onclick = () => {
        saveCallback();
        modal.style.display = 'none';
    }
}

export function closeEditTodoModal() {
    const modal = document.getElementById('todo-edit-modal');
    modal.style.display = 'none';
}

export function resetEditTodoModal() {
    document.getElementById('todo-edit-form').reset();
}