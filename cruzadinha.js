// --- INICIALIZAÇÃO ---
// Pega a referência do elemento HTML onde a cruzadinha será desenhada.
const container = document.getElementById('cruzadinha-container');
// Pega a referência do elemento HTML onde os números arrastáveis (respostas) serão colocados.
const respostasContainer = document.getElementById('respostas-container');


// --- DADOS DO JOGO ---
// 'fases' é um array que guarda os dados de cada nível do jogo.
let fases = [
    {
        // 'cruzada' é uma matriz (um array de arrays) que representa o tabuleiro.
        // Cada número ou sinal é uma célula. " " é uma célula vazia e 0 é um espaço para resposta.
        cruzada: [
            [" ", " ", " ", " ", "3", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", "-", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", "5", " ", 0, "+", "2", "=", 0, " ", " ", " ", " "],
            [" ", " ", "-", " ", "=", " ", " ", " ", "+", " ", " ", " ", " "],
            [" ", " ", 0, "-", "1", "=", 0, " ", 0, " ", "2", " ", " "],
            [" ", " ", "=", " ", " ", " ", " ", " ", "=", " ", "+", " ", " "],
            [0, "+", "1", "=", "3", " ", " ", " ", "5", "-", 0, "=", 0],
            [" ", " ", " ", " ", "+", " ", " ", " ", " ", " ", "=", " ", " "],
            [" ", " ", " ", " ", "2", " ", "1", " ", " ", " ", "5", " ", " "],
            [" ", " ", " ", " ", "=", " ", "+", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", 0, "-", 0, "=", "3", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", "=", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", 0, " ", " ", " ", " ", " ", " "]
        ],
        // 'respostas' é um array com os números que o jogador poderá arrastar para os espaços da cruzadinha.
        respostas: [1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
    }
];

// --- CONTROLE DE ESTADO DO JOGO ---
// 'faseAtual' guarda o número do nível em que o jogador está. Começa em 0 (o primeiro nível).
let faseAtual = 0;


// --- FUNÇÃO PRINCIPAL PARA MONTAR O JOGO NA TELA ---
// A função 'carregarFase' é responsável por desenhar o tabuleiro e as respostas de um determinado nível.
function carregarFase(n) {
    // Atualiza a variável 'faseAtual' com o número do nível que está sendo carregado.
    faseAtual = n;
    // Pega os dados da 'cruzada' e das 'respostas' da fase atual usando desestruturação.
    let { cruzada, respostas } = fases[n];

    // Inicia a criação do HTML da cruzadinha com a tag de abertura de uma tabela.
    let html = '<table style="border-collapse: collapse; text-align: center; border:none;">';

    // Loop 'for...of' para percorrer cada 'linha' da matriz 'cruzada'.
    for (let linha of cruzada) {
        // Para cada linha da matriz, cria uma linha de tabela (<tr>) no HTML.
        html += '<tr>';
        // Loop 'for...of' para percorrer cada 'celula' dentro da 'linha' atual.
        for (let celula of linha) {
            // Se o valor da célula for 0, é um espaço para resposta.
            if (celula === 0) {
                // Cria uma célula de tabela (<td>) com a classe 'dropzone' e eventos para arrastar e soltar.
                html += `<td class="dropzone" 
                     ondrop="drop(event)" 
                     ondragover="allowDrop(event)" 
                     style="width:40px;height:40px;background:#f9f9f9;border:1px solid #ccc;"></td>`;
            // Se o valor da célula for " ", é um espaço em branco no design.
            } else if (celula === " ") {
                // Cria uma célula de tabela vazia e transparente, sem bordas.
                html += `<td style="width:40px;height:40px;background:transparent;border:none;"></td>`;
            // Se não for 0 nem " ", é um número ou operador fixo.
            } else {
                // Cria uma célula de tabela normal para exibir o número ou operador.
                html += `<td style="width:40px;height:40px;font-weight:bold;border:1px solid #ccc;">${celula}</td>`;
            }
        }
        // Fecha a tag da linha da tabela (</tr>) após preencher todas as suas células.
        html += '</tr>';
    }
    // Fecha a tag da tabela (</table>) após criar todas as linhas.
    html += '</table>';
    // Insere todo o HTML gerado para a tabela dentro do container da cruzadinha.
    container.innerHTML = html;

    // --- GERAÇÃO DOS NÚMEROS ARRASTÁVEIS ---
    // Usa o método 'map' para transformar o array de 'respostas' em um array de strings HTML.
    respostasContainer.innerHTML = respostas.map((r, i) =>
        // Para cada número 'r' no array, cria uma 'div' arrastável.
        // A classe 'cor-${r}' aplica a cor correspondente ao número.
        // 'draggable="true"' permite que o elemento seja arrastado.
        // 'ondragstart' e 'ondragend' definem quais funções chamar ao iniciar e terminar de arrastar.
        // 'id' cria um identificador único para cada círculo de resposta.
        `<div class="resposta cor-${r}" draggable="true" 
            ondragstart="drag(event)" 
            ondragend="dragend(event)"
            id="resp-${n}-${i}">
            ${r}
       </div>`
    ).join(""); // O 'join("")' junta todas as strings HTML em uma única string.
}


// --- FUNÇÕES DE ARRASTAR E SOLTAR (DRAG AND DROP) ---

// 'drag' é chamada quando o usuário começa a arrastar um número.
function drag(ev) {
    // 'setData' anexa o ID do elemento arrastado aos dados da transferência. Isso permite saber qual elemento foi solto.
    ev.dataTransfer.setData("text", ev.target.id);

    // 'setTimeout' com 0ms atraso esconde o elemento original. Isso dá a impressão de que ele "saiu" do lugar.
    setTimeout(() => {
        ev.target.style.display = "none";
    }, 0);
}

// 'drop' é chamada quando um número é solto sobre uma 'dropzone' (célula da cruzadinha).
function drop(ev) {
    // 'preventDefault' impede o comportamento padrão do navegador (que seria abrir o dado como um link).
    ev.preventDefault();
    // Pega o ID do elemento que foi armazenado na função 'drag'.
    const data = ev.dataTransfer.getData("text");
    // Usa o ID para obter o elemento HTML do círculo que está sendo arrastado.
    const resposta = document.getElementById(data);
    // 'ev.target' é a célula (<td>) onde o círculo foi solto.
    const dropzone = ev.target;

    // Condição para garantir que a ação só aconteça se a 'resposta' existir, se a célula for uma 'dropzone' e se estiver vazia.
    if (resposta && dropzone.classList.contains('dropzone') && !dropzone.hasChildNodes()) {
        
        // Torna o círculo visível novamente (já que 'drag' o escondeu).
        resposta.style.display = "flex";
        
        // 'appendChild' move o elemento 'resposta' para dentro da 'dropzone', preservando todos os seus estilos.
        dropzone.appendChild(resposta);
    }
}

// 'allowDrop' é chamada continuamente enquanto um elemento é arrastado sobre uma 'dropzone'.
function allowDrop(ev) {
    // 'preventDefault' é essencial aqui para indicar que esta área aceita o "drop". Sem isso, o 'drop' não funcionaria.
    ev.preventDefault();
}

// 'dragend' é chamada quando a operação de arrastar termina (seja com sucesso ou cancelada).
function dragend(ev) {
    // Verifica se o elemento original ainda existe na página (se não foi solto em uma 'dropzone' válida).
    if (document.getElementById(ev.target.id)) {
        // Se ainda existir, restaura seu 'display' para 'flex' para que ele reapareça na área de respostas.
        ev.target.style.display = "flex";
    }
}

// 'retornarResposta' é chamada quando um número é solto de volta na área de respostas.
function retornarResposta(ev) {
    // Previne o comportamento padrão do navegador.
    ev.preventDefault();
    // Pega o ID do elemento arrastado.
    const data = ev.dataTransfer.getData("text");
    // Obtém o elemento HTML do círculo.
    const resposta = document.getElementById(data);

    // Verifica se o círculo existe e se o local onde foi solto é o container principal de respostas.
    if (resposta && ev.currentTarget.id === 'respostas-container') {
        
        // Move o círculo de volta para o container de respostas, tirando-o da cruzadinha.
        ev.currentTarget.appendChild(resposta);
    }
}


// --- FUNÇÃO PARA CARREGAR A LEGENDA ---
// 'carregarLegenda' cria e exibe a legenda de números e cores na lateral.
function carregarLegenda() {
    // Pega a referência do container onde a legenda será inserida.
    const legendaContainer = document.querySelector('.legenda-container');
    // Cria um array com os nomes dos números por extenso.
    const numerosPorExtenso = [
        "UM", "DOIS", "TRÊS", "QUATRO", "CINCO",
        "SEIS", "SETE", "OITO", "NOVE", "DEZ"
    ];

    // Inicia uma string vazia que vai acumular o HTML da legenda.
    let htmlLegenda = '';
    // Loop 'for' que vai de 1 a 10 para criar cada item da legenda.
    for (let i = 1; i <= 10; i++) {
        // Para cada número, adiciona um bloco de HTML à string.
        // Ele cria um 'span' para o número e outro para o nome por extenso.
        // As classes 'cor-${i}' aplicam as cores correspondentes.
        htmlLegenda += `
            <div class="legenda-item">
                <span class="legenda-numero cor-${i}">${i}</span>
                <span class="legenda-nome cor-${i}">${numerosPorExtenso[i - 1]}</span>
            </div>
        `;
    }
    // Insere o HTML completo da legenda no seu container.
    legendaContainer.innerHTML = htmlLegenda;
}


// --- EXECUÇÃO INICIAL DO JOGO ---
// Chama a função para carregar a primeira fase (fase 0) quando a página é aberta.
carregarFase(0);
// Chama a função para carregar a legenda de cores.
carregarLegenda();
