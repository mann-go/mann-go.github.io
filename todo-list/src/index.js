import "./styles.css";
import { updateProjectList } from "./features/project/projectUI.js";
import { attachListeners } from "./features/todo/ui/TodoListeners.js";
import localStorageManager from "./modules/localStorage.js";
import setupEventListeners from "./modules/eventListeners.js";
import { loadProjectNextDue } from "./features/project/projectManager.js";
import { attachTodaysDateToDateTimeInputs } from "./modules/datetimeHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    // STORAGE
    localStorageManager.loadLocalStorage();

    // Init project list
    updateProjectList();
    loadProjectNextDue();
    
    // LISTENERS 
    attachListeners();
    setupEventListeners();    
    attachTodaysDateToDateTimeInputs();
});
