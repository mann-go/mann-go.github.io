import "./styles.css";
import { loadLastProject, updateProjectList } from "./features/project/projectUI.js";
import { attachListeners } from "./features/todo/ui/TodoListeners.js";
import localStorageManager from "./modules/localStorage.js";
import setupEventListeners from "./modules/eventListeners.js";

// TODO: Fix loading last project
document.addEventListener("DOMContentLoaded", () => {
    // STORAGE
    localStorageManager.loadLocalStorage();

    // Init project list
    updateProjectList();
    // loadLastProject();
    
    // LISTENERS 
    attachListeners();
    setupEventListeners();    
});

/* DEV TOOLS */
const logLocalStorage = document.getElementById('log-local-storage');
logLocalStorage.addEventListener("click", localStorageManager.logLocalStorageItems);

const deleteLocalStorage = document.getElementById('delete-local-storage');
deleteLocalStorage.addEventListener("click", localStorageManager.deleteLocalStorage);