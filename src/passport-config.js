const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize (passport, getUserByName) {
  const authenticateUser = async (name, password, done) => {
    const user = getUserByName(name.toLowerCase())
    if (user == null) {
      return done(null, false, { message: 'No user with that username' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.name))
  passport.deserializeUser((user, done) => {
    return done(null, user)
  })
}

module.exports = initialize