import Head from "next/head";
import { useRef, useState } from "react";
import Header from "../components/Header";
import SidePanel from "../components/SidePanel";
import TweetCard from "../components/TweetCard";
import ExportButton from "../components/ExportButton";
import Arrow from "../components/Arrow";
import { useDarkStore } from "../store/dark";
import Input from "../components/Header/Input";

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const rootRef = useRef();

  const isDark = useDarkStore((state) => state.isDark);

  return (
    <>
      <Head>
        <title>Piceso</title>
        <meta name="title" content="Piceso" />
      </Head>
      <div className="relative">
        {/* <Arrow /> */}
        <div className="relative z-10 flex h-screen flex-col overflow-hidden">
          <Header rootRef={rootRef} />
          <div className='grid lg:grid-cols-[calc(100%-400px)_400px] max-w-[1400px] mx-auto w-full relative mt-0 md:my-5'>
            <div className="flex flex-none flex-col items-center justify-start px-0 lg:pl-5 pr-0 lg:pr-5 max-w-full lg:mx-0 lg:top-[40px] lg:sticky w-full">
              <div className="origin-top flex items-center mb-5 justify-center max-w-full md:max-w-[800px] w-full mx-auto">
                <Input />
              </div>
              <div className="origin-top flex items-center justify-center max-w-full md:max-w-[800px] w-full mx-auto">
                <TweetCard rootRef={rootRef} />
              </div>
            </div>
            <div className="mt-2 lg:mt-0 lg:pr-5">
              <SidePanel />
            </div>
          </div>
          {/* <div className="absolute bottom-8 z-[-5] flex h-11 w-full justify-center lg:hidden">
            <ExportButton rootRef={rootRef} />
          </div> */}
        </div>
      </div>
    </>
  );
}
