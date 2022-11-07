const STATUS = {
  PENDING: "PENDING",
  FULLFILLED: "FULLFILLED",
  REJECTED: "REJECTED"
}

class MyPromise {
  /**
   * instant execution with resolve and reject
   */
  constructor(executor) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFullfilledCbs = []
    this.onRejectedCbs = []
    // every promise instance should have own instance
    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULLFILLED;
        this.value = value;
        // publish
        this.onFullfilledCbs.forEach((cb) => {
          cb()
        })
      }

    }
    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
        // publish
        this.onRejectedCbs.forEach((cb) => {
          cb()
        })
      }

    }
    executor(resolve, reject);
  }

  then(onFullfilled, onRejected) {
    let promise2 = new MyPromise((resolve, reject) => {
      switch (this.status) {
        case STATUS.FULLFILLED:
          setTimeout(() => {
            try {
              let x = onFullfilled(this.value);
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
          break;
        case STATUS.REJECTED:
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
          break;
        case STATUS.PENDING:
          // collect and subscribe
          this.onFullfilledCbs.push(() => {
            try {
              onFullfilled(this.value);
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
          this.onRejectedCbs.push(() => {
            try {
              onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
          break;
      }
    })

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected'))
  }

  // should only be called once, lock
  let called = false;

  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) {
            return
          }
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) {
            return
          }
          reject(r)
          called = true;
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e)
      called = true;
    }
  } else {
    resolve(x)
    called = true;
  }
}

let promise = new MyPromise((resolve, reject) => {
  resolve('213')
})
promise.then((val) => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(val)
    }, 2000)
  })
}).then(res => {
  console.log(res)
})