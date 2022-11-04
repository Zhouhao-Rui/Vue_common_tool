import { ITodo } from "./type";
class TodoEvent {
  private static instance: TodoEvent;
  private todoItems: ITodo[] = [];
  public static create() {
    if (!TodoEvent.instance) {
      TodoEvent.instance = new TodoEvent();
    }
    return TodoEvent.instance;
  }
  public addTodo(todo: ITodo): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      const _todo: ITodo = this.todoItems.find(
        (t) => t.content === todo.content
      )!;

      if (_todo) {
        alert("Has already existed");
        reject(1001);
      } else {
        this.todoItems.push(todo);
        resolve(todo);
      }
    });
  }

  public removeTodo(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.todoItems = this.todoItems.filter((t) => {
        return t.id != id;
      });
      resolve(id);
    });
  }

  public toggleTodo(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.todoItems = this.todoItems.map((t) => {
        if (t.id === id) {
          t.completed = !t.completed;
        }
        return t;
      });
      resolve(id);
    });
  }
}

export default TodoEvent;
