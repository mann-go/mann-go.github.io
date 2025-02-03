import "./styles.css";
import { updateProjectList } from "./features/project/projectUI.js";
import { attachListeners } from "./features/todo/ui/TodoListeners.js";
import { attachProjectUIListeners } from "./features/project/projectUI.js";
import localStorageManager from "./modules/localStorage.js";
import setupEventListeners from "./modules/eventListeners.js";

import TodoManager from "./features/todo/todoManager.js";
import { renderTodos } from "./features/todo/ui/TodoUI.js";
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
    localStorageManager.removeLocalStorageEntry("projects", "Project with todos");  
    
    // createNewProject(
    //     null,
    //     "Project with todos",
    //     "description",
    //     "09/02/25",
    //     [
    //         new todoObject(
    //             null,
    //             "todo something",
    //             "Some description",
    //             "Some due date",
    //             "Some priority",
    //             "Some notes"
    //         ),
    //             new todoObject(
    //             null,
    //             "todo something 2",
    //             "Some description 2",
    //             "Some due date 2",
    //             "Some priority 2",
    //             "Some notes 2"
    //         ),
    //             new todoObject(
    //             null,
    //             "todo something 3",
    //             "Some description 3",
    //             "Some due date 3",
    //             "Some priority 3",
    //             "Some notes 3"
    //         )
    //     ]
    // );
})

/* DEV TOOLS */
const logLocalStorage = document.getElementById('log-local-storage');
logLocalStorage.addEventListener("click", localStorageManager.logLocalStorageItems);

const deleteLocalStorage = document.getElementById('delete-local-storage');
deleteLocalStorage.addEventListener("click", localStorageManager.deleteLocalStorage);