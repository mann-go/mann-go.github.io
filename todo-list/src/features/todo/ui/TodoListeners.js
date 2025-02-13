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
                if (element.dataset.listener === "true") return;

                element.addEventListener(action, (e) => handler(e.target.closest('.todo')));
                element.dataset.listener = "true";
            });
        } else {
            console.warn(`No elements found for selector: ${selector}`);
        }
    });
}
