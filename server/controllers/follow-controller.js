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

      res.status(201).json({message: 'You have followed the user successfully'})
    } catch (error) {
      console.error('Follow user error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  unfollowUser: async (req, res) => {
    const {id: followingId} = req.params
    const userId = req.user.userId

    try {
      const follows = await prisma.follows.findFirst({
        where: {
          AND: [
            {followerId: userId},
            {followingId}
          ]
        }
      })

      if (!follows) {
        return res.status(404).json({error: 'Following has not already exist'})
      }

      await prisma.follows.delete({
        where: {id: follows.id}
      })

      res.status(201).json({message: 'You have unfollowed the user successfully'})
    } catch (error) {
      console.error('Unfollow user error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
}

module.exports = FollowController