
const sha1 = require('sha1')

const users = deps => {
  return {
    getUserByEmail: (email) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT * FROM user WHERE email = ? LIMIT 1', [email], (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao achar as usuários', reject)

            return false
          }
          resolve({ usuario: results })
        })
      })
    },
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('SELECT id, email, nome FROM user', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar as usuários', reject)
            return false
          }
          resolve({ users: results })
        })
      })
    },
    save: (user) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps
        connection.query('INSERT INTO user (nome, email) VALUES (?, ?)', [user.nome, user.email], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a usuário ${user.email}`, reject)
            return false
          }
          resolve({ user: { email: user.email, id: results.insertId } })
        })
      })
    },
    update: (id, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('UPDATE usuario SET password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a usuário de id ${id}`, reject)
            return false
          }
          resolve({ user: { id }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        connection.query('DELETE FROM usuario WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a usuário de id ${id}`, reject)
            return false
          }
          resolve({ message: 'usuário removida com sucesso!', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = users
