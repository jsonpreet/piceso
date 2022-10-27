import { Dispatch, MutableRefObject, SetStateAction } from "react";
import ButtonGroup from "./ButtonGroup";
import Info from "./Info";
import Input from "./Input";
import Logo from "./Logo";


export default function Header({ setIsPanelOpen, rootRef }) {
  return (
    <header className="flex items-center justify-between gap-x-4 bg-white px-4 py-2 shadow dark:bg-[#2c2c2c]">
      <Logo />
      <Input />
      <Info />
      <ButtonGroup setIsPanelOpen={setIsPanelOpen} rootRef={rootRef} />
    </header>
  );
}
