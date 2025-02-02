import { loadProjectById } from "./projectManager";
import { createProjectElement } from "./projectRenderer";

const eventHandlers = [
        { selector: '#project', action: 'click', handler: handleLoadingProject }
]

export function attachProjectUIListeners() {
    eventHandlers.forEach(({ selector, action, handler }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach((element) => {
                // console.log("Adding event listener:", element);
                element.addEventListener(action, (e) => {
                    handler(e);
                });
            })
        }
    })
}

function handleLoadingProject(e) {
    console.log("I've been clicked");
    // console.log(e.currentTarget.dataset.id);
    const projectId = e.currentTarget.dataset.id;
    loadProjectById(projectId);
}

export function updateProjectList() {
    // console.log("UPDATING PROJECT LIST:");
    const projectList = document.getElementById('grid-container-modal');
    projectList.innerHTML = "";

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach(project => {
       createProjectElement(project); // Create DOM element
    });
}

export function extractNewProjectForm() {
    const name = document.getElementById('project-name-input').value;
    const desc = document.getElementById('project-desc-input').value;
    const dueDate = document.getElementById('project-dueDate-input').value;

    const projectInfo = { name, desc, dueDate };
    return projectInfo;
}