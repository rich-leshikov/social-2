const {prisma} = require('../prisma/prisma-client')

const FollowController = {
  followUser: async (req, res) => {
    const {followingId} = req.body
    const userId = req.user.userId

    if (followingId === userId) {
      return res.status(500).json('You can not follow yourself')
    }

    try {
      const existingFollowing = await prisma.follows.findFirst({
        where: {
          AND: [
            {followerId: userId},
            {followingId}
          ]
        }
      })

      if (existingFollowing) {
        return res.status(400).json({error: 'You have already followed this user'})
      }

      await prisma.follows.create({
        data: {
          follower: {connect: {id: userId}},
          following: {connect: {id: followingId}}
        }
      })

      res.status(201).json({message: 'You have followed successfully'})
    } catch (error) {
      console.error('Follow user error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  unfollowUser: async (req, res) => {
    res.send('unfollow User')
  },
}

module.exports = FollowController