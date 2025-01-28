import localStorageManager from "../../modules/localStorage";

const TodoManager = (() => {
    function saveTodos(todosArray) {
        console.log(todosArray);
        localStorageManager.addToLocalStorage("todos", todosArray);
    }

    function addTodo(newTodo) {
        saveTodos(newTodo);
    }

    function getTodos() {
        return localStorageManager.getTodos();
    }

    return {
        addTodo,
        getTodos,
    };
})();

export default TodoManager;