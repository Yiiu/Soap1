import { ApiError } from '../util'
import { UserInterface } from '../model/User'

import oauth from '../oauth'
import * as crypto from 'crypto'

async function isUser (user: UserInterface, password: string) {
  const salt = user.salt
  const hash = await crypto.pbkdf2Sync(password, salt, 20, 32, 'sha512').toString('hex')
  if (hash === user.hash) {
    return true;
  } else {
    throw {
      name: 'exist_password'
    }
  }
}

export const token = async (req, res, next) => {
  try {
    const token = await oauth.token(req, res)
    return res.json(token)
    // await isUser(user, req.body.password)
    // delete user.hash
    // delete user.salt
    // return res.json({
    //   accessToken,
    //   refreshToken,
    //   user: {
    //     nickname: user.nickname,
    //     login_at: user.login_at,
    //     email: user.email,
    //     description: user.description,
    //     avatar: user.avatar,
    //     cover: user.cover,
    //     like: user.like,
    //     followers: user.followers,
    //     following: user.following,
    //     created_at: user.created_at,
    //     updated_at: user.updated_at,
    //     website: user.website,
    //     location: user.location,
    //     photos: user.photos,
    //     _id: user._id,
    //     username: user.username
    //   },
    //   accessTokenExpiresAt,
    //   refreshTokenExpiresAt
    // })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}
