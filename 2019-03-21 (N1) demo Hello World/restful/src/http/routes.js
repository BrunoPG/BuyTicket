
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

  server.post('user/save', async (req, res, next) => {
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
    try {
      res.send(await db.evento().save(evento))
    } catch (error) {
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

  server.get('setor/sala/:sala_id', async (req, res, next) => {
    try {
      res.send(await db.setor().getSetoresBySalaId(req.params.sala_id))
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

  server.get('setor/:id', async (req, res, next) => {
    try {      
      res.send(await db.setor().getById(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('setor', async (req, res, next) => {
    const setor = req.body    
    try {
      res.send(await db.setor().update(setor))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('setor/:id', async (req, res, next) => {
    try {            
      res.send(await db.setor().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get('sala/all', async (req, res, next) => {
    try {
      res.send(await db.sala().all())
    } catch (error) {
      res.send(error)
    }
    next()
  })



  server.get('sala/:id', async (req, res, next) => {
    try {
      res.send(await db.sala().getById(req.params.id))
    } catch (error) {
      console.log(error);
      res.send(error)
    }
    next()
  })

  server.del('sala/:id', async (req, res, next) => {
    try {            
      res.send(await db.sala().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })


  server.post('sala/save', async (req, res, next) => {
    const sala = req.body
    try {
      res.send(await db.sala().save(sala))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put('sala', async (req, res, next) => {
    const sala = req.body    
    try {
      res.send(await db.sala().update(sala))
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

  server.post('assentos/save', async (req, res, next) => {
    const acenstos = req.body
    try {
      res.send(await db.setor().saveAssentos(acenstos))
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    next()
  })

  server.get('assentos/setor/:setor_id', async (req, res, next) => {
    try {
      res.send(await db.setor().getAssentos(req.params.setor_id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del('assentos/setor/:setor_id', async (req, res, next) => {
    try {
      res.send(await db.setor().DelAssentos(req.params.setor_id))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
