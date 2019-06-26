
const ingresso = deps => {
  return {
    allByIngresso: (ingressoId) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM ingresso WHERE id = ?', [ingressoId], (error, results) => {
          if (error) {
            errorHandler(error, error, reject)
            return false
          }
          resolve({ ingressos: results })
        })
      })
    },
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM ingresso', (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, 'Falha ao listar os ingresso', reject)
            return false
          }
          resolve({ ingressos: results })
        })
      })
    },
    save: (ingresso) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO ingresso (titulo, descricao, data, hora, qtde_ingresso) VALUES (?,?,?,?,?)', [ingresso.titulo, ingresso.descricao, ingresso.data, ingresso.hora, ingresso.qtde_ingresso], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao salvar o ingresso ${ingresso.titulo}`, reject)
            return false
          }
          resolve({ ingresso: { titulo: ingresso.titulo, id: results.insertId } })
        })
      })
    },
    update: (ingresso, id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE ingresso SET titulo = ?, descricao = ?, data = ?, hora = ?, qtde_ingresso = ? WHERE id = ?', [ingresso.titulo, ingresso.descricao, ingresso.data, ingresso.hora, ingresso.qtde_ingresso, ingresso.id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar o ingresso ${ingresso.titulo}`, reject)
            return false
          }
          resolve({ ingresso: { titulo: ingresso.titulo }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM ingresso WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o ingresso de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Ingresso removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },
    getById: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM ingresso WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao pegar o ingresso de id ${id}`, reject)
            return false
          }
          resolve({ ingresso: results.all, affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = ingresso
