import localStorageManager from "../../modules/localStorage";

const TodoManager = (() => {

    function loadTodos(todosArray) {
        // let todosArray.length = 0;

        const todosData = localStorage.getItem("todos");
        if (todosData) {
            const parsedData = JSON.parse(todosData);
            parsedData.forEach((todo) => todosArray.push(todo));
            console.log("Loaded todos: ", todosArray);
        }
    }

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