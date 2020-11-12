// @ts-check
/* eslint-disable no-param-reassign, no-console  */

import _ from 'lodash';
import * as y from 'yup';

import onChange from 'on-change';
import axios from 'axios';

// NOTE: because of incompatability between commonjs and esm
const yup = !y.object ? y.default : y;

// Never hardcore urls
const routes = {
    usersPath: () => '/users',
};

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    passwordConfirmation: yup.string()
        .required()
        .oneOf(
            [yup.ref('password'), null],
            'Password confirmation does not match to password',
        ),
});

const errorMessages = {
    network: {
        error: 'Network Problems. Try again.',
    },
};

// BEGIN (write your solution here)
const app = () => {
    const state = {
        form: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        errors: {},
        formState: 'editing'
    }

    const getFormValues = () => {
        return {
            name: document.querySelector('#sign-up-name').value,
            email: document.querySelector('#sign-up-email').value,
            password: document.querySelector('#sign-up-password').value,
            passwordConfirmation: document.querySelector('#sign-up-password-confirmation').value
        }
    }

    const getErrors = (ex) => {
        const errors = {};
        for (let err of ex.inner) {
            const errStr = err.message;
            if (!_.has(errors, err.path)) {
                errors[err.path] = [];
            }
            errors[err.path].push(errStr);
        }
        return errors;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        state.formState = 'sending';
        render (state);
        await axios.post('/users', state.form);
        state.formState = 'sent';
        render (state);
    }

    const checkForm = () => {
        state.form = getFormValues();
        try {
            schema.validateSync(state.form, { abortEarly: false });
            state.errors = {};
        }
        catch (e) {
            state.errors = getErrors(e);
        }
        render (state);
    }

    const onChangeInput = (e) => {
        checkForm();
    }

    const init = () => {
        document.querySelector('form').addEventListener('submit', onSubmit);
        document.querySelector('#sign-up-email').addEventListener('input', onChangeInput);
        document.querySelector('#sign-up-password').addEventListener('input', onChangeInput);
        document.querySelector('#sign-up-password-confirmation').addEventListener('input', onChangeInput);
        checkForm();
    }

    init();
    render(state);
}

const renderInputField = (state, fieldName) => {
    const fieldNameCamel = fieldName.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
    const input = document.querySelector(`#sign-up-${fieldName}`);
    input.classList.remove('is-invalid');
    const invalidDivs = input.parentElement.querySelectorAll('.invalid-feedback');
    if (invalidDivs != null) {
        invalidDivs.forEach((child) => {
            input.parentElement.removeChild(child);
        });
    }
    if (_.has(state.errors, fieldNameCamel)) {
        input.classList.add('is-invalid');
        for (let err of state.errors[fieldNameCamel]) {
            const div = document.createElement("div");
            div.textContent = err;
            div.classList.add('invalid-feedback');
            input.parentElement.appendChild(div);
        }
    }
}

const renderForm = (state) => {
    renderInputField(state, 'email');
    renderInputField(state, 'password');
    renderInputField(state, 'password-confirmation');
    document.querySelector('.btn-primary').disabled = Object.keys(state.errors).length > 0 || state.formState === 'sending';
}

const render = (state) => {
    //console.log(state);
    if (state.formState === 'editing') {
        renderForm(state);
    }
    else if (state.formState === 'sent') {
        const divRoot = document.querySelector("[data-container='sign-up']");
        divRoot.innerHTML = '';
        divRoot.textContent = 'User Created!';
    }
}

export default app;
// END