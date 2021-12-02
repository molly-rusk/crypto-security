const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const userAccepted = bcrypt.compareSync(password, users[i].passHash)
          if (userAccepted) {
            let userToReturn = {...users[i]}
            delete userToReturn.passHash
            res.status(200).send(userToReturn)
            return
          }
        }
      }
      res.status(400).send("User not found.")
      
    },
    register: (req, res) => {
        
        const {username, email, firstName, lastName, password} = req.body
        
        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)

        let userObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        }

        users.push(userObj)
    
        let userToReturn = {...userObj}
        delete userToReturn.passHash
        res.status(200).send(userToReturn)

        console.log(userToReturn)
        
    }
}