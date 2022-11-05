import { IListData } from "../type/ListData";
import { IToDOData } from "../type/ToDoData";
import Component from "./Component";

export class List extends Component {
  private wrapper: HTMLElement;
  private static data: IToDOData[];
  constructor({ wrapper, data }: IListData) {
    super();
    this.wrapper = wrapper;
    List.data = data;
  }

  public render() {
    this.wrapper.innerHTML += Component.listView(List.data);
  }

  public bindEvents() {
    const oTodoList: HTMLElement = document.querySelector(".todo-list")!;
    oTodoList.addEventListener("click", this.handleListClick.bind(this), false);
  }

  private handleListClick(e: Event) {
    const tar = e.target as HTMLElement;
    const tagName = tar.tagName.toLowerCase();
    const oToDoItems: HTMLCollectionOf<Element> =
      document.getElementsByClassName("todo-item")!;
    switch (tagName) {
      case "input":
        this.handleInputClick(tar, oToDoItems);
        break;
      case "button":
        this.handleButtonClick(tar, oToDoItems);
        break;
      default:
        break;
    }
  }
  handleInputClick(tar: HTMLElement, oToDoItems: HTMLCollectionOf<Element>) {
    // get the element with id
    List.data.map((item: IToDOData, index: number) => {
      if (item.id === parseInt(tar.dataset.id!)) {
        item.completed = !item.completed;
        oToDoItems[index].querySelector("span")!.style.textDecoration =
          item.completed ? "line-through" : "";
      }
      return item;
    });
  }
  handleButtonClick(tar: HTMLElement, oToDoItems: HTMLCollectionOf<Element>) {
    // get the element with id
    const updatedData: IToDOData[] = [];
    List.data.forEach((item: IToDOData, index: number) => {
      if (item.id === parseInt(tar.dataset.id!)) {
        // remove html element
        oToDoItems[index].remove();
      } else {
        updatedData.push(item);
      }
    });
    // update data
    List.data = updatedData;
    console.log(List.data);
  }

  static addItem(todoItem: IToDOData) {
    List.data.push(todoItem);
    document.querySelector(".todo-list")!.innerHTML +=
      Component.listItemView(todoItem);
  }
}
