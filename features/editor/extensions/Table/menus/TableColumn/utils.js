import { isTableSelected } from "../../utils";
import { Table } from "../..";

export const isColumnGripSelected = ({ editor, view, state, from }) => {
  const domAtPos = view.domAtPos(from).node;
  const nodeDOM = view.nodeDOM(from);
  const node = nodeDOM || domAtPos;

  if (
    !editor.isActive(Table.name) ||
    !node ||
    isTableSelected(state.selection)
  ) {
    return false;
  }

  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement;
  }

  const gripColumn =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-column.selected");

  return !!gripColumn;
};
