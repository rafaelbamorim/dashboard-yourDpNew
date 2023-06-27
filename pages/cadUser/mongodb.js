const createacctbtn = document.getElementById("create-acct-btn");
const formRegister = document.getElementById("formRegister");


formRegister.addEventListener("submit", (event) => {
    event.preventDefault();


    let nameInput = document.getElementById("name-signup").value;
    let emailInput = document.getElementById("email-signup").value;
    let passwordInput = document.getElementById("password-signup").value;
    let confirmPasswordInput = document.getElementById("confirm-password-signup").value;


    if (nameInput == "") {
        return window.alert("O nome é obrigatório")
    }

    if (emailInput == "") {
        return window.alert("O email é obrigatório")
    }

    if (passwordInput != confirmPasswordInput) {
      return window.alert("As senhas não batem")
    }

    const ponto = [{}]

    const ferias = [{}]

    const ausencia =[{}]


    const data = {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        confirmpassword: confirmPasswordInput,
        ponto: ponto,
        ferias: ferias,
        ausencia: ausencia
    };


    fetch('https://api-yourdp.onrender.com/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.ok) {
                formRegister.reset();
                alert('Form data successfully')
                

            }
            if (data.msg) {
                alert(data.msg);
            }

        })
        .catch((err) => {
            console.log(err)
        })

})