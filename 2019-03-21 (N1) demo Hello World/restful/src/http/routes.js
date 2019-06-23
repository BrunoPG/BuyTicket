
const db = require('../services/mysql')

const routes = (server) => {
  /*server.post('autenticacao', async (req, res, next) => {
    try {
      const { email, password } = req.params
      res.send(await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(error)
    }
    next()
  })*/
  
  server.get('/getbyemail/:email', async (req, res, next) => {
    try {
      res.send(await db.users().getByEmail(req.params.email))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('user/all', async (req, res, next) => {
    try {
      res.send(await db.users().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('usuario', async (req, res, next) => {
    const user = req.body
    try {
      res.send(await db.users().save(user))
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    next()
  })

  server.get('evento/all', async (req, res, next) => {
    try {
      res.send(await db.evento().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('evento/geteventobyid/:id', async (req, res, next) => {
    if(req.headers.authorization != "123"){
      return res.send(401, {"message": 'usuario invalido'});
    }
    try {
      res.send(await db.evento().allByEvento(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('evento', async (req, res, next) => {
    const evento = req.body
    console.log(evento);
    try {
      res.send(await db.evento().save(evento))
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    next()
  })

  server.put('evento', async (req, res, next) => {
    const evento = req.body
    try {
      res.send(await db.evento().update(evento, evento.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('/evento/:id', async (req, res, next) => {
    try {
      res.send(await db.evento().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('/setorbysalaid/:id', async (req, res, next) => {
    try {
      res.send(await db.setor().allByEvento(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.post('setor/save', async (req, res, next) => {
    const setor = req.body
    try {
      res.send(await db.setor().save(setor))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('setor/all', async (req, res, next) => {
    try {
      res.send(await db.setor().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('evento', async (req, res, next) => {
    const evento = req.body
    
    try {
      res.send(await db.evento().update(evento))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('evento/:id', async (req, res, next) => {
    try {            
      res.send(await db.evento().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
