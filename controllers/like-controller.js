const {prisma} = require('../prisma/prisma-client')

const LikeController = {
  likePost: async (req, res) => {
    const {postId} = req.body
    const userId = req.user.userId

    if (!postId) {
      return res.status(400).json({error: 'All fields required'})
    }

    try {
      const existingLike = await prisma.like.findFirst({
        where: {postId, userId}
      })

      if (existingLike) {
        return res.status(400).json({error: 'You have already liked this post'})
      }

      const like = await prisma.like.create({
        data: {postId, userId}
      })

      res.json(like)
    } catch (error) {
      console.error('Like post error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  unlikePost: async (req, res) => {
    res.send('unlikePost')
  },
}

module.exports = LikeController