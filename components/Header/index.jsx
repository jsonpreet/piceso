import Image from "next/image";
import Logo from "./Logo";


export default function Header({ rootRef }) {
  return (
    <div className='header-section flex flex-row items-start justify-between w-full lg:px-20 px-4 py-5'>
      <div className='flex flex-row items-center'>
        <a href='https://deso.com' className='flex flex-row items-center justify-center'>
          <Image src="/logo-deso-white.svg" alt="Deso Logo" width={100} height={35} />
        </a>
        <h3 className='font-semibold ml-2 text-[#daedff]'>/</h3>
        <h3 className='font-semibold ml-2 text-[#daedff]'>Shot</h3>
      </div>
    </div>
  );
}
