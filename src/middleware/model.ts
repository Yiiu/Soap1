import { Request, Response, NextFunction } from 'express'
import User, { UserModel } from '../model/User'

export function model () {
  return (req: Request, res: Response, next: NextFunction) => {
    req.model = {
      user: User as UserModel
    }
    next()
  }
}