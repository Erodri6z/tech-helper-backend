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

export {
  index,
  create
}