import { Post } from '../models/post'

function index(req, res) {
  Post.find({})
  .populate('poster')
  .then(posts => {
    res.render('posts/index', {
      posts,
      title: 'Posts'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index
}