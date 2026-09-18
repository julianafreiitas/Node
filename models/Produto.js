//exportar o padrão
//primeira letra do nome do arquivo sempre  
export default class Produto {
    constructor({ id, nome, preco, estoque = 0, categoria }) {
      if (!Number.isInteger(id) || id <= 0) {
        throw new TypeError("Id deve ser inteiro e positivo");
      }
      if (typeof nome != "string" || nome.trim() === "") {
        throw new TypeError("O tipo de nome deve ser string");
      }
      if (!Number.isInteger(preco) || preco < 0 || !Number.isFinite(preco)) {
        throw new TypeError("Preco deve ser inteiro e finito, e maior que zero");
      }
      if (
        !Number.isInteger(estoque) ||
        !Number.isFinite(estoque) ||
        estoque < 0
      ) {
        throw new TypeError("Estoque inválido, olhe aqui");
      }
      if (typeof categoria != "string" || categoria.trim() === "") {
        throw new TypeError("O tipo de categoria deve ser string");
      }
  
      Object.assign(this, {
        id,
        nome: nome.trim(),
        preco,
        estoque,
        categoria: categoria.trim(),
      });
    }
  
    calcularValorEmEstoque() {
      return this.preco * this.estoque;
    }
    calcularPrecoComDesconto(percentual) {
      if (!Number.isFinite(percentual) || percentual <= 0 || percentual > 100) {
        throw new RangeError("Desconto deve estar enre 0 a 100");
      }
      return this.preco * (1 - percentual / 100);
    }
  }