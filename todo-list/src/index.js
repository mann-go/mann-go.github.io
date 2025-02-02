import "./styles.css";
import { updateProjectList } from "./features/project/projectUI.js";
import { attachListeners } from "./features/todo/ui/TodoListeners.js";
import { attachProjectUIListeners } from "./features/project/projectUI.js";
import localStorageManager from "./modules/localStorage.js";
import setupEventListeners from "./modules/eventListeners.js";

import { createNewProject } from "./features/project/projectManager.js";
import { todoObject } from "./features/todo/todoObject.js";

document.addEventListener("DOMContentLoaded", () => {
    // STORAGE
    localStorageManager.loadLocalStorage();

    // UI
    // const todos = TodoManager.getTodos();
    // console.log("TODOS ON LOAD:", todos);
    // renderTodos(todos);

    // Init project list
    updateProjectList();
    
    // LISTENERS 
    attachListeners();
    attachProjectUIListeners();
    setupEventListeners();

    createNewProject(
        null,
        "Project with todos",
        "description",
        "09/02/25",
        [
            new todoObject(
                null,
                "todo something",
                "Some description",
                "Some due date",
                "Some priority",
                "Some notes"
            )
        ]
    );
    
})

/* DEV TOOLS */
const logLocalStorage = document.getElementById('log-local-storage');
logLocalStorage.addEventListener("click", localStorageManager.logLocalStorageItems);

const deleteLocalStorage = document.getElementById('delete-local-storage');
deleteLocalStorage.addEventListener("click", localStorageManager.deleteLocalStorage);