import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import router, { useRouter } from 'next/router';

import assets from '../assets';
import { Tooltip } from 'flowbite-react';

const Sidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-slate-300 border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/">
            <div className="inline-block p-2 text-white bg-white rounded-lg ">
              <Image
                src={assets.vocational}
                alt="logo"
                width={40}
                height={40}
              />
            </div>
          </Link>

          <span className="border-b-[1px] border-white w-full p-2"></span>

          <Tooltip content="Home" placement="right">
            <Link href="/">
              <div className="inline-block p-3 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.dashboard}
                    alt="dashboard"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Dashboard</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Teacher" placement="right">
            <Link href="/teachermanage">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.teacher}
                    alt="teacher"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Teacher</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Student" placement="right" className="z-50 ">
            <Link href="/student-manager">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.cap}
                    alt="student"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Student</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Subject" placement="right">
            <Link href="/subject">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.bookshelf}
                    alt="subject"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Subject</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Class" placement="right">
            <Link href="/class">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.training}
                    alt="class"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Class</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Report" placement="right">
            <Link href="/report">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.file}
                    alt="report"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Report</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Grade" placement="right">
            <Link href="/grade">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.board}
                    alt="grade"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Grade</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <Tooltip content="Rule" placement="right">
            <Link href="/rules">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image
                    src={assets.scales}
                    alt="rule"
                    width={25}
                    height={25}
                  />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Rule</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>

          <span className="border-b-[1px] border-white w-full p-2"></span>

          <Tooltip content="Logout" placement="right">
            <Link href="/login">
              <div className="inline-block p-3 my-1 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex flex-row">
                  <Image src={assets.login} alt="rule" width={25} height={25} />
                  {/* <p className='mt-1 ml-3 text-md font-poppins'>Rule</p> */}
                </div>
              </div>
            </Link>
          </Tooltip>
        </div>
      </div>
      <main className="w-full ml-20">{children}</main>
    </div>
  );
};

export default Sidebar;
