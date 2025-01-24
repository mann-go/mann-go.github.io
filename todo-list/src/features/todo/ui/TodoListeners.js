import { handleEditTodo, handleChangeTodoStatus, handleDeleteTodo } from '../todoActions';

const eventHandlers = [
    { selector: '#editTodoButton', action: 'click', handler: handleEditTodo },
    { selector: '#todoStatusButton', action: 'click', handler: handleChangeTodoStatus },
    { selector: '#deleteTodoButton', action: 'click', handler: handleDeleteTodo },
]

export function attachListeners() {
    eventHandlers.forEach(({ selector, action, handler }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach((element) => {
                element.addEventListener(action, (e) => handler(e.target.closest('.todo')));
            });
        } else {
            console.warn(`No elements found for selector: ${selector}`);
        }
    });
}
