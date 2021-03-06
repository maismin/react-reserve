import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
  const { email, password } = req.body
  try {
    // 1) check if a user exists with the provided email
    const user = await User.findOne({ email }).select('+password')
    // 2) if not, return an error
    if (!user) {
      return res.status(404).send('No user exists with that email')
    }
    // 3) check if user password matches the one in the DB
    const passwordsMatch = await bcrypt.compare(password, user.password)
    // 4) if so, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })
      // 5) send token to the client
      res.status(200).json(token)
    } else {
      res.status(401).send('Passwords do not match')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error logging in user')
  }
}
