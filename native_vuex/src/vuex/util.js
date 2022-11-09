export function forEachValuekey(obj, cb) {
  Object.keys(obj).forEach((key, index) => {
    cb(obj[key], key)
  })
}