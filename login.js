const senha = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrar-senha");

mostrarSenha.addEventListener("click", function () {
    if (senha.type === "password") {
        senha.type = "text";
        mostrarSenha.textContent = "👁";
    } else {
        senha.type = "password";
        mostrarSenha.textContent = "⌣";
    }})
