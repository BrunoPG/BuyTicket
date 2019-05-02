
const setor = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM setor', (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, 'Falha ao listar os setor', reject)
            return false
          }
          resolve({ setors: results })
        })
      })
    },
    save: (setor) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO setor (nome, descricao, fk_sala) VALUES (?,?,?)', [setor.nome,  setor.descricao, setor.sala_id], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao salvar o setor ${setor.nome}`, reject)
            return false
          }
          resolve({ setor: { nome: setor.nome, id: results.insertId } })
        })
      })
    },
    update: (setor) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE setor SET nome = ?, descricao = ?, sala_id = ? WHERE id = ?', [setor.nome, setor.descricao, setor.sala_id, setor.id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar o setor ${setor.nome}`, reject)
            return false
          }
          resolve({ setor: { nome: setor.nome }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM setor WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o setor de id ${id}`, reject)
            return false
          }
          resolve({ message: 'setor removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },
    getById: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM setor WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao pegar o setor de id ${id}`, reject)
            return false
          }
          resolve({ setor: results.all, affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = setor
