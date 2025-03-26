// Classe Pessoa
class Pessoa {
    constructor(nome, idade, diagnosticos = []) {
      this.nome = nome;
      this.idade = idade;
      this.diagnosticos = diagnosticos;
      this.entradasHumor = [];
      this.rotina = new Rotina();
      this.alertas = [];
      this.planoTerapeutico = null;
    }
  
    registrarHumor(humor) {
      const entrada = new EntradaHumor(humor);
      this.entradasHumor.push(entrada);
      this.verificarAlerta();
    }
  
    verificarAlerta() {
      const ultimosHumores = this.entradasHumor.slice(-3);
      const negativos = ultimosHumores.filter(h => h.humor === 'triste' || h.humor === 'ansioso');
  
      if (negativos.length >= 3) {
        const alerta = new Alerta('Humor negativo contínuo detectado');
        this.alertas.push(alerta);
      }
    }
  
    definirPlano(plano) {
      this.planoTerapeutico = plano;
    }
  }
  
  // Classe Diagnóstico
  class Diagnostico {
    constructor(nome, descricao) {
      this.nome = nome;
      this.descricao = descricao;
    }
  }
  
  // Classe Entrada de Humor
  class EntradaHumor {
    constructor(humor, data = new Date()) {
      this.humor = humor; // Ex: "feliz", "ansioso", "irritado"
      this.data = data;
    }
  }
  
  // Classe Evento Crítico
  class EventoCritico {
    constructor(descricao, gravidade) {
      this.descricao = descricao;
      this.gravidade = gravidade; // Ex: "baixa", "média", "alta"
      this.data = new Date();
    }
  }
  
  // Classe Rotina
  class Rotina {
    constructor() {
      this.sono = [];
      this.alimentacao = [];
      this.medicacao = [];
      this.atividades = [];
    }
  
    registrarSono(horas) {
      this.sono.push({ horas, data: new Date() });
    }
  
    registrarAlimentacao(descricao) {
      this.alimentacao.push({ descricao, data: new Date() });
    }
  
    registrarMedicacao(nome) {
      this.medicacao.push({ nome, data: new Date() });
    }
  
    registrarAtividade(atividade) {
      this.atividades.push({ atividade, data: new Date() });
    }
  }
  
  // Classe Alerta
  class Alerta {
    constructor(mensagem) {
      this.mensagem = mensagem;
      this.data = new Date();
      this.visualizado = false;
    }
  
    marcarComoVisualizado() {
      this.visualizado = true;
    }
  }
  
  // Classe Plano Terapêutico
  class PlanoTerapeutico {
    constructor(descricao, metas = []) {
      this.descricao = descricao;
      this.metas = metas;
      this.dataInicio = new Date();
    }
  
    adicionarMeta(meta) {
      this.metas.push(meta);
    }
  }
  
  // Classe Relatório (simplificado)
  class Relatorio {
    constructor(pessoa) {
      this.nomePessoa = pessoa.nome;
      this.qtdEntradasHumor = pessoa.entradasHumor.length;
      this.qtdAlertas = pessoa.alertas.length;
      this.qtdEventosCriticos = pessoa.eventosCriticos?.length || 0;
    }
  
    gerarResumo() {
      return `
        Relatório de ${this.nomePessoa}:
        - Entradas de Humor: ${this.qtdEntradasHumor}
        - Alertas gerados: ${this.qtdAlertas}
        - Eventos Críticos: ${this.qtdEventosCriticos}
      `;
    }
  }
  
  // ==========================
  // 🚀 TESTE DO SISTEMA
  // ==========================
  
  const pessoa = new Pessoa("João", 30, [
    new Diagnostico("Transtorno Bipolar", "Oscilações entre mania e depressão")
  ]);
  
  // Registrando humores negativos consecutivos
  pessoa.registrarHumor("triste");
  pessoa.registrarHumor("ansioso");
  pessoa.registrarHumor("triste");
  
  // Exibindo alertas gerados
  console.log("🚨 Alertas detectados:");
  console.log(pessoa.alertas);
  
  // Gerando relatório
  const relatorio = new Relatorio(pessoa);
  console.log("\n📄 Resumo do Relatório:");
  console.log(relatorio.gerarResumo());
  
    