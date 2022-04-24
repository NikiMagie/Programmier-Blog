const form = document.getElementById("form")
const passwordInput = document.getElementById("password_input")
const messageContainer = document.getElementById("message-container")

form.addEventListener("submit", (e) => {

    let password = passwordInput.value
    let errors = findErrors(password)

    if (errors.length > 0) {
        e.preventDefault()
        messageContainer.innerText = errors.join('. ')
        messageContainer.classList.add("red-message")
        passwordInput.classList.add("red-input")
    }

    passwordInput.addEventListener("input", () => {
        passwordInput.classList.remove("red-input")
        messageContainer.innerText = ''
    })
})

function findErrors(password) {
    let errorMessages = []

    if (password === '' || password == null) {
        errorMessages.push("Kein Passwort eingegeben")
    }
    if (password.length < 8) {
        errorMessages.push("Das Passwort ist zu kurz")
    }

    return errorMessages
}