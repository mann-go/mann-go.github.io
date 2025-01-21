const localStorageManager = (() => {

    /* Finish localStorage accessibility */

    var projects = [];
    var todos = [];
    var localStorage = null;

    /* When clicking myProjects, should this file get the project array and set main? */
    function addToLocalStorage(array, key, value) {
        key = array.length;
        // array.push(array.length, value);
        console.log(array, key, value);
        localStorage.setItem(localStorage.length, array);
        return;
    }
    
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
            localStorage = window["localStorage"];
            console.log("Local storage is available.");
        } else {
            console.log("Local storage is not available.");
        }
    }

    function deleteLocalStorage() {
        localStorage.clear();
    }
    
    return {
        addToLocalStorage,
        loadLocalStorage
    };


})();

export default localStorageManager;