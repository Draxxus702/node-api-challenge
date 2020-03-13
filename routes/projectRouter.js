const express = require('express')

const Project = require('../data/helpers/projectModel')

const router = express.Router()

router.use('/:id', validateId)

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
    .then(param => {
    res.status(200).json(param)
})
.catch(err =>{
    console.log(err)
    res.status(500).json({
        errorMessage: 'Could not find your information'
        })
    })
})

router.get('/', (req, res) =>{
    Project.get()
    .then(param =>{
        res.status(200).json({param})
    })
    .catch(err =>{
        res.status(500).json({errorMessage: 'couldnt find your stuff'})
    })
})


router.get('/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(param => {
        res.status(200).json(param)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'Could not find your information'
        })
    })
})

router.post('/', (req,res) => {
    Project.get()
    .then(param => {
         if(!req.body.name || !req.body.description || req.body.completed){
            res.status(400).json({
                errorMessage: 'missing a field'
            })
        }else{
            Project.insert(req.body)
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

router.put('/:id', (req,res) => {
    Project.get(req.params.id)
    .then(param => {
        if(param.length === 0){
            res.status(404).json({
                errorMessage: 'could not make post'
            })
        }else if(!req.body.name || !req.body.description || req.body.completed){
            res.status(400).json({
                errorMessage: 'missing a field'
            })
        }else{
            Project.update(req.params.id, req.body)
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

router.delete('/:id', (req,res) =>{
    Project.remove(req.params.id)
    .then(param =>{
        res.status(200).json({message: 'project has been delted', project: req.user})
    })
})






function validateId(req, res, next) {
    // do your magic!
    const id = req.params.id
    Project.get(id)
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