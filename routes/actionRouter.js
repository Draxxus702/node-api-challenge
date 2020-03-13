const express = require('express')

const Action = require('../data/helpers/actionModel')

const router = express.Router()

router.use('/:id', validateUserId)

router.get('/:id', (req, res) =>{
    Action.get(req.params.id)
    .then(param => {
        res.status(200).json(req.user)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({errorMessage: 'Could not find your information'})
    })
})

router.post('/', (req, res) =>{
    Action.get()
    .then(param => {
         if(!req.body.project_id|| !req.body.description || req.body.completed){
            res.status(400).json({
                errorMessage: 'missing a field'
            })
        }else{
            Action.insert(req.body)
            .then(param =>{
                res.status(201).json(req.body)
            })
           .catch(err => {
               res.status(500).json({
                   errorMessage: 'failed to complete post'
               })
           })
        }
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'to stop infinite loop'})
    })
})




router.put('/:id', (req, res) =>{
    Action.get(req.params.id)
    .then(param => {
        if(param.length === 0){
            res.status(404).json({
                errorMessage: 'could not make post'
            })
        }else if(!req.body.project_id || !req.body.description || req.body.completed){
            res.status(400).json({
                errorMessage: 'missing a field'
            })
        }else{
            Action.update(req.params.id, req.body)
            .then(param =>{
                res.status(201).json(req.body)
            })
           .catch(err => {
               res.status(500).json({
                   errorMessage: 'failed to complete post'
               })
           })
        }
    })
    .catch(err =>{
        res.status(500).json({errorMessage:'dont promise chain me bro'})
    })
})

router.delete('/:id', (req, res) =>{
    Action.remove(req.params.id)
    .then(param =>{
        res.status(200).json({message: 'project has been deleted', project: req.user})
    })
})









function validateUserId(req, res, next) {
    // do your magic!
    const id = req.params.id
    Action.get(id)
    .then(param =>{
      if(!param){
        res.status(400).json({
          errorMessage: 'The user doesnt exist'
        })
      }else{
        req.user = param
        next()
      }
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json({
        errorMessage:'couldnt validate'
      })
    })
  }




module.exports = router