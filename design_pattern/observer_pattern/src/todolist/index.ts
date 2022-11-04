import TodoDOM from "./TodoDOM";
import TodoEvent from "./TodoEvent";

enum EVENT_TYPE {
  ADD = "add",
  REMOVE = "remove",
  TOGGLE = "toggle",
}

export class ToDoList {
  private static instance: ToDoList;
  private oTodoList: HTMLElement;
  private todoEvent: TodoEvent;
  private todoDom: TodoDOM;
  private addHandlers: any[] = [];
  private removeHandlers: any[] = [];
  private toggleHandlers: any[] = [];

  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList;
    this.initTodo();
  }
  public static create(oToDoList: HTMLElement) {
    if (!ToDoList.instance) {
      ToDoList.instance = new ToDoList(oToDoList);
    }

    return ToDoList.instance;
  }

  private initTodo() {
    this.todoEvent = TodoEvent.create();
    this.todoDom = TodoDOM.create(this.oTodoList);
    console.log(this.todoDom);
    for (let k in EVENT_TYPE) {
      this.initHandlers(EVENT_TYPE[k]);
    }
  }

  private initHandlers(type: EVENT_TYPE) {
    switch (type) {
      case EVENT_TYPE.ADD:
        this.addHandlers.push(this.todoEvent.addTodo.bind(this.todoEvent));
        this.addHandlers.push(this.todoDom.addItem.bind(this.todoDom));
        break;
      case EVENT_TYPE.REMOVE:
        this.removeHandlers.push(
          this.todoEvent.removeTodo.bind(this.todoEvent)
        );
        this.removeHandlers.push(this.todoDom.removeItem.bind(this.todoDom));
        break;
      case EVENT_TYPE.TOGGLE:
        this.toggleHandlers.push(
          this.todoEvent.toggleTodo.bind(this.todoEvent)
        );
        this.toggleHandlers.push(this.todoDom.toggleItem.bind(this.todoDom));
        break;
      default:
        break;
    }
  }

  public notify<T>(type: string, options: T) {
    let i: number = 0;
    let handlers: any[] = [];
    let res: any;
    switch (type) {
      case EVENT_TYPE.ADD:
        handlers = this.addHandlers;
        break;
      case EVENT_TYPE.REMOVE:
        handlers = this.removeHandlers;
        break;
      case EVENT_TYPE.TOGGLE:
        handlers = this.toggleHandlers;
        break;
      default:
        break;
    }

    res = handlers[i](options);

    while (i < handlers.length - 1) {
      i++;
      console.log(res);
      res = res.then((option: any) => {
        return handlers[i](option);
      });
    }
  }
}
