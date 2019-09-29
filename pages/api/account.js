import User from '../../models/User'
import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
  // check if there is an authorization header
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    )
    const user = await User.findOne({ _id: userId })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    // 403 - forbidden action to get the credentials
    res.status(403).send('Invalid token')
  }
}
