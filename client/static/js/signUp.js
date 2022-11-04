// This next block of code relates to form validation where the user inputs info like
// email, name, password etc. 

const nameInput = document.getElementById('sign-up-name-input');
const emailInput = document.getElementById('sign-up-email-input');
const passwordInput = document.getElementById('sign-up-password');
const confirmPasswordInput = document.getElementById('sign-up-confirm-password');
const errorMessages = [...document.querySelectorAll('.sign-up-error-message')];
const signUpInputs = [nameInput, emailInput, passwordInput, confirmPasswordInput];

const email_validation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const name_validation = /^[a-zA-Z '-]+$/ 
const capital_validation = /[A-Z]/
const lower_validation = /[a-z]/
const special_validation = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const number_validation = /[0-9]/
const dot_validation = /\./
const space_validation = /\ /

function regExSpace(x) {
    if (space_validation.test(x) == false) {
        return false
    }
    const test_string = x;
    let test_string2 = test_string.split(' ');
    test_string2 = test_string2.filter(word => word !== '');
    if (test_string2.length < 2) {
        return false;
    }
    test_string2 = test_string2.filter(word => capital_validation.test(word[0]));
    if (test_string2.length < 2) {
        return false;
    } else {
        return true;
    }   
}

function regExName(x) {
    return name_validation.test(x);
}

function regExEmail(x) {
    return email_validation.test(x);
}


function regExCapital(x) {
    return capital_validation.test(x);
}

function regExLower(x) {
    return lower_validation.test(x);
}

function regExSpecial(x) {
    return special_validation.test(x);
}

function regExNumber(x) {
    return number_validation.test(x);
}

function eightLength(x) {
    return x.length >= 8;
}

function regExDot(x) {
    const parameter_value = x.split('@');
    const parameter_value2 = parameter_value[parameter_value.length - 1];
    const number_of_dots = (parameter_value2.match(/\./g) || []).length;
    if (dot_validation.test(parameter_value2) == true && number_of_dots >= 1 && parameter_value2[parameter_value2.length - 1] != '.') {
        return true;
    } else {
        return false;
    }
}

nameInput.addEventListener('change', () => {
    let indexPosition = signUpInputs.indexOf(nameInput);
    errorMessages[indexPosition].style.display = 'none';

    if (nameInput.value === '') {
        errorMessages[indexPosition].style.display = 'block';
    }

    if (nameInput.value !== '') {
        let test_result1 = regExName(nameInput.value);
        let test_result2 = regExSpace(nameInput.value);
        if (test_result1 == false || test_result2 == false) {
            errorMessages[indexPosition].style.display = 'block';
        }
    }
})

emailInput.addEventListener('change', () => {
    let indexPosition = signUpInputs.indexOf(emailInput);
    errorMessages[indexPosition].style.display = 'none';

    if (emailInput.value === '') {
        errorMessages[indexPosition].style.display = 'block';
    }

    if (emailInput.value !== '') {
        let test_result1 = regExEmail(emailInput.value);
        let test_result2 = regExDot(emailInput.value);
        if (test_result1 == false || test_result2 == false) {
            errorMessages[indexPosition].style.display = 'block';
        }

    }
    
})

passwordInput.addEventListener('change', () => {
    let indexPosition = signUpInputs.indexOf(passwordInput);
    errorMessages[indexPosition].style.display = 'none';

    if (passwordInput.value === '') {
        errorMessages[indexPosition].style.display = 'block';
    }

    if (passwordInput.value !== '') {
        let test_result1 = regExCapital(passwordInput.value);
        let test_result2 = regExLower(passwordInput.value);
        let test_result3 = regExNumber(passwordInput.value);
        let test_result4 = regExSpecial(passwordInput.value);
        let test_result5 = eightLength(passwordInput.value);
        if (test_result1 == false || test_result2 == false || test_result3 == false || test_result4 == false || test_result5 == false) {
            errorMessages[indexPosition].style.display = 'block'; 
        }


    }
    
})

confirmPasswordInput.addEventListener('change', () => {
    let indexPosition = signUpInputs.indexOf(confirmPasswordInput);
    errorMessages[indexPosition].style.display = 'none';

    if (confirmPasswordInput.value === '') {
        errorMessages[indexPosition].style.display = 'block';
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
        errorMessages[indexPosition].style.display = 'block';
    }
})

// The next block of code relates to posting sign up data to the server

const signUpSubmitBtn = document.getElementById('sign-up-submit-button')
const fetchUrl = 'https://viva-pal.herokuapp.com/auth/register';



signUpSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let signUpInputsCounter = 0;
    let errorMessageCounter = 0;
    const dataObject1 = {name: '',
                     email: '',
                    password: ''};

    for (let each of signUpInputs) {
        if (each.value === '') {
            signUpInputsCounter += 1;
        }
    }

    for (let each of errorMessages) {
        if (each.style.display !== 'none') {
            errorMessageCounter += 1;
        }
    }

    if (signUpInputsCounter > 0 || errorMessageCounter > 0) {
        alert('Please ensure that you have filled out the form properly');
    } else {
        dataObject1.name = nameInput.value;
        dataObject1.email = emailInput.value;
        dataObject1.password = passwordInput.value;

        fetch(fetchUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObject1)
            } 
        )
        .then(resp => 
            resp.json())
        .then(data => {
            localStorage.setItem('token', data.token)
            const payload = jwt_decode(data.token);
            localStorage.setItem('name', payload.name);
            localStorage.setItem('email', payload.email)
            localStorage.setItem('userId', payload.userId)
            window.location.pathname = '/static/userPage.html';
        })

    }
 
    

})
