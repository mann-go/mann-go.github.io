import { attachListeners } from "../todo/ui/TodoListeners";
import { createNewProject, loadProjectById } from "./projectManager";
import { createProjectElement, createProjectInstance } from "./projectRenderer";
import { deleteProjectFromLocalStorage } from "./projectActions";
import { toggleModal } from "../../modules/modalManager";

const eventHandlers = [
        { selector: '#project', action: 'click', handler: handleLoadingProject }, 
        { selector: '#deleteProjectButton', action: 'click', handler: deleteProjectFromLocalStorage }       
]

export function attachProjectUIListeners() {
    eventHandlers.forEach(({ selector, action, handler }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach((element) => {
                element.addEventListener(action, (e) => {
                    handler(e);
                });
            })
        }
    })
}

function handleLoadingProject(e) {
    const projectId = e.currentTarget.dataset.id;
    const projectObject = loadProjectById(projectId);
    createProjectInstance(projectObject);
    attachListeners();
    toggleModal('select-project-modal', false);
}

export function updateProjectList() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectList = document.getElementById('grid-container-modal');
    if (projects.length === 0) { 
        const formattedDate = new Intl.DateTimeFormat(navigator.language).format(new Date());
        createNewProject(null, "I am a test project", "Feel free to keep me or delete me!", formattedDate, []);
        return;
    }
    projectList.innerHTML = "";
    projects.forEach(project => {
        createProjectElement(project);
    });

    attachProjectUIListeners();
}

export function clearProjectDisplay() {
    document.getElementById("grid-container").innerHTML = "<p>No projects available.</p>";
    document.getElementById("project-title").textContent = "No Project Selected";
    document.getElementById("project-description").textContent = "";
    document.getElementById("project-dueDate").textContent = "";
    
    // Hide "Create Todo" button if no projects remain
    const createTodoButton = document.getElementById('main-header-actions');
    if (createTodoButton) {
        createTodoButton.style.display = "none";
    }
}

export function extractNewProjectForm() {
    const name = document.getElementById('project-name-input').value;
    const description = document.getElementById('project-description-input').value;
    const dueDate = document.getElementById('project-dueDate-input').value;

    const projectInfo = { name, description, dueDate };
    return projectInfo;
}