// localStorage.(key: contact, [{id, contactName, contactNumber}])

function getContact() {
    let data = localStorage.getItem("contact");
    data = JSON.parse(data);
    if (!data) return [];
    if (data) {
        return data;
    }
    return false
}

function getId() {
    let data = getContact()
    if (data.length === 0) return 0;

    let newId = Math.max(...data.map(data => data.id))
    return newId + 1;
}

function setContact(contactName, contactNumber) {

    const addMes = document.querySelector(".add")

    addMes.classList.remove("noadd")

    setTimeout(() => {
        addMes.classList.add("noadd")
    }, 5000)

    let data = getContact()
    data = (data) ? data : [];
    let id = getId()

    let cont = {
        "id": id,
        "contactName": contactName,
        "contactNumber": contactNumber
    }

    data.push(cont)
    data = JSON.stringify(data)
    localStorage.setItem("contact", data)
}


function save() {
    const contactName = document.querySelector("#inpname").value;
    const inpcontact = document.querySelector("#inpcontact").value;

    const errMes = document.querySelector(".error")

    if (!contactName || !inpcontact) {
        errMes.classList.remove("noerror")

        setTimeout(() => {
            errMes.classList.add("noerror")
        }, 5000)

        return
    }

    let data = getContact();
    const dublicate = data.some(cont => cont.contactNumber === inpcontact)
    const dubMes = document.querySelector(".dublic")
    if (dublicate) {

        dubMes.classList.remove("nodublic")

        setTimeout(() => {
            dubMes.classList.add("nodublic")
        }, 5000)

        return
    }

    setContact(contactName, inpcontact)
}

function deleteContact(id) {
    let data = getContact();

    if (!data) return;

    let newData = data.filter((value) => value.id !== id);
    newData = JSON.stringify(newData)
    localStorage.setItem("contact", newData);
    showContact()
}

document.querySelector(".button").addEventListener("click", () => {
    save()
    document.querySelector("#inpname").value = '';
    document.querySelector("#inpcontact").value = '';
    showContact()
})


function showContact() {
    let html = ''
    let data = getContact();
    if (!data) return;

    data.forEach(value => {
        html += `<li>
                    <span class="name">Name:${value.contactName}</span>
                    <span class="number">Number:${value.contactNumber}</span>
                    <span class="delete" onclick="deleteContact(${value.id})">X</span>
                 </li>`
    })
    document.querySelector(".contacts-list").innerHTML = html;
}

showContact()