import { todoObject } from "../features/todo/todoObject"
import { projectObject } from "../features/project/projectObject";

const localStorageManager = (() => {

    var projects = [];

    // Add a valid type of array to localStorage
    function addToLocalStorage(arrayName, item) {
        let array;
        if (arrayName === "projects") {
            array = projects; // Reference the module's todos array
        } else {
            console.error(`Array ${arrayName} does not exist.`);
            return;
        }

        if (arrayName === "projects" && !(item instanceof projectObject)) {
            console.error("Invalid object: Must be an instance of projectObject.");
            return;
        }

        array.push(item);

        if (localStorage) {
            const serialisedArray = array.map((entry) => 
                arrayName === "projects" ? entry.getProject() : entry.getTodo()
            );
            localStorage.setItem(arrayName, JSON.stringify(serialisedArray));
            console.log("Saving to localStorage:", arrayName, array);

        }
    }
 
    // Check if localStorage is available
    function isStorageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x  = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === "QuotaExceededError" &&
                storage &&
                storage.length !== 0
            );
        }
    }

    function loadLocalStorage() {
        if (isStorageAvailable("localStorage")) {
            const projectsData = localStorage.getItem("projects");
            if (projectsData) {
                projects = JSON.parse(projectsData).map((item) => {
                    const projectTodos = item.todos.map((todo) => 
                        new todoObject(
                            todo.id,
                            todo.name, 
                            todo.description, 
                            todo.dueDate, 
                            todo.priority, 
                            todo.notes
                        )
                    );
                    return new projectObject(item.id, item.name, item.description, item.dueDate, projectTodos);
                });
                console.log("Loaded projects:", projects);
            }
            
        } else {
            console.log("Local storage is not available.");
        }
    }

    function removeLocalStorageEntry(arrayKey, valueId) {

        // Get the array from localStorage
        const arrayFromStorage = JSON.parse(localStorage.getItem(arrayKey)) || [];

        // Filter out the item with the matching id
        const updatedArray = arrayFromStorage.filter((item) => item.id !== valueId);      

        // Save the updated array back to localStorage
        localStorage.setItem(arrayKey, JSON.stringify(updatedArray));
    }

    function updateLocalStorageTodoEntry(arrayKey, updatedTodo) {
        const arrayFromStorage = JSON.parse(localStorage.getItem(arrayKey)) || [];

        // Find and update correct entry
        const updatedArray = arrayFromStorage.map((item) => 
            item.id === updatedTodo.id ? { ...item, ...updatedTodo } : item
        );

        localStorage.setItem(arrayKey, JSON.stringify(updatedArray));
    }

    return {
        addToLocalStorage,
        loadLocalStorage,
        removeLocalStorageEntry,
        updateLocalStorageTodoEntry,
    };


})();

export default localStorageManager;