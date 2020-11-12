// @ts-check
/* eslint no-restricted-syntax: ["off", "ForInStatement"] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable guard-for-in */

import i18next from 'i18next';
import onChange from 'on-change';
import resources from './locales';
import _ from 'lodash';

// BEGIN (write your solution here)
const getItems = () => {
    const result = [];
    for (const [key, value] of Object.entries(document.location)) {
        if (!_.isObject(value) && value !== '') {
            result.push({ key, value });
        }
    }
    return result;
}

const app = () => {
    const state = {
        items: [],
        sort: {
            column: 'Name',
            dir: 'Asc'
        }
    }

    const init = async () => {
        //console.log(document.location);
        await i18next.init({
            lng: 'ru', // Текущий язык
            debug: true,
            resources: {
                ru: {
                },
            },
        });
        state.items = getItems();
        render(state);
        console.log(state);
    }

    init();
}

const createTh = (text) => {
    const th = document.createElement('th');
    const a = document.createElement('a');
    a.setAttribute('href', "");
    a.textContent = text;
    th.appendChild(a);
    return th;
}

const getSorted = (items, column, dir) => {
    items.sort((a, b) => {
        var textA = a[column].toUpperCase();
        var textB = b[column].toUpperCase();
        console.log(textA);
        let result = (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        return dir === 'Asc' ? result : -1 * result;
    });
    return items;
}

const createTr = (name, value) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = name;
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.textContent = value;
    tr.appendChild(td2);
    return tr;   
}

const render = (state) => {
    const root = document.querySelector('.container');
    root.innerHTML = '';
    const table = document.createElement("table");
    table.classList.add('table');
    root.appendChild(table);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    const trHead = document.createElement('tr');
    tbody.appendChild(trHead);

    const nameTh = createTh(`Name (${state.sort.column === 'Name' ? state.sort.dir : 'Unsorted'})`);
    const valueTh = createTh(`Value (${state.sort.column === 'Value' ? state.sort.dir : 'Unsorted'})`);

    nameTh.addEventListener('click', (e)=> {
        e.preventDefault();
        state.sort.dir = (state.sort.column === 'Name') ? (state.sort.dir === 'Asc' ? 'Desc' : 'Asc') : 'Asc';
        state.sort.column = 'Name';
        render(state);
    });

    valueTh.addEventListener('click', (e)=> {
        e.preventDefault();
        state.sort.dir = (state.sort.column === 'Value') ? (state.sort.dir === 'Asc' ? 'Desc' : 'Asc') : 'Asc';
        state.sort.column = 'Value';
        render(state);
    });

    trHead.appendChild(nameTh);
    trHead.appendChild(valueTh);
    state.items = getItems();
    const sorted = getSorted(state.items, state.sort.column === 'Name' ? 'key' : 'value', state.sort.dir);
    console.log(sorted);
    for (let item of sorted) {
        const tr = createTr(item.key, item.value);
        tbody.appendChild(tr);
    }
}

export default app;
// END
