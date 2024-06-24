const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'tasks.txt');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addTask(task) {
    fs.appendFile(filePath, `${task}\n`, (err) => {
        if (err) throw err;
        console.log('Task added successfully.');
    });
}

function viewTasks() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('No tasks found.');
            } else {
                throw err;
            }
        } else {
            const tasks = data.split('\n').filter(task => task);
            if (tasks.length === 0) {
                console.log('No tasks found.');
            } else {
                tasks.forEach((task, index) => {
                    console.log(`${index + 1}. ${task}`);
                });
            }
        }
    });
}

function markTaskAsComplete(taskNumber) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n').filter(task => task);
        if (taskNumber > 0 && taskNumber <= tasks.length) {
            tasks[taskNumber - 1] = `[Completed] ${tasks[taskNumber - 1]}`;
            fs.writeFile(filePath, tasks.join('\n') + '\n', (err) => {
                if (err) throw err;
                console.log('Task marked as complete.');
            });
        } else {
            console.log('Invalid task number.');
        }
    });
}

function removeTask(taskNumber) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n').filter(task => task);
        if (taskNumber > 0 && taskNumber <= tasks.length) {
            tasks.splice(taskNumber - 1, 1);
            fs.writeFile(filePath, tasks.join('\n') + '\n', (err) => {
                if (err) throw err;
                console.log('Task removed successfully.');
            });
        } else {
            console.log('Invalid task number.');
        }
    });
}

function mainMenu() {
    console.log('\nTask Manager');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');

    rl.question('Choose an option: ', (answer) => {
        switch (answer) {
            case '1':
                rl.question('Enter the task: ', (task) => {
                    addTask(task);
                    mainMenu();
                });
                break;
            case '2':
                viewTasks();
                mainMenu();
                break;
            case '3':
                rl.question('Enter the task number to mark as complete: ', (number) => {
                    markTaskAsComplete(parseInt(number, 10));
                    mainMenu();
                });
                break;
            case '4':
                rl.question('Enter the task number to remove: ', (number) => {
                    removeTask(parseInt(number, 10));
                    mainMenu();
                });
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid option.');
                mainMenu();
                break;
        }
    });
}

mainMenu();
