import html2canvas from "html2canvas";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { BiCopyAlt } from "react-icons/bi";
import { BsSave } from "react-icons/bs";
import { useCardStore } from "../store/card";
import { useDesoStore } from "../store/deso";
import { useCallback } from "react";
import party from "party-js";
import { toast } from "react-toastify";
import { toastOptions } from "../store/constants";

export default function ExportButton({ rootRef, className }) {
  const setExport = useCardStore((state) => state.setExport);
  const d = new Date();
  let time = d.getTime();
  const fileName = 'Shot-WithDeso.com__' + time;

  const saveImage = useCallback(() => {
    const toastId = toast.loading("Exporting image to PNG...", toastOptions)
    setExport(true);
    if (rootRef.current === null) {
      return
    }

    setTimeout(() =>
      toPng(rootRef.current, { cacheBust: true, pixelRatio: 3 }).then((dataUrl) => {
        exportLink(dataUrl, fileName);
        setExport(false);
        party.confetti(rootRef.current, {
          count: party.variation.range(100, 100),
          size: party.variation.range(0.5, 1.5),
        })
      toast.update(toastId, { render: "Image exported!", type: "success", isLoading: false, autoClose: 2000, hideProgressBar: true  });
    })
    .catch((err) => {
      console.log(err);
    })
    , 1500);
  }, [rootRef])

  const exportLink = (dataUrl, fileName) => {
    const link = document.createElement('a')
    link.download = `${fileName}.png`
    link.href = dataUrl
    link.click()
  }

  async function copytoClipboard() {
    const toastId = toast.loading("Copying image...", toastOptions)
    setExport(true);
    if (rootRef.current !== undefined) {
      setTimeout(() =>
        toBlob(rootRef.current, { cacheBust: true, pixelRatio: 3 })
        .then((blob) => {
          const data = [new ClipboardItem({ "image/png": blob })];
          navigator.clipboard.write(data);
          setExport(false);
          party.confetti(rootRef.current, {
            count: party.variation.range(100, 100),
            size: party.variation.range(0.5, 1.5),
          }); 
          toast.update(toastId, { render: "Image copied to Clipboard!", type: "success", isLoading: false, autoClose: 2000, hideProgressBar: true  });
        })
        .catch((err) => {
          console.log(err)
        })
      , 1500);
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 divide-x divide-[#061830]">
        <div className="py-3 px-4">
          <button className="w-full p-4 shadow-lg text-[#6d4800] hover:bg-[#ffcf26] bg-[#ffda59] border border-transparent hover:scale-[0.98] active:scale-[0.95]  flex items-center justify-center duration-100 cursor-pointer rounded-full font-extrabold" onClick={saveImage}>
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
    </>
  );
}
