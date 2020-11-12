// @ts-check
/* eslint-disable no-param-reassign */

import _ from 'lodash';

// BEGIN (write your solution here)
const app = () => {
    const state = {
        lists : ['General'],
        tasks: [],
        activeChannel: 'General'
    }

    const onAddList = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        if (name == '') {
            return;
        }
        for (let item of state.lists) {
            if (item === name) {
                return;
            }
        }
        state.lists.push(name);
        render(state);
    }

    const onAddTask = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name'); 
        if (name == '') {
            return;
        }      
        for (let item of state.tasks.filter((x)=>x.list === state.activeChannel)) {
            if (item === name) {
                return;
            }
        }
        const task = {
            name: name,
            list: state.activeChannel
        }
        state.tasks.push(task);
        render(state);
    }

    document.querySelector("[data-container='new-list-form']").addEventListener('click', onAddList);
    document.querySelector("[data-container='new-task-form']").addEventListener('click', onAddTask);
    render(state);
}

const render = (state) => {
    const onSwitchChannel = (e) => {
        const list = e.currentTarget.textContent;
        state.activeChannel = list;
        render(state);
    }

    const renderLists = () => {
        const container = document.querySelector("[data-container='lists']");
        container.innerHTML='<ul></ul>';
        const containerRoot = container.querySelector('ul');
        for (let item of state.lists) {
            const li = document.createElement("li");
            if (state.activeChannel === item) {
                const b = document.createElement("b");
                b.textContent = item;
                li.appendChild(b);
            } else {
                const a = document.createElement("a");
                a.setAttribute("href", `#${item.toLowerCase()}`);
                a.textContent = item;
                a.addEventListener('click', onSwitchChannel);
                li.appendChild(a);
            }
            containerRoot.appendChild(li);
        }
    }

    const renderTasks = () => {
        const container = document.querySelector("[data-container='tasks']");
        if (state.tasks.filter((x)=> x.list === state.activeChannel).length == 0) {
            container.innerHTML='';
        } else {
            container.innerHTML='<ul></ul>';
            const containerRoot = container.querySelector('ul');
            for (let item of state.tasks.filter((x)=> x.list === state.activeChannel)) {
                const li = document.createElement("li");
                li.textContent = item.name;
                containerRoot.appendChild(li);
            }  
        }  
    }

    renderLists();
    renderTasks();
    document.querySelector("[data-container='new-list-form'] > input").value='';
    document.querySelector("[data-container='new-task-form'] > input").value='';
}

export default app;
// END
