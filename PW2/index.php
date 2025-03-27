<?php
// O navegador não vê esse PHP — só o HTML gerado abaixo
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Monitoramento de Humor</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f2f2f2;
    }
    .card {
      background: white;
      padding: 20px;
      margin-top: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    input, select, button {
      padding: 10px;
      margin: 5px 0;
      width: 100%;
      box-sizing: border-box;
    }
    h2 {
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <h1>Sistema de Monitoramento de Humor</h1>

  <div class="card">
    <h2>Registrar Humor</h2>
    <input type="text" id="nome" placeholder="Nome da Pessoa" />
    <select id="humor">
      <option value="feliz">Feliz</option>
      <option value="triste">Triste</option>
      <option value="ansioso">Ansioso</option>
      <option value="irritado">Irritado</option>
    </select>
    <button onclick="registrarHumor()">Registrar</button>
  </div>

  <div class="card">
    <h2>Entradas de Humor</h2>
    <ul id="lista-humor"></ul>
  </div>

  <div class="card">
    <h2>Alertas</h2>
    <ul id="lista-alertas"></ul>
  </div>

  <script>
    const pessoa = {
      nome: '',
      entradasHumor: [],
      alertas: []
    };

    function registrarHumor() {
      const nome = document.getElementById('nome').value;
      const humor = document.getElementById('humor').value;
      if (!nome) return alert("Digite o nome da pessoa");

      pessoa.nome = nome;
      pessoa.entradasHumor.push(humor);

      atualizarListaHumor();
      verificarAlertas();
    }

    function atualizarListaHumor() {
      const lista = document.getElementById('lista-humor');
      lista.innerHTML = '';
      pessoa.entradasHumor.forEach((h, i) => {
        const li = document.createElement('li');
        li.textContent = `${i+1}. ${h}`;
        lista.appendChild(li);
      });
    }

    function verificarAlertas() {
      const ultimos = pessoa.entradasHumor.slice(-3);
      const negativos = ultimos.filter(h => h === 'triste' || h === 'ansioso');

      if (negativos.length === 3) {
        const alerta = `Alerta: 3 humores negativos consecutivos! (${negativos.join(', ')})`;
        pessoa.alertas.push(alerta);
        atualizarListaAlertas();
      }
    }

    function atualizarListaAlertas() {
      const lista = document.getElementById('lista-alertas');
      lista.innerHTML = '';
      pessoa.alertas.forEach((a, i) => {
        const li = document.createElement('li');
        li.textContent = a;
        lista.appendChild(li);
      });
    }
  </script>
</body>
</html>
