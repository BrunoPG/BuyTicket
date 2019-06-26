
const venda = deps => {
  return {
    allByVenda: (vendaId) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM venda WHERE id = ?', [vendaId], (error, results) => {
          if (error) {
            errorHandler(error, error, reject)
            return false
          }
          resolve({ vendas: results })
        })
      })
    },
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM venda', (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, 'Falha ao listar os venda', reject)
            return false
          }
          resolve({ vendas: results })
        })
      })
    },
    save: (venda) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO venda (titulo, descricao, data, hora, qtde_ingresso) VALUES (?,?,?,?,?)', [venda.titulo, venda.descricao, venda.data, venda.hora, venda.qtde_ingresso], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao salvar o venda ${venda.titulo}`, reject)
            return false
          }
          resolve({ venda: { titulo: venda.titulo, id: results.insertId } })
        })
      })
    },
    update: (venda, id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE venda SET titulo = ?, descricao = ?, data = ?, hora = ?, qtde_ingresso = ? WHERE id = ?', [venda.titulo, venda.descricao, venda.data, venda.hora, venda.qtde_ingresso, venda.id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar o venda ${venda.titulo}`, reject)
            return false
          }
          resolve({ venda: { titulo: venda.titulo }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM venda WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o venda de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Venda removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },
    getById: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM venda WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao pegar o venda de id ${id}`, reject)
            return false
          }
          resolve({ venda: results.all, affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = venda
