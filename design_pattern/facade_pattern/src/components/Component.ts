import { IToDOData } from "../type/ToDoData";

abstract class Component {
  protected static inputView(text: string, btnText: string): string {
    return `
      <div>
        <input type="text" class="todo-input" placeholder=${text}>
        <button class="add-btn">${btnText}</button>
      </div>
    `;
  }

  protected static listView(data: IToDOData[]): string {
    return `
    <div class="todo-list">
      ${
        data
          ? data.map((todo: IToDOData) => {
              return Component.listItemView(todo);
            })
          : ""
      }
    </div>
    `
      .split(",")
      .join("");
  }

  protected static listItemView(data: IToDOData): string {
    return `
      <div class="todo-item">
          <input type="checkbox" ${data.completed ? "checked" : ""} data-id='${
      data.id
    }'  />
          <span style="text-decoration: ${
            data.completed ? "line-through" : "none"
          }">${data.content}</span>
          <button data-id='${data.id}'>delete</button>
      </div>
    `;
  }
}

export default Component;
