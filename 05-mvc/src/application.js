// @ts-check

import onChange from 'on-change';

// BEGIN (write your solution here)
//helpers
const getActiveElementFromList = (list) => {
    const items = list.querySelectorAll('.list-group-item');
    let result = '';
    items.forEach((item) => {
        if (item.classList.contains('active')) {
            result = item.id.split('-')[1];
        }
    });
    return result;
}

const getListName = (list) => {
    const id = list.id.replace('list-tab', '');
    return id === '' ? '1' : id;
}

//app
const app = () => {
    const state = {
        lists: {
        }
    }

    const watchedState = onChange(state, (path, value, previousValue) => {
        render(state);
    });

    const onItemClick = (e) => {
        if (e.currentTarget.classList.contains('active')) {
            return;
        }
        const parsedNumber = e.currentTarget.id.split('-')[0].replace('list', '');
        const number = parsedNumber === '' ? 1 : Number(parsedNumber);
        const value = e.currentTarget.id.split('-')[1];
        watchedState.lists[number] = value;
        //console.log(state);
    }

    const init = () => {
        const lists = document.querySelectorAll('.list-group');
        lists.forEach((list) => {
            const activeElementName = getActiveElementFromList(list);
            state.lists[getListName(list)] = activeElementName;
        });
        document.querySelectorAll('.list-group-item').forEach(
            (item) => {
                item.addEventListener('click', onItemClick);
            }
        );
    }

    init();
    render(state);
}

const render = (state) => {
    for (let listNumber of Object.keys(state.lists)) {
        const suffix = Number(listNumber) > 1 ? listNumber : '';
        const listElement = document.querySelector(`#list-tab${suffix}`);
        const children = listElement.querySelectorAll('.list-group-item');
        children.forEach((child) => {
            if (child.classList.contains('active')) {
                child.classList.remove('active');
            }
        });
        listElement.querySelector(`#list${suffix}-${state.lists[listNumber]}-list`).classList.add('active');

        const tabContent = document.querySelector(`#nav-tabContent${suffix}`);
        const tabChildren = tabContent.querySelectorAll('.tab-pane');
        tabChildren.forEach((child) => {
            if (child.classList.contains('active')) {
                child.classList.remove('active');
                child.classList.remove('show');
            }
        });
        tabContent.querySelector(`#list${suffix}-${state.lists[listNumber]}`).classList.add('active', 'show');
    }
}

export default app;
// END
