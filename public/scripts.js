function onOff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("body")
        .classList
        .toggle("addScroll")
}

function checkFields(event) {

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function (value) {

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIsEmpty = !event.target[value].value.trim()

        if (checkIfIsString && checkIsEmpty) {
            return true
        }

    })

    if (isEmpty) {
        event.preventDefault()
        alert("Por favor preencha todos os campos")
    }
}

function deleteIdeia() {
    //DELETAR IDEIA//
    db.run('DELETE FROM ideas WHERE id = ?', [1], function (err) {
        if (err) return console.log(err)
        console.log("Ideia Deletada", this)
    })
}