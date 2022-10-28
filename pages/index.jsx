import Head from "next/head";
import { useRef, useState } from "react";
import Header from "../components/Header";
import SidePanel from "../components/SidePanel";
import DeSoCard from "../components/DeSoCard";
import { useDarkStore } from "../store/dark";
import Input from "../components/Header/Input";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const rootRef = useRef();
  const isDark = useDarkStore((state) => state.isDark);

  return (
    <>
      <Head>
        <title>Piceso</title>
        <meta name="title" content="Piceso" />
      </Head>
      <div className="relative h-screen" style={{ backgroundImage: 'linear-gradient(347deg, #031128 0% 40%, #0000ff33 90% 40%)'}}>
        <div className="relative z-10 flex flex-col overflow-hidden w-full items-start justify-center">
          <Header rootRef={rootRef} />
          <div className="min-h-screen object-cover opacity-[0.1] fixed inset-0">
            <svg width="100%" height="100%">
              <pattern id="pattern-circles" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="15" cy="15" r="1.6257413380501518" fill="#fff"></circle>
              </pattern>
              <rect  id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
          </div>
          <div className='grid lg:grid-cols-[calc(100%-400px)_400px] max-w-[1400px] mx-auto w-full relative mt-0 md:my-5'>
            <div className="flex flex-none flex-col items-center justify-start px-0 lg:pl-5 pr-0 lg:pr-5 max-w-full lg:mx-0 lg:top-[40px] lg:sticky w-full">
              <div className="origin-top flex items-center mb-2 justify-center max-w-full md:max-w-[800px] w-full mx-auto">
                <Input />
              </div>
              <div className="origin-top flex items-center justify-center max-w-full md:max-w-[800px] w-full mx-auto">
                <DeSoCard rootRef={rootRef} />
              </div>
            </div>
            <div className="mt-2 lg:mt-0 lg:pr-5">
              <SidePanel rootRef={rootRef} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={3} />
    </>
  );
}
