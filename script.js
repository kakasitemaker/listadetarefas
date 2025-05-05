// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const campoNovaTarefa = document.getElementById('novaTarefa');
    const btnAdicionar = document.getElementById('btnAdicionar');
    const listaTarefas = document.getElementById('listaTarefas');
    const avisoListaVazia = document.getElementById('listaVazia');
    
    // Carrega tarefas salvas
    carregarTarefas();
    
    // Adiciona evento de clique no botão
    btnAdicionar.addEventListener('click', adicionarTarefa);
    
    // Adiciona tarefa ao pressionar Enter
    campoNovaTarefa.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        adicionarTarefa();
      }
    });
    
    // Função para adicionar nova tarefa
    function adicionarTarefa() {
      const texto = campoNovaTarefa.value.trim();
      
      if (!texto) {
        alert('Ei, você precisa digitar algo!');
        campoNovaTarefa.focus();
        return;
      }
      
      criarItemTarefa(texto);
      campoNovaTarefa.value = '';
      campoNovaTarefa.focus();
      verificarListaVazia();
      salvarTarefas();
    }
    
    // Cria o elemento HTML para uma nova tarefa
    function criarItemTarefa(texto) {
      const item = document.createElement('li');
      item.className = 'item-tarefa';
      
      const span = document.createElement('span');
      span.className = 'texto-tarefa';
      span.textContent = texto;
      
      const btn = document.createElement('button');
      btn.className = 'botao-remover';
      btn.innerHTML = '&times;';
      btn.title = 'Remover tarefa';
      btn.addEventListener('click', function() {
        item.remove();
        verificarListaVazia();
        salvarTarefas();
      });
      
      item.appendChild(span);
      item.appendChild(btn);
      listaTarefas.appendChild(item);
    }
    
    // Verifica se a lista está vazia
    function verificarListaVazia() {
      if (listaTarefas.children.length === 0) {
        avisoListaVazia.style.display = 'block';
      } else {
        avisoListaVazia.style.display = 'none';
      }
    }
    
    // Salva tarefas no localStorage
    function salvarTarefas() {
      const tarefas = [];
      document.querySelectorAll('.texto-tarefa').forEach(function(item) {
        tarefas.push(item.textContent);
      });
      localStorage.setItem('tarefasApp', JSON.stringify(tarefas));
    }
    
    // Carrega tarefas do localStorage
    function carregarTarefas() {
      const tarefasSalvas = localStorage.getItem('tarefasApp');
      if (tarefasSalvas) {
        JSON.parse(tarefasSalvas).forEach(function(tarefa) {
          criarItemTarefa(tarefa);
        });
        verificarListaVazia();
      }
    }
    
    // Foca no campo de texto ao carregar
    campoNovaTarefa.focus();
  });