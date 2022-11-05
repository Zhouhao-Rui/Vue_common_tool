import { IToDOData } from "../type/ToDoData";
import { Input } from "./Input";
import { List } from "./List";

class TodoList {
  appEL: HTMLElement;
  data: IToDOData[];
  private input: Input;
  private list: List;
  private wrapperEL: HTMLElement;
  constructor(appEL: HTMLElement, data: IToDOData[]) {
    this.appEL = appEL;
    this.data = data;
    this.wrapperEL = document.createElement("div");
  }

  public init() {
    // init components
    this.initComponents();
    // render the components to the DOM
    this.render();
    // binding events
    this.bindEvents();
  }

  private initComponents() {
    this.input = new Input({
      wrapper: this.wrapperEL,
      text: "please",
      btnText: "click",
    });
    this.list = new List({
      wrapper: this.wrapperEL,
      data: this.data,
    });
  }

  private render() {
    this.appEL.appendChild(this.wrapperEL);
    // render input
    this.input.render();
    // render list
    this.list.render();
  }

  private bindEvents() {
    this.input.bindEvents();
    this.list.bindEvents();
  }
}

export default TodoList;
