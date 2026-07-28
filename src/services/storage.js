import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_TRANSACOES = "transacoes";
const CHAVE_USUARIO_LOGADO = "usuarioLogado";
const CHAVE_DADOS_USUARIO = "dadosUsuario";
const CHAVE_ALERTAS = "alertas";

/**
 * Retorna todas as transações salvas, da mais recente para a mais antiga.
 */
export async function obterTransacoes() {
  const dados = await AsyncStorage.getItem(CHAVE_TRANSACOES);
  const transacoes = dados ? JSON.parse(dados) : [];
  return transacoes.sort((a, b) => new Date(b.data) - new Date(a.data));
}

/**
 * Retorna o usuário logado (com saldo atualizado).
 */
export async function obterUsuarioLogado() {
  const dados = await AsyncStorage.getItem(CHAVE_USUARIO_LOGADO);
  return dados ? JSON.parse(dados) : null;
}

/**
 * Salva o usuário nas duas chaves usadas pelo app,
 * garantindo que o saldo persista entre sessões.
 */
async function salvarUsuario(usuario) {
  await AsyncStorage.setItem(CHAVE_USUARIO_LOGADO, JSON.stringify(usuario));
  await AsyncStorage.setItem(CHAVE_DADOS_USUARIO, JSON.stringify(usuario));
}

/**
 * Adiciona uma nova transação, atualiza o saldo e gera um ALERTA AUTOMÁTICO.
 */
export async function adicionarTransacao({ titulo, valor, tipo, categoria, descricao }) {
  const novaTransacao = {
    id: Date.now(),
    titulo,
    valor: Number(valor),
    tipo, // "entrada" | "saida"
    categoria,
    descricao,
    data: new Date().toISOString(),
    status: "Concluída",
    metodo: categoria,
  };

  const transacoesAtuais = await obterTransacoes();
  const transacoesAtualizadas = [novaTransacao, ...transacoesAtuais];
  await AsyncStorage.setItem(CHAVE_TRANSACOES, JSON.stringify(transacoesAtualizadas));

  const usuario = await obterUsuarioLogado();
  if (usuario) {
    usuario.saldo =
      tipo === "entrada"
        ? usuario.saldo + novaTransacao.valor
        : usuario.saldo - novaTransacao.valor;

    await salvarUsuario(usuario);
  }

  // DISPARA ALERTA AUTOMÁTICO
  await adicionarAlerta({
    titulo: tipo === "entrada" ? "Entrada registrada" : "Saída registrada",
    descricao: `${categoria} • R$ ${novaTransacao.valor.toFixed(2)}`,
    tipo,
  });

  return { transacoes: transacoesAtualizadas, usuario };
}

/**
 * Exclui uma transação, ajusta o saldo e gera um ALERTA AUTOMÁTICO.
 */
export async function excluirTransacao(transacaoId) {
  const transacoesAtuais = await obterTransacoes();
  const transacaoRemovida = transacoesAtuais.find((t) => t.id === transacaoId);
  const transacoesAtualizadas = transacoesAtuais.filter((t) => t.id !== transacaoId);

  await AsyncStorage.setItem(CHAVE_TRANSACOES, JSON.stringify(transacoesAtualizadas));

  const usuario = await obterUsuarioLogado();
  if (usuario && transacaoRemovida) {
    usuario.saldo =
      transacaoRemovida.tipo === "entrada"
        ? usuario.saldo - transacaoRemovida.valor
        : usuario.saldo + transacaoRemovida.valor;

    await salvarUsuario(usuario);
  }

  // DISPARA ALERTA AUTOMÁTICO
  await adicionarAlerta({
    titulo: "Transação removida",
    descricao: "Uma movimentação foi excluída.",
    tipo: "info",
  });

  return { transacoes: transacoesAtualizadas, usuario };
}

/**
 * Edita uma transação, atualiza o saldo e gera um ALERTA AUTOMÁTICO.
 */
export async function editarTransacao(transacaoId, dadosNovos) {
  const transacoesAtuais = await obterTransacoes();
  const index = transacoesAtuais.findIndex((t) => t.id === transacaoId);
  if (index === -1) return null;

  const transacaoAntiga = transacoesAtuais[index];

  const transacaoAtualizada = {
    ...transacaoAntiga,
    ...dadosNovos,
    valor: Number(dadosNovos.valor ?? transacaoAntiga.valor),
    metodo: dadosNovos.categoria ?? transacaoAntiga.metodo,
  };

  const transacoesAtualizadas = [...transacoesAtuais];
  transacoesAtualizadas[index] = transacaoAtualizada;

  await AsyncStorage.setItem(CHAVE_TRANSACOES, JSON.stringify(transacoesAtualizadas));

  const usuario = await obterUsuarioLogado();
  if (usuario) {
    usuario.saldo =
      transacaoAntiga.tipo === "entrada"
        ? usuario.saldo - transacaoAntiga.valor
        : usuario.saldo + transacaoAntiga.valor;

    usuario.saldo =
      transacaoAtualizada.tipo === "entrada"
        ? usuario.saldo + transacaoAtualizada.valor
        : usuario.saldo - transacaoAtualizada.valor;

    await salvarUsuario(usuario);
  }

  // DISPARA ALERTA AUTOMÁTICO
  await adicionarAlerta({
    titulo: "Transação alterada",
    descricao: `Atualizado para R$ ${transacaoAtualizada.valor.toFixed(2)}`,
    tipo: "info",
  });

  return { transacoes: transacoesAtualizadas, usuario, transacao: transacaoAtualizada };
}

// --- METODOS DE ALERTAS ---

export async function obterAlertas() {
  try {
    const alertas = await AsyncStorage.getItem(CHAVE_ALERTAS);
    return alertas ? JSON.parse(alertas) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function adicionarAlerta({ titulo, descricao, tipo = "info" }) {
  try {
    const alertas = await obterAlertas();

    const novoAlerta = {
      id: Date.now(),
      titulo,
      descricao,
      tipo,
      data: new Date().toISOString(),
      lido: false,
    };

    alertas.unshift(novoAlerta);

    await AsyncStorage.setItem(CHAVE_ALERTAS, JSON.stringify(alertas));
    return alertas;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function marcarComoLido(id) {
  try {
    const alertas = await obterAlertas();
    const listaAtualizada = alertas.map((item) =>
      item.id === id ? { ...item, lido: true } : item
    );

    await AsyncStorage.setItem(CHAVE_ALERTAS, JSON.stringify(listaAtualizada));
    return listaAtualizada;
  } catch (error) {
    console.log(error);
  }
}

export async function excluirAlerta(id) {
  try {
    const alertas = await obterAlertas();
    const novaLista = alertas.filter((item) => item.id !== id);

    await AsyncStorage.setItem(CHAVE_ALERTAS, JSON.stringify(novaLista));
    return novaLista;
  } catch (error) {
    console.log(error);
  }
}

export async function limparAlertas() {
  try {
    await AsyncStorage.setItem(CHAVE_ALERTAS, JSON.stringify([]));
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}