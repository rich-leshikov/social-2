const {prisma} = require("../prisma/prisma-client")
const bcrypt = require('bcryptjs')
const jdenticon = require('jdenticon')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const UserController = {
  register: async (req, res) => {
    const {email, password, name} = req.body

    if (!email || !password || !name) {
      return res.status(400).json('All fields required!')
    }

    try {
      const isUserExist = !!(await prisma.user.findUnique({where: {email}}))

      if (isUserExist) {
        return res.status(400).json({error: 'User already exists'})
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const avatarPng = jdenticon.toPng(name, 200)
      const avatarName = `${name}_${Date.now()}.png`
      const avatarPath = path.join(__dirname, '../uploads', avatarName)
      fs.writeFileSync(avatarPath, avatarPng)

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          avatarUrl: `/uploads/${avatarPath}`
        }
      })

      res.json(user)
    } catch (error) {
      console.error('Error in registration', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  login: async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
      return res.status(400).json('All fields required!')
    }

    try {
      const user = await prisma.user.findUnique({where: {email}})

      if (!user) {
        return res.status(400).json({error: 'Email or password is incorrect'})
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return res.status(400).json({error: 'Email or password is incorrect'})
      }

      const token = jwt.sign(({userId: user.id}), process.env.SECRET_KEY)

      res.json({token})
    } catch (error) {
      console.error('Login error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  },
  getUserById: async (req, res) => {
    const {id} = req.params
    const userId = req.user.userId

    try {
      const user = await prisma.user.findUnique({
        where: {id},
        include: {
          followers: true,
          following: true,
        }
      })

      if (!user) {
        return res.status(404).json({error: 'User was not found'})
      }

      const isFollowing = await prisma.follows.findFirst({
        where: {
          AND: [
            {followerId: userId},
            {followingId: id},
          ]
        }
      })

      res.json({...user, isFollowing: Boolean(isFollowing)})
    } catch (error) {
      console.error('Error of getting current user', error)

      res.status(500).json({error: 'Internal server error'})
    }
  },
  updateUser: async (req, res) => {
    res.send('updateUser')
  },
  current: async (req, res) => {
    res.send('current')
  },
}

module.exports = UserController