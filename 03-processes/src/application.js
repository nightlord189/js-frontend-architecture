const app = () => {
    const state = {
        name: {
            state: 'printing',
            value: '',
        },
        email: {
            state: 'printing',
            value: '',
        }
    }

    const onClick = (e) => {
        const elementName = e.currentTarget.getAttribute('data-editable-target');
        if (state[elementName].state == 'editing') {
            return;
        }
        state[elementName].state = 'editing';
        render(state);
    }

    document.querySelectorAll("[data-editable-target]").forEach((element) => {
        element.addEventListener('click', onClick)
    });
    render(state);
}


const render = (state) => {
    const renderElement = (element, state) => {
        const elementName = element.getAttribute('data-editable-target');

        switch (state[elementName].state) {
            case 'printing':
                if (state[elementName].value == '') {
                    element.innerHTML = `<i>${elementName}</i>`;
                } else {
                    element.innerHTML = '';
                    element.textContent = state[elementName].value;
                }
                break;
            case 'editing':
                element.innerHTML = `<form>
                <input type="text" name="${elementName}">
                <input type="submit" value="Save">
              </form>`;
                element.querySelector('form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const value = formData.get(elementName)
                    state[elementName].value = value;
                    state[elementName].state = 'printing';
                    render(state);
                });
                element.querySelector('form > input').setAttribute('value', "");
                if (state[elementName].value != '') {
                    element.querySelector('form > input').value = state[elementName].value;
                }
                element.querySelector('form > input').focus();
                element.querySelector('form > input').select();
                break;
        }
    }

    const elements = document.querySelectorAll("[data-editable-target]");
    elements.forEach((element) => { renderElement(element, state) });
}

export default app;