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