
const container = document.getElementById('tasks-container');
const addTaskButton = document.getElementById('add-task');
const submitButton = document.getElementById('submit');
const template = document.getElementById('task-template');
const remove = document.getElementsByClassName('remove');


addTaskButton.addEventListener('click', addNewTask);
submitButton.addEventListener('click', submitAll);

function addNewTask() {
    const templateClone = template.content.cloneNode(true);
    const removeBtn = templateClone.querySelector('.remove');

    removeBtn.addEventListener('click', (e) => {
        e.target.closest('.task-row').remove();
    });

    container.appendChild(templateClone);
}



async function submitAll() {
    const rows = Array.from(container.querySelectorAll('.task-row'));
    const tasks = [];

    rows.forEach(row => {
        const task = {
            title: row.querySelector('.title').value.trim(),
            description: row.querySelector('.description').value.trim(),
            priority: row.querySelector('.priority').value,
            due_date: row.querySelector('.due_date').value || null,
            completed: row.querySelector('.completed').checked,
        };
        if (task.title) tasks.push(task);
    });

    if (tasks.length === 0) {

        Toastify({
            text: "Please add at least one task with a title.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            stopOnFocus: true,
            close: true,
        }).showToast();
        return;
    }

    try {

        fetch('http://localhost:8000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tasks }),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).then(data => {

            if (data.status === 'success') {
                Toastify({
                    text: data.message || "Tasks submitted successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    stopOnFocus: true,
                    close: true,
                }).showToast();

                container.innerHTML = '';
            } else if (data.status === 'error') {
                Toastify({
                    text: data.message || "There was an error submitting the tasks.",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    stopOnFocus: true,
                    close: true,
                }).showToast();
            }



        }).catch(error => {

            Toastify({
                text: `There was a problem with the submission: ${error.message}`,
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff6a00, #ee0979)",
                stopOnFocus: true,
                close: true,
            }).showToast();
        });


    } catch (e) {

        Toastify({
            text: `An error occurred: ${e.message}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff6a00, #ee0979)",
            stopOnFocus: true,
            close: true,
        }).showToast();

    }
}




addNewTask();

