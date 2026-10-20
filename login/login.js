
const senha = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrar-senha");

// Permite mostrar ou ocultar a senha ao clicar no botão
mostrarSenha.addEventListener("click", function () {
    if (senha.type === "password") {
        senha.type = "text";
        mostrarSenha.textContent = "👁";
    } else {
        senha.type = "password";
        mostrarSenha.textContent = "⌣";
    }
});

const formlogin = document.getElementById("form-login");
const usuario = document.getElementById("login");
const erroUsuario = document.getElementById("erro-usuario");
const erroSenha = document.getElementById("erro-senha");

// Verifica se os campos de usuário e senha foram preenchidos antes de enviar
formlogin.addEventListener("submit", function (event) {
    event.preventDefault();

    if (usuario.value.trim() == "" && senha.value.trim() == "") {
        erroUsuario.textContent = "Digite seu usuário";
        erroSenha.textContent = "Digite sua senha";

        usuario.classList.add("input-erro");
        senha.classList.add("input-erro");
        return;
    }

    if (usuario.value.trim() === "") {
        erroUsuario.textContent = "Digite seu usuário";
        usuario.classList.add("input-erro");
        return;
    }

    if (senha.value.trim() === "") {
        erroSenha.textContent = "Digite sua senha";
        senha.classList.add("input-erro");
        return;
    }
});

// Remove a mensagem de erro quando o usuário começa a preencher o campo
usuario.addEventListener("input", function () {
    if (usuario.value.trim() !== "") {
        erroUsuario.textContent = "";
        usuario.classList.remove("input-erro");
    }
});

// Remove a mensagem de erro da senha quando o campo é preenchido
senha.addEventListener("input", function () {
    if (senha.value.trim() !== "") {
        erroSenha.textContent = "";
        senha.classList.remove("input-erro");
    }
});

// Configura as ferramentas de acessibilidade após o carregamento da página
document.addEventListener("DOMContentLoaded", function () {

    const aumentarFonte = document.getElementById("aumentar-fonte");
    const diminuirFonte = document.getElementById("diminuir-fonte");
    const alternarTema = document.getElementById("alternar-tema");

    let escalaFonte = 1;

    const textos = document.querySelectorAll(
        "h1, h2, h3, p, label, input, button, a, small, span"
    );

    // Armazena o tamanho original das fontes para permitir os ajustes
    textos.forEach(function (elemento) {
        elemento.dataset.fonteOriginal =
            parseFloat(getComputedStyle(elemento).fontSize);
    });

    // Atualiza o tamanho dos textos conforme a escala selecionada
    function atualizarFonte() {
        textos.forEach(function (elemento) {
            const tamanhoOriginal = Number(elemento.dataset.fonteOriginal);

            elemento.style.fontSize =
                (tamanhoOriginal * escalaFonte) + "px";
        });
    }

    // Aumenta o tamanho da fonte até o limite de 140%
    aumentarFonte.addEventListener("click", function () {
        if (escalaFonte < 1.4) {
            escalaFonte = Math.round((escalaFonte + 0.1) * 10) / 10;
            atualizarFonte();
        }
    });

    // Diminui o tamanho da fonte até o limite de 80%
    diminuirFonte.addEventListener("click", function () {
        if (escalaFonte > 0.8) {
            escalaFonte = Math.round((escalaFonte - 0.1) * 10) / 10;
            atualizarFonte();
        }
    });

    // Alterna entre os temas claro e escuro da página
    alternarTema.addEventListener("click", function () {
        document.body.classList.toggle("modo-escuro");

        alternarTema.textContent =
            document.body.classList.contains("modo-escuro")
                ? "Claro"
                : "Escuro";
    });

});
