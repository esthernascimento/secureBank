import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_TRANSACOES = "transacoes";
const CHAVE_USUARIO_LOGADO = "usuarioLogado";
const CHAVE_DADOS_USUARIO = "dadosUsuario";

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
 * Adiciona uma nova transação, atualiza o saldo do usuário logado
 * e retorna { transacoes, usuario } já atualizados.
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

  return { transacoes: transacoesAtualizadas, usuario };
}

/**
 * Exclui uma transação pelo id, devolve/desconta o valor do saldo
 * (o oposto do que aconteceu ao criá-la) e retorna { transacoes, usuario } atualizados.
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

  return { transacoes: transacoesAtualizadas, usuario };
}

/**
 * Edita uma transação existente. Desfaz o efeito dela no saldo (o valor/tipo antigo)
 * e aplica o efeito novo, evitando que o saldo fique errado após a mudança.
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
    // desfaz o efeito da transação antiga
    usuario.saldo =
      transacaoAntiga.tipo === "entrada"
        ? usuario.saldo - transacaoAntiga.valor
        : usuario.saldo + transacaoAntiga.valor;

    // aplica o efeito da transação atualizada
    usuario.saldo =
      transacaoAtualizada.tipo === "entrada"
        ? usuario.saldo + transacaoAtualizada.valor
        : usuario.saldo - transacaoAtualizada.valor;

    await salvarUsuario(usuario);
  }

  return { transacoes: transacoesAtualizadas, usuario, transacao: transacaoAtualizada };
}