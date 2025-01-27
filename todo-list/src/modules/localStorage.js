import { todoObject } from "../features/todo/todoObject"
import { projectObject } from "../features/project/projectObject";

const localStorageManager = (() => {

    /* Finish localStorage accessibility */

    var projects = [];
    var todos = [];
    var localStorage = {};

    // Add a valid type of array to localStorage
    function addToLocalStorage(arrayName, item) {
        let array;
        if (arrayName === "todos") {
            array = todos; // Reference the module's todos array
        } else if (arrayName === "projects") {
            array = projects; // Reference the module's projects array
        } else {
            console.error(`Array ${arrayName} does not exist.`);
            return;
        }

        // Validate the type of item
        if (arrayName === "todos" && !(item instanceof todoObject)) {
            console.error("Invalid object: Must be an instance of todoObject.");
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

    // Load localStorage data
    function loadLocalStorage() {
        if (isStorageAvailable("localStorage")) {
            localStorage = window["localStorage"];
            console.log("Local storage is available.");
    
            // Load todos from localStorage
            const todosData = localStorage.getItem("todos");
            if (todosData) {
                todos = JSON.parse(todosData).map((item) => 
                    new todoObject(
                        item.id,
                        item.name, 
                        item.desc, 
                        item.dueDate, 
                        item.priority, 
                        item.notes
                    )
                );
                // console.log("Loaded todos:", todosData);
            }
             // Load projects from localStorage
            const projectsData = localStorage.getItem("projects");
            if (projectsData) {
                projects = JSON.parse(projectsData).map((item) => {
                    const projectTodos = item.todos.map((todo) => 
                        new todoObject(
                            todo.id,
                            todo.name, 
                            todo.desc, 
                            todo.dueDate, 
                            todo.priority, 
                            todo.notes
                        )
                    );
                    return new projectObject(item.name, item.desc, projectTodos, item.dueDate);
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

    // Gets the todos in the file
    function getTodos() {
        return todos;
    }
    
    // Dev Tools
    function deleteLocalStorage() {
        localStorage.clear();
    }

    function logLocalStorageItems() {
        if (localStorage.length === 0) {
            console.log("LocalStorage is empty.");
            return;
        }

        console.log("Contents of LocalStorage:");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`Key: ${key}, Value: ${value}`);
        }
    }
    
    return {
        addToLocalStorage,
        loadLocalStorage,
        removeLocalStorageEntry,
        updateLocalStorageTodoEntry,
        deleteLocalStorage,
        logLocalStorageItems,
        getTodos,
    };


})();

export default localStorageManager;