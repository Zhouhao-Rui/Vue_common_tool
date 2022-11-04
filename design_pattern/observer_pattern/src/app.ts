import { ToDoList } from "./todolist";
import { ITodo } from "./todolist/type";
((doc) => {
  const oToDoList: HTMLElement | null = doc.querySelector(".todo-list");
  const oAddBtn: HTMLElement | null = doc.querySelector(".add-btn");
  const oInput: HTMLInputElement | null = doc.querySelector("input");
  if (oToDoList) {
    const todoList: ToDoList = ToDoList.create(oToDoList);
    const init = (): void => {
      bindEvents();
    };

    const bindEvents = () => {
      oAddBtn?.addEventListener("click", handleBtnClick, false);
      oToDoList.addEventListener("click", handleListClick, false);
    };

    function handleBtnClick(e) {
      const val: string | undefined = oInput?.value.trim();
      if (val) {
        if (!val.length) return;
        todoList.notify<ITodo>("add", {
          id: new Date().getTime(),
          content: val,
          completed: false,
        });
        if (oInput) {
          oInput.value = "";
        }
      }
    }

    function handleListClick(e) {
      const tar = e.target as HTMLElement;
      const tagName = tar.tagName.toLowerCase();
      if (tagName === "input" || tagName === "button") {
        const id: number = parseInt(tar.dataset.id!);
        switch (tagName) {
          case "input":
            todoList.notify<number>("toggle", id);
            break;
          case "button":
            todoList.notify<number>("remove", id);
          default:
            break;
        }
      }
    }

    init();
  }
})(document);
