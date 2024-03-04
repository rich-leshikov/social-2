const {prisma} = require("../prisma/prisma-client")
const bcrypt = require('bcryptjs')
const jdenticon = require('jdenticon')
const path = require('path')
const fs = require('fs')

const UserController = {
  register: async (req, res) => {
    const {email, password, name} = req.body

    if (!email || !password || !name) {
      return res.status(400).json('All fields required!')
    }

    try {
      const isUserExist = await prisma.user.findUnique({where: {email}})

      if (isUserExist) {
        return res.status(400).json({error: 'User has already exist'})
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
    res.send('login')
  },
  getUserById: async (req, res) => {
    res.send('getUserById')
  },
  updateUser: async (req, res) => {
    res.send('updateUser')
  },
  current: async (req, res) => {
    res.send('current')
  },
}

module.exports = UserController