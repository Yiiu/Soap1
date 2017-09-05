import exif from 'core/util/exif/index'
import pify from'pify'
let ExifImage = pify(exif.ExifImage)

export async function getExif (buffer) {
  try {
    let exif = await ExifImage({ image: buffer })
    return exif
  } catch (error) {
    throw error
  }
}