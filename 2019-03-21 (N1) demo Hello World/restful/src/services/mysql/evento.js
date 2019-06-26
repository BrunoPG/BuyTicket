
const evento = deps => {
  return {
    allByEvento: (eventoId) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM evento WHERE id = ?', [eventoId], (error, results) => {
          if (error) {
            errorHandler(error, error, reject)
            return false
          }
          resolve({ eventos: results })
        })
      })
    },
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM evento', (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, 'Falha ao listar os evento', reject)
            return false
          }
          resolve({ eventos: results })
        })
      })
    },
    save: (evento) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO evento (nome, descricao, data, hora, qtd_ingresso, local) VALUES ( ?, ?, ?, ?, ?, ?)', [evento.nome, evento.descricao, evento.data, evento.hora, evento.qtd_ingresso, evento.local], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao salvar o evento ${evento.nome}`, reject)
            return false
          }
          resolve({ evento: { nome: evento.nome, id: results.insertId } })
        })
      })
    },
    update: (evento) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('UPDATE evento SET nome = ?, descricao = ?, data = ?, hora = ?, qtd_ingresso = ?, local = ? WHERE id = ?', [evento.nome, evento.descricao, evento.data, evento.hora, evento.qtd_ingresso, evento.local,evento.id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar o evento ${evento.nome}`, reject)
            return false
          }
          resolve({ evento: { nome: evento.nome }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM evento WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover o evento de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Evento removido com sucesso!', affectedRows: results.affectedRows })
        })
      })
    },
    getById: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

          connection.query('SELECT * FROM evento WHERE id = ?  LIMIT 1', [id], (error, results) => {
            if (error) {
              errorHandler(error, 'Falha ao listar os sala', reject)
              return false
            }
            resolve({ evento: results[0] })
          })
        
      })
      
    }
  }
}

module.exports = evento
