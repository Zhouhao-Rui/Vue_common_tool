import { ITodo } from "./type";

class TodoDOM {
  private static instance: TodoDOM;
  private oTodoList: HTMLElement;
  constructor(oToDoList: HTMLElement) {
    this.oTodoList = oToDoList;
  }
  public static create(oTodoList: HTMLElement) {
    if (!TodoDOM.instance) {
      TodoDOM.instance = new TodoDOM(oTodoList);
    }
    return TodoDOM.instance;
  }

  public addItem(todo: ITodo): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItem: HTMLElement = document.createElement("div");
      oItem.className = "todo-items";
      oItem.innerHTML = this.todoVue(todo);
      this.oTodoList.append(oItem);
      resolve();
    });
  }

  public removeItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItems: HTMLCollection =
        document.getElementsByClassName("todo-items");
      Array.from(oItems).forEach((oItem) => {
        const _id = parseInt(
          oItem.querySelector("button")?.dataset.id as string
        );
        if (_id === id) {
          oItem.remove();
          resolve();
        }
      });
    });
  }

  public toggleItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItems: HTMLCollection =
        document.getElementsByClassName("todo-items");
      Array.from(oItems).forEach((oItem) => {
        const oCheckbox = oItem.querySelector("input");
        const _id = parseInt(
          oItem.querySelector("button")?.dataset.id as string
        );
        if (_id === id) {
          const oSpan: HTMLElement | null = oItem.querySelector("span");
          if (oSpan) {
            oSpan.style.textDecoration = oCheckbox?.checked
              ? "line-through"
              : "none";
          }
        }
      });
    });
  }

  public todoVue({ id, content, completed }: ITodo): string {
    return `
      <input type="checkbox" ${completed ? "checked" : ""} data-id="${id}" />
      <span style="text-decotation: ${
        completed ? "line-through" : "none"
      }">${content}</span>
      <button data-id="${id}">Delete</button>
    `;
  }
}

export default TodoDOM;
