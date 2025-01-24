import localStorageManager from "../../modules/localStorage";

const TodoManager = (() => {

    function loadTodos() {
        todosArray.length = 0;

        const todosData = localStorage.getItem("todos");
        if (todosData) {
            const parsedData = JSON.parse(todosData);
            parsedData.forEach((todo) => todosArray.push(todo));
            console.log("Loaded todos: ", todosArray);
        }
    }

    function saveTodos() {
        localStorage.addToLocalStorage("todos", todosArray);
    }

    function addTodo(newTodo) {
        localStorageManager.addToLocalStorage('todos', newTodo);
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