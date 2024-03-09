const {prisma} = require('../prisma/prisma-client')

const FollowController = {
  followUser: async (req, res) => {
    res.send('follow User')
  },
  unfollowUser: async (req, res) => {
    res.send('unfollow User')
  },
}

module.exports = FollowController