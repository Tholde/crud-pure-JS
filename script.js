async function getUser() {
    let response = await fetch('data.json');
    let data = await response.json();
    let dataFilter = [];
    data.forEach(item => {
        dataFilter.push({'id': item.id, 'name': item.name, 'email': item.email, 'devise': item.devise});
    })
    // console.log(data);
    localStorage.setItem('user', JSON.stringify(dataFilter));
}

displayAll();

function removeElem(id) {
    // alert(id)
    let user = JSON.parse(localStorage.getItem('user'));
    let conf = confirm('Are you sure?');
    if (conf) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].id === id) {
                user.splice(i, 1);
                localStorage.setItem('user', JSON.stringify(user));
                // console.log(user);
                const tbody = document.getElementById('tb');
                tbody.innerHTML = '';
                displayAll();
            }
        }
    }
}

function editElem(id) {
    let user = JSON.parse(localStorage.getItem('user'));
    const nameInputEdit = document.getElementById('exampleName');
    const emailInputEdit = document.getElementById('exampleEmail');
    const deviseInputEdit = document.getElementById('ExempleDevise');
    const idval = document.getElementById('idval');
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === id) {
            nameInputEdit.value = `${user[i].name}`;
            emailInputEdit.value = `${user[i].email}`;
            deviseInputEdit.value = `${user[i].devise}`;
            idval.textContent = id;
        }
    }
    // }
}

/******************************************************/
/****************** Editer new user info ***********/

/******************************************************/
    let usersInfo = JSON.parse(localStorage.getItem('user'));
    console.log(usersInfo);
    const nameInputEdit = document.getElementById('exampleName');
    const emailInputEdit = document.getElementById('exampleEmail');
    const deviseInputEdit = document.getElementById('ExempleDevise');
    const idval = document.getElementById('idval');
    const td = document.getElementById('tb');
    const  editBtn = document.getElementById('editBtn');
    editBtn.addEventListener('click',()=>{
        for (let i = 0; i < usersInfo.length; i++) {
            if (usersInfo[i].id === idval.value) {
                console.log(usersInfo);
                usersInfo[i].name = nameInputEdit.value;
                usersInfo[i].email = emailInputEdit.value;
                usersInfo[i].devise = deviseInputEdit.value;
                console.log(usersInfo);
                localStorage.setItem('user', JSON.stringify(usersInfo));
                nameInput.value = '';
                emailInput.value = '';
                td.innerHTML = '';
                displayAll();
            }
        }
    });


/******************************************************/
/****************** Ajouter new user info ***********/
/******************************************************/

let users = JSON.parse(localStorage.getItem('user'));
const nameInput = document.getElementById('exampleLastName');
const emailInput = document.getElementById('exampleInputEmail');
const deviseInput = document.getElementById('devise');
const submitbtn = document.getElementById('submitBtn');
const idvalue = document.getElementById('idvalue');
const tbody = document.getElementById('tb');

submitbtn.addEventListener('click', () => {
    if (nameInput.value !== '' && emailInput.value !== '' && deviseInput.value !== '') {
        let user = {
            'id': users[users.length - 1].id + 1,
            'name': nameInput.value,
            'email': emailInput.value,
            'devise': deviseInput.value
        };
        console.log(user);
        console.log(users);
        users.push(user);
        console.log(users);
        localStorage.setItem('user', JSON.stringify(users));
        nameInput.value = '';
        emailInput.value = '';
        tbody.innerHTML = '';
        displayAll();
    } else {
        alert("Please complete all form!");
    }
})

function displayAll() {
    let user = JSON.parse(localStorage.getItem('user'));
    const tbody = document.getElementById('tb');
    user.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.devise}</td>
            <td class="button_action">
                <button onclick="editElem(${item.id})" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i class="fas fa-edit"></i></button>
                <button onclick="removeElem(${item.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    })
}