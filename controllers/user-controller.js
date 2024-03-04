const UserController = {
  register: async (req, res) => {
    res.send('login')
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