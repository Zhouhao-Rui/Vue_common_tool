import ToDoList from "./components/ToDoList";
import { IToDOData } from "./type/ToDoData";
((doc) => {
  const oApp = doc.querySelector("#app") as HTMLElement;

  const todoData: IToDOData[] = [
    {
      id: 1,
      content: "hello",
      completed: false,
    },
    {
      id: 2,
      content: "good",
      completed: false,
    },
    {
      id: 3,
      content: "Cheers",
      completed: false,
    },
  ];

  const init = (): void => {
    // return template string
    const todoList = new ToDoList(oApp!, todoData);
    todoList.init();
  };

  init();
})(document);
