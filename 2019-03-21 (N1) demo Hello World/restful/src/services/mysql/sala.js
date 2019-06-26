
const sala = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM sala', (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, 'Falha ao listar os sala', reject)
            return false
          }
          resolve({ salas: results })
        })
      })
    },
    save: (sala) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO sala (nome, descricao, capacidade) VALUES (?,?,?)', [sala.nome,  sala.descricao, sala.capacidade], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao salvar o sala ${sala.nome}`, reject)
            return false
          }
          resolve({ sala: { nome: sala.nome, id: results.insertId } })
        })
      })
    },
    update: (sala) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE sala SET nome = ?, descricao = ?, capacidade = ? WHERE id = ?', [sala.nome, sala.descricao, sala.capacidade, sala.id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar o sala ${sala.nome}`, reject)
            return false
          }
          resolve({ sala: results})
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE FROM sala WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o sala de id ${id}`, reject)
            return false
          }
          resolve({ message: 'sala removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },
    getById: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

          connection.query('SELECT * FROM sala WHERE id = ?  LIMIT 1', [id], (error, results) => {
            if (error) {
              errorHandler(error, 'Falha ao listar os sala', reject)
              return false
            }
            resolve({ sala: results[0] })
          })
        
      })

      
    },

    getSalaByEventoId: (evento_id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM evento_sala WHERE evento_id = ?', [evento_id], (error, results) => {          
          if (error) {
            errorHandler(error, 'Falha ao listar os evento', reject)
            return false
          }
          resolve({ salas: results })
        })
      })
    },

    save: (evento) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        evento.salas.forEach(sala => {
          connection.query('INSERT INTO evento_sala (evento_id, sala_id) VALUES (?, ?)', [evento.id, sala], (error, results) => {
            if (error) {
              errorHandler(error, 'Falha ao salvar as salas', reject)
              return false
            }
          })
        })
      })
    },
  }
  
}

module.exports = sala
