
const setor = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM setor', (error, results) => {
          if (error) {
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
        connection.query('INSERT INTO setor (nome, descricao, qtd_fileira, qtd_coluna, sala_id) VALUES (?, ?, ?, ?, ?)', [setor.nome, setor.descricao, setor.qtd_fileira, setor.qtd_coluna, setor.sala_id], (error, results) => {
          if (error) {
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
        connection.query('SELECT * FROM setor WHERE id = ? LIMIT 1', [id], (error, results) => {           
          if (error) {
            errorHandler(error, 'Falha ao buscar o setor '+id, reject)
            return false
          }else
          resolve({ setor: results[0], affectedRows: results.affectedRows })
        })
      })
    },
    getSetoresBySalaId: (sala_id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM setor WHERE sala_id = ?', [sala_id], (error, results) => {          
          if (error) {
            errorHandler(error, 'Falha ao listar os setor', reject)
            return false
          }
          resolve({ setores: results })
        })
      })
    },
    saveAssentos: (acentos) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        acentos.forEach(colunas => {
          colunas.forEach(acento => {
            connection.query('INSERT INTO Assento (coluna, linha, tipo_id, setor_id) VALUES (?, ?, ?, ?)', [acento.coluna, acento.linha, acento.tipo_id, acento.setor_id], (error, results) => {
              if (error) {
                errorHandler(error, 'Falha ao salvar os assentos', reject)
                return false
              }
            })
          })
        });
        resolve({ retorno: "Assentos salvos com sucesso!" })
      })
    },

    getAssentos: (id_setor) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('SELECT * FROM assento where setor_id = ?',[id_setor], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar os assentos', reject)
            return false
          }
          resolve({ assentos: results })
        })
      })
    },

    DelAssentos: (id_setor) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('DELETE from assento where setor_id = ?',[id_setor], (error, retorno) => {
          if (error) {
            errorHandler(error, 'Falha excluir os assentos', reject)
            return false
          }
          resolve({ retorno: "assentos excluidos com sucesso!" })
        })
      })
    }

    
  }

}

module.exports = setor
