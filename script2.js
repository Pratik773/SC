document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskText = taskInput.value.trim();
    const taskDeadline = taskDate.value;

    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span class="task-text">${taskText} ${taskDeadline ? `- Due: ${new Date(taskDeadline).toLocaleString()}` : ''}</span>
        <div>
            <button class="editBtn">Edit</button>
            <button class="completeBtn">Complete</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;

    document.getElementById('taskList').appendChild(taskItem);
    taskInput.value = '';
    taskDate.value = '';

    taskItem.querySelector('.completeBtn').addEventListener('click', () => {
        taskItem.querySelector('.task-text').classList.toggle('completed');
    });

    taskItem.querySelector('.editBtn').addEventListener('click', () => {
        const taskTextSpan = taskItem.querySelector('.task-text');
        if (taskTextSpan.classList.contains('editable')) {
            const newText = taskItem.querySelector('.edit-input').value;
            taskTextSpan.textContent = newText;
            taskTextSpan.classList.remove('editable');
            taskItem.querySelector('.edit-input').remove();
            taskItem.querySelector('.editBtn').textContent = 'Edit';
        } else {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.classList.add('edit-input');
            editInput.value = taskTextSpan.textContent.split(' - ')[0];
            taskItem.insertBefore(editInput, taskTextSpan);
            taskTextSpan.classList.add('editable');
            taskItem.querySelector('.editBtn').textContent = 'Save';
        }
    });

    taskItem.querySelector('.deleteBtn').addEventListener('click', () => {
        taskItem.remove();
    });
}
