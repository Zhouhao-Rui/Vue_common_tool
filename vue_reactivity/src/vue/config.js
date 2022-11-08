/**
  * can do some side effects in these methods
  * but no need for the other methods, because it has some new values, won't change the value in the vm options
  */
const ARR_METHODS = [
  'push',
  'unshift',
  'pop',
  'shift',
  'sort',
  'splice',
  'reverse'
]

export {
  ARR_METHODS
}