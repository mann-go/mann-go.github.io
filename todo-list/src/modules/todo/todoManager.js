import createTodo from './createTodo';
import editTodo from './editTodo';
import extractTodoForm from './extractTodoForm';
import deleteTodo from './deleteTodo';
import changeTodoStatus from './changeTodoStatus';

import localStorageManager from '../localStorage/localStorageManager';

const TodoManager = (() => {

    const todos = [];

    function buildTodo(todoData) {
        addTodo(todoData);

        localStorageManager.addToLocalStorage("todos", null, todoData);

        attachListener('#editTodoButton', 'click', (e) => {
            let todoEdit = e.target.closest('.todo');
            editTodo(todoEdit);
        });
    
        attachListener('#todoStatusButton', 'click', (e) => {
            let todoStatus = e.target.closest('.todo');
            changeTodoStatus(todoStatus);
        });
    
        attachListener('#deleteTodoButton', 'click', (e) => {
            let todoDelete = e.target.closest('.grid-item');
            deleteTodo(todoDelete);
        });

    }

    function addTodo(todoData) {

        const { todoName, todoDesc, todoDueDate, todoPriority, todoNotes } = todoData;
        createTodo(todoName, todoDesc, todoDueDate, todoPriority, todoNotes);
    }

    function extractInfo() {
        return extractTodoForm();
    }

    function attachListener(selector, event, handler) {
        document.querySelectorAll(selector).forEach((element) => {
            element.addEventListener(event, handler);
        });
    }

    return {
        buildTodo,
        extractInfo,
        attachListener
    };
})();

export default TodoManager;