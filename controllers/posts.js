import { Post } from '../models/post.js'

function index(req, res) {
  Post.find({})
  .populate('poster')
  .populate('comment')
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
  .populate('poster')
  .populate('comment')
  .populate('comment.author')
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

function edit(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(updatedPost => {
    res.json(updatedPost)
  })
  .catch(err => {
    console.log(err)
      res.status(500).json(err)
  })
}

function createComment(req, res) {
  req.body.author = req.user.profile
  Post.findById(req.params.id)
  .then(post => {
    post.comment.push(req.body)
    post.save()
    .then(() => {
      res.json(post)
      console.log(post)
    })
  })
  .catch(err => {
    console.log(err)
      res.status(500).json(err)
  })
}

function deleteComment(req, res) {
  Post.findById(req.params.id)
  .populate('comment')
  .then(post => {
    if(post.poster._id.equals(req.user.profile)){
      post.comment.remove({_id: req.params.commentId})
      post.save()
      .then(updatedPost => {
        res.json(updatedPost)
      })
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
  deletePost as delete,
  edit,
  createComment,
  deleteComment
}