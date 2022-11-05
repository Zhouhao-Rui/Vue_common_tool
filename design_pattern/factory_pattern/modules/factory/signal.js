/**
 * public method, static methods -> parent class
 * private attribute, private method -> three different classes for the different status
 * 
 * Have a factory with some parameters to create many instances
 * 
 * what is factory ?
 *  public class
 *  create method(...params) to create many unique instances
 *  
 */
import STATUS_TYPE from "./statusType.js";

class Signal {
  /**
   * 
   * @param {*} status : different status
   */
  constructor(status) {
    this.status = status;
  }

  get className() {
    let classStr = '';
    switch (this.status) {
      case STATUS_TYPE.success:
        classStr += ' success';
        break;
      case STATUS_TYPE.warning:
        classStr += ' warning';
        break;
      case STATUS_TYPE.fail:
        classStr += ' fail';
        break;
      default:
        break;
    }
    return classStr
  }

  static checkStatus(types, status) {
    for (let key in types) {
      if (types[key] === status) {
        return true;
      }
    }
    return false;
  }

  static outputInfo(info) {
    console.log(info);
  }
}

class SuccessSignal extends Signal {
  constructor(title) {
    super(STATUS_TYPE.success)
    this.title = 'success: ' + title;
  }
}

class WarningSignal extends Signal {
  constructor(title) {
    super(STATUS_TYPE.warning)
    this.title = 'warning: ' + title;
  }

  outputInfo(info) {
    Signal.outputInfo(info);
  }
}

class FailSignal extends Signal {
  constructor(title) {
    super(STATUS_TYPE.fail)
    this.title = 'fail: ' + title;
  }
  outputInfo(info) {
    Signal.outputInfo(info);
  }
}

class SignalFactory {
  constructor(signalDOM) {
    this.singalDOM = signalDOM;
  }

  create(title, status) {
    const isStatusExist = Signal.checkStatus(STATUS_TYPE, status);
    if (!isStatusExist) {
      throw new Error('Status not existed')
    }
    const DOM = this.singalDOM;
    let signalInstance = null
    switch (status) {
      case STATUS_TYPE.success:
        signalInstance = new SuccessSignal(title);
        break;
      case STATUS_TYPE.warning:
        signalInstance = new WarningSignal(title);
        break;
      case STATUS_TYPE.fail:
        signalInstance = new FailSignal(title);
        break;
      default:
        break;
    }
    DOM.innerText = signalInstance.title;
    DOM.className = signalInstance.className;
    return signalInstance;
  }
}

export default SignalFactory;