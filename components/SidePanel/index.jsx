import Text from "./Text";
import Colors from "./Colors";
import Size from "./Card";
import Templates from "./Templates";


export default function SidePanel({ isPanelOpen }) {
  return (
    <aside
      className={`h-full w-70 self-end overflow-hidden p-6 transition-transform duration-200 ease-out lg:translate-x-0 ${
        isPanelOpen ? "translate-x-0" : "translate-x-60"
      }`}
    >
      <div
        className={`scrollbar h-full overflow-y-auto border bg-gray-100 border-gray-200 shadow-lg rounded-xl text-sm dark:bg-[#2c2c2c] dark:[&_h2]:text-white`}
      >
        <Size />
        <Colors />
        <Text />
        <Templates />
      </div>
    </aside>
  );
}
