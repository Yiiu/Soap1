import dbPicture, { Picture } from '../model/Picture'

export interface PictureListQuery {
  page?: number
  pageSize?: number
}

export const getPictureListAll = async (query: PictureListQuery) => {
  // const {
  //   page = 1,
  //   pageSize = 10
  // } = query
  return await dbPicture
    .find()
    .populate({path: 'user', select: '-hash -salt'})
}