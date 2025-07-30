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
    if (!contactName || !inpcontact) return false

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