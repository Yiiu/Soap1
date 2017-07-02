/**
 * Created by yuer on 2017/5/19.
 */

export function filterObj (obj, arr) {
  if (!obj) return null
  obj = Object.create(obj)
  let newObj = {}
  arr.forEach(type => {
    newObj[type] = obj[type] || null
  })
  return newObj
}
