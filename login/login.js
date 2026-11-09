
const senha = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrar-senha");
const olhoAberto = document.getElementById("olho-aberto");
const olhoFechado = document.getElementById("olho-fechado");


// Atualiza os ícones conforme a senha está visível ou escondida
function atualizarIconesSenha() {
    const senhaVisivel = senha.type === "text";

    // Mostra o olho aberto quando a senha está visível
    olhoAberto.style.display = senhaVisivel ? "block" : "none";

    // Mostra o olho riscado quando a senha está escondida
    olhoFechado.style.display = senhaVisivel ? "none" : "block";

    // Remove atributos antigos que poderiam esconder os ícones
    olhoAberto.removeAttribute("hidden");
    olhoFechado.removeAttribute("hidden");

    olhoAberto.classList.remove("icone-oculto");
    olhoFechado.classList.remove("icone-oculto");

    // Atualiza a acessibilidade do botão
    mostrarSenha.setAttribute(
        "aria-label",
        senhaVisivel ? "Ocultar senha" : "Mostrar senha"
    );

    mostrarSenha.setAttribute(
        "aria-pressed",
        String(senhaVisivel)
    );
}


// Permite mostrar ou ocultar a senha ao clicar no botão
mostrarSenha.addEventListener("click", function () {
    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }

    atualizarIconesSenha();
});

// Define os ícones corretos ao carregar a página
atualizarIconesSenha();

const formlogin = document.getElementById("form-login");
const usuario = document.getElementById("login");
const erroUsuario = document.getElementById("erro-usuario");
const erroSenha = document.getElementById("erro-senha");

// Exibe a mensagem, a borda vermelha e a tremida no campo inválido
function mostrarErro(campo, mensagem, elementoErro) {
    elementoErro.textContent = mensagem;
    campo.classList.add("input-erro");
    campo.setAttribute("aria-invalid", "true");

    campo.classList.remove("input-shake");

    // Reinicia a animação ao tentar enviar novamente
    void campo.offsetWidth;

    campo.classList.add("input-shake");
}

// Remove a mensagem e a borda vermelha quando o campo é corrigido
function limparErro(campo, elementoErro) {
    elementoErro.textContent = "";
    campo.classList.remove("input-erro", "input-shake");
    campo.removeAttribute("aria-invalid");
}

// Verifica se os campos de usuário e senha foram preenchidos antes de enviar
formlogin.addEventListener("submit", function (event) {
    event.preventDefault();

    let formularioValido = true;
    let primeiroCampoInvalido = null;

    if (usuario.value.trim() === "") {
        mostrarErro(usuario, "Digite seu usuário", erroUsuario);
        formularioValido = false;
        primeiroCampoInvalido = usuario;
    } else {
        limparErro(usuario, erroUsuario);
    }

    if (senha.value.trim() === "") {
        mostrarErro(senha, "Digite sua senha", erroSenha);
        formularioValido = false;

        if (primeiroCampoInvalido === null) {
            primeiroCampoInvalido = senha;
        }
    } else {
        limparErro(senha, erroSenha);
    }

    // Direciona o foco para o primeiro campo que precisa ser preenchido
    if (!formularioValido) {
        primeiroCampoInvalido.focus();
        return;
    }

    // O formulário foi validado, mas ainda não possui autenticação
});

// Remove a mensagem de erro quando o usuário preenche o campo
usuario.addEventListener("input", function () {
    if (usuario.value.trim() !== "") {
        limparErro(usuario, erroUsuario);
    }
});

// Remove a mensagem de erro quando a senha é preenchida
senha.addEventListener("input", function () {
    if (senha.value.trim() !== "") {
        limparErro(senha, erroSenha);
    }
});

// Remove a animação após a tremida terminar
usuario.addEventListener("animationend", function () {
    usuario.classList.remove("input-shake");
});

senha.addEventListener("animationend", function () {
    senha.classList.remove("input-shake");
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
