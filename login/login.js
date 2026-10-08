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

const formlogin = document.getElementById("form-login");
const usuario = document.getElementById("login");
const erroUsuario = document.getElementById("erro-usuario")
const erroSenha = document.getElementById("erro-senha")
formlogin.addEventListener("submit",function(event) {
    event.preventDefault();

    if(usuario.value.trim()==""&& senha.value.trim()=="")
    {
        erroUsuario.textContent = "Digite seu usuário";
        erroSenha.textContent = "Digite sua senha";

        usuario.classList.add("input-erro");
        senha.classList.add("input-erro")
        return;
    }
    if (usuario.value.trim()==="") {
        erroUsuario.textContent = "Digite seu usuário";
        usuario.classList.add("input-erro");
        return;
    }
    if (senha.value.trim()==="")
    {
        erroSenha.textContent = "Digite sua senha";
        senha.classList.add("input-erro")
        return;
    }
});

usuario.addEventListener("input", function(){
    if (usuario.value.trim()!=="")
    {
        erroUsuario.textContent="";
usuario.classList.remove("input-erro");
    }
});

senha.addEventListener("input",function() {
    if (usuario.value.trim()!=="") 
    {
        erroSenha.textContent=""
    senha.classList.remove("input-erro");
    }
})
