import CheckedBox from "@/assets/checkbox/checkedBox.svg?react";
import EmptyBox from "@/assets/checkbox/emptyBox.svg?react";
import { Fragment } from "react";
interface checkboxProps {
  checked: boolean;
}
export default function CheckBox({ checked }: checkboxProps) {
  return <Fragment>{checked ? <CheckedBox /> : <EmptyBox />}</Fragment>;
}
