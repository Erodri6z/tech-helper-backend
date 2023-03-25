import { Post } from '../models/post.js'

function index(req, res) {
  Post.find({})
  .populate('poster')
  .then(posts =>
    res.json(posts)
  )
  .catch(err => {
    console.log(err)
    res.redirect('/')
    res.status(500)
  })
}

function create(req, res){
  req.body.poster = req.user.profile
  Post.create(req.body)
  .then(post => {
    Post.findById(post.id)
    .populate('poster')
    .then(popPost => {
      res.json(popPost)
    })
  })
  .catch(err => {
    console.log(err)
      res.status(500).json(err)
  })
}

function show(req, res) {
  Post.findById(req.params.id)
  .then(p => 
    res.json(p)
  )
  .catch(err => {
    console.log(err)
      res.status(500).json(err)
  })
}

function deletePost(req, res){
  Post.findById(req.params.id)
  .then(post => {
    if(post.poster._id.equals(req.user.profile)){
      Post.findByIdAndDelete(req.params.id)
      .then(delPost => 
        res.json(delPost)
      )
    }else{
      res.status(401).json({err : "this isn't your post, buddy!"})
    }
  })
  .catch(err => {
    console.log(err)
      res.status(500).json(err)
  })
}

export {
  index,
  create,
  show,
  deletePost as delete
}