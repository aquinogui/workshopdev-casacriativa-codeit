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

function deleteIdea(){
    let toDelete = confirm("Deseja deletar esta Ideia?")
    if (!toDelete) {
        event.preventDefault()
    }
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        console.log("Tema dark ativado")
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
          console.log("Tema light ativo")
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);