import { IInput } from "../type/InputData";
import Component from "./Component";
import { List } from "./List";

export class Input extends Component {
  wrapper: HTMLElement;
  text: string;
  btnText: string;
  constructor({ wrapper, text, btnText }: IInput) {
    super();
    this.wrapper = wrapper;
    this.text = text;
    this.btnText = btnText;
  }

  public render() {
    this.wrapper.innerHTML += Component.inputView(this.text, this.btnText);
  }

  public bindEvents() {
    const oAddBtn: HTMLElement = document.querySelector(".add-btn")!;
    const oInput: HTMLElement = document.querySelector(".todo-input")!;
    oAddBtn.addEventListener(
      "click",
      this.handleBtnClick.bind(this, oInput),
      false
    );
  }

  private handleBtnClick(oInput: HTMLInputElement) {
    const val: string = oInput.value.trim();
    if (val.length) {
      // addItem in the List
      List.addItem({
        id: new Date().getTime(),
        content: oInput.value,
        completed: false,
      });
      oInput.value = "";
    }
  }

  // expose functions to the todolist
}
