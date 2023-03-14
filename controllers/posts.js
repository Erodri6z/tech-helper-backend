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

export {
  index
}