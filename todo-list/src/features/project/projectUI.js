import { openNewProjectModal, closeNewProjectModal, openExistingProjectsModal, toggleModal } from "../../modules/modalManager";
import { createProjectElement } from "./projectRenderer";
import { createNewProject } from "./projectManager";

const eventHandlers = [
        { selector: '#create-project-btn', action: 'click', handler: handleNewProject },
        { selector: '#my-projects', action: 'click', handler: loadProjectList },
        { selector: '#project', action: 'click', handler: handleLoadingProject }
        // { selector: ''}

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

function handleNewProject(e) {
    console.log("Open modal:");
    toggleModal('new-project-modal', (e) => {
        console.log(e);
        e.preventDefault();
        const projectInfo = extractNewProjectForm();
        createNewProject(projectInfo);
        updateProjectList();
        alert("Project created successfully");
    })
}

function handleLoadingProject(e) {
    console.log(e);
}

function loadProjectList() {
    toggleModal('select-project-modal');
    updateProjectList();
}

function updateProjectList() {
    console.log("UPDATING PROJECT LIST:");
    const projectList = document.getElementById('grid-container-modal');
    projectList.innerHTML = "";

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.forEach(project => [
        createProjectElement(project)
    ]);

}

function extractNewProjectForm() {
    const name = document.getElementById('project-name').value;
    const desc = document.getElementById('project-desc').value;
    const dueDate = document.getElementById('project-dueDate').value;

    const projectInfo = { name, desc, dueDate };
    return projectInfo;
}