
declare namespace Express {
  export interface Request {
    auth?: any
    model: {
      user: any
    }
  }
}