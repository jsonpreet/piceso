import html2canvas from "html2canvas";
import { BiCopyAlt } from "react-icons/bi";
import { BsSave } from "react-icons/bs";
import { useCardStore } from "../store/card";

export default function ExportButton({ rootRef, className }) {
  const setExport = useCardStore((state) => state.setExport);
  async function exportPNG() {
    setExport(true);
    if (rootRef.current !== undefined) {
      const canvas = await html2canvas(rootRef.current, {
        allowTaint: true,
        useCORS: true,
        scale: 5,
        backgroundColor: null,
      });
      const img = canvas.toDataURL("image/png", 1.0);

      const a = document.createElement("a");
      a.href = img;
      a.download = "deso.png";
      a.click();
      a.remove();
      setExport(false);
    }
  }

  async function copytoClipboard() {
    setExport(true);
    if (rootRef.current !== undefined) {
      const canvas = await html2canvas(rootRef.current, {
        allowTaint: true,
        useCORS: true,
        scale: 5,
        backgroundColor: null,
      });

      canvas.toBlob((blob) => {
        const data = [new ClipboardItem({ "image/png": blob })];
        navigator.clipboard.write(data);
      });
      setExport(false);
    }
  }

  return (
    <div className="grid grid-cols-2 divide-x divide-[#061830]">
      <div className="py-3 px-4">
        <button className="w-full p-4 shadow-lg text-[#6d4800] hover:bg-[#ffcf26] bg-[#ffda59] border border-transparent hover:scale-[0.98] active:scale-[0.95]  flex items-center justify-center duration-100 cursor-pointer rounded-full font-extrabold" onClick={exportPNG}>
          <BsSave size={18} className="mr-2" />
          Save
        </button>
      </div>
      <div className="py-3 px-4">
        <button className="w-full p-4 shadow-lg text-[#6d4800] hover:bg-[#ffcf26] bg-[#ffda59] border border-transparent hover:scale-[0.98] active:scale-[0.95]  flex items-center justify-center duration-100 cursor-pointer rounded-full font-extrabold" onClick={copytoClipboard}>
          <BiCopyAlt size={18} className="mr-2" />
          Copy
        </button>
      </div>
    </div>
  );
}
