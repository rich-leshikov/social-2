const {prisma} = require('../prisma/prisma-client')

const PostController = {
  createPost: async (req, res) => {
    const {content} = req.body

    const authorId = req.user.userId

    if (!content) {
      return res.status(400).json({error: 'All fields are required'})
    }

    try {
      const post = await prisma.post.create({
        data: {
          authorId,
          content,
        }
      })

      res.json(post)
    } catch (error) {
      console.error('Create post error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  getAllPosts: async (req, res) => {
    const userId = req.user.userId

    try {
      const posts = await prisma.post.findMany({
        include: {
          likes: true,
          author: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      const postsLikedByUser = posts.map(post => ({
        ...post,
        likedByUser: post.likes.some(like => like.userId === userId)
      }))

      res.json(postsLikedByUser)
    } catch (error) {
      console.error('Get posts error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  getPostById: async (req, res) => {
    const {id} = req.params
    const userId = req.user.userId

    try {
      const post = await prisma.post.findUnique({
        where: {id},
        include: {
          likes: true,
          author: true,
          comments: {
            include: {
              user: true
            }
          },
        }
      })

      if (!post) {
        return res.status(404).json({error: 'Post not found'})
      }

      const postLikedByUser = {
        ...post,
        likedByUser: post.likes.some(like => like.userId === userId)
      }

      res.json(postLikedByUser)
    } catch (error) {
      console.error('Get post by id error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  deletePost: async (req, res) => {
    const {id} = req.params
    const userId = req.user.userId

    const post = await prisma.post.findUnique({where: {id}})

    if (!post) {
      return res.status(404).json({error: 'Post not found'})
    }

    if (post.authorId !== userId) {
      return res.status(403).json({error: 'No access'})
    }

    try {
      const filteredPosts = await prisma.$transaction([
        prisma.comment.deleteMany({where: {postId: id}}),
        prisma.like.deleteMany({where: {postId: id}}),
        prisma.post.delete({where: {id}})
      ])

      res.json(filteredPosts)
    } catch (error) {
      console.error('Delete post error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
}

module.exports = PostController