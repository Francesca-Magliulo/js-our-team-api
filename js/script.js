const cardContainer = document.querySelector(".card-container")

function creaCard(name, role, email, img) {

    let card = document.createElement("div")
    card.classList.add("card")

    let cardImage = document.createElement("div")
    cardImage.classList.add("card-image")
    let memberImage = document.createElement("img")
    memberImage.src = img

    cardImage.appendChild(memberImage)

    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    let cardName = document.createElement("h5")
    cardName.classList.add("card-name")
    cardName.innerText = name

    let cardRole = document.createElement("p")
    cardRole.classList.add("card-role")
    cardRole.innerText = role

    let cardEmail = document.createElement("p")
    cardEmail.classList.add("card-email")
    cardEmail.innerText = email

    cardBody.appendChild(cardName)
    cardBody.appendChild(cardRole)
    cardBody.appendChild(cardEmail)

    card.appendChild(cardImage)
    card.appendChild(cardBody)

    cardContainer.appendChild(card)

}

// salvo in una costante l'indirizzo dell'API
const urlMembers = "https://boolean-teachers.github.io/mock/api/members/"

//inizializzo nello scope globale una variabile vuota per l'array che mi verrà restituito dopo la chimata all'API, per poterlo utilizzare anche per il form
let teamMembers;

axios.get(urlMembers).then(memb => {

    console.log(memb.data)

    memb.data.forEach((singleMember) => {
        const member = singleMember

        teamMembers = memb.data

        creaCard(member.name, member.role, member.email, member.img)
    });
})


const form = document.querySelector("form")

let newName = document.getElementById("new-name")
let newRole = document.getElementById("new-role")
let newEmail = document.getElementById("new-email")
let newImage = document.getElementById("image")

form.addEventListener('submit',
    function newMember(e) {
        e.preventDefault()

        let nameForm = newName.value
        let roleForm = newRole.value
        let emailForm = newEmail.value
        let imageForm = newImage.value

        const newObject = {
            name: nameForm,
            role: roleForm,
            email: emailForm,
            img: imageForm
        }

        teamMembers.push(newObject)

        creaCard(newObject.name, newObject.role, newObject.email, newObject.img)

        form.reset()
    }
)
