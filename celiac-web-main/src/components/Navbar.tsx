"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import parentLogo from "../../public/ParentLogo.png";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import "./MiddleHome.css";
import { usePathname } from "next/navigation";
import Auth from "@/components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { modelActions } from "@/store/modelSlice";
import CustomModalMenue from "./CustomModalMenue/CustomModalMenue";
import { FaRegUser } from "react-icons/fa6";
import "./MiddleHome.css"
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useLogoutMutation } from "@/api/AuthApiSlice";
import { useGetCartQuery } from "@/api/CommitteeApiSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBranchVisible, setIsBranchVisible] = useState(false);
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const userToken = useSelector((state: any) => state.Model.userLogin);
  const pathname = usePathname();
  const { data: cartData } = useGetCartQuery();
  console.log(cartData)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleBranchVisibility = () => {
    setIsBranchVisible(!isBranchVisible);
  };
  const dispatch = useDispatch();
  const openModelAction = () => {
    dispatch(modelActions.openModel());
  };

  const openModelActionMenu = () => {
    dispatch(modelActions.openModelMenu());
  }
  const closeModelActionMenu = () => {
    dispatch(modelActions.closeModelMenu());
  }
  // const handleLogOut = () => {
  //   localStorage.removeItem('celiacToken')

  //   // @ts-ignore
  //   dispatch(modelActions.SetToken(null));
  // }

  useEffect(() => {

    const token = localStorage.getItem("celiacToken")
    if (token) {
      const parsedToke = JSON.parse(token)
      dispatch(modelActions.SetToken(parsedToke));
    }
  }, [])
  const handleLogOut = () => {
    logout().unwrap();
    localStorage.removeItem('celiacToken');
    //@ts-ignore
    dispatch(modelActions.SetToken(null));
    window.location.reload()

  };
  return (
    <>
      <Auth />
      <header className="bg-white  w-full fixed top-0 z-[999] ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Image
              src={parentLogo}
              alt="ParentLogo"
              className="w-[140px]"
            ></Image>

            <div className="md:flex justify-between md:items-center md:gap-6">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm rtl:gap-6">
                  <li >
                    <Link
                      className={`${pathname === "/en"
                        ? "font-extrabold text-green-600"
                        : "text-black"
                        }`}
                      href="/"
                    >
                      الرئيسية
                    </Link>
                  </li>

                  <div className="relative dropdown">
                    <button
                      onClick={toggleDropdown}

                      className={`dropdown-trigger  h-[70px] ${pathname.includes('/aboutUs') ? 'font-extrabold text-green-600 ' : 'text-black'}   flex items-center justify-between px-4 py-2 rounded-md text-black hover:text-[#019867]`}
                    >
                      <span className=" text-sm font-medium">من نحن</span>
                      <svg
                        className={`h-5 w-5 ${isOpen ? "transform transition  rotate-180" : ""
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="dropdown-menu absolute right-0  w-48 text-center bg-white border border-gray-200 rounded shadow-lg z-10">
                        <Link
                          href="/en/aboutUs/AboutAssociation"
                          className={`    block border-b border-gray-200 px-4 py-2 text-sm hover:bg-[#9A9A3A]
                         ${pathname.includes("AboutAssociation")
                              ? " bg-[#9A9A3A] "
                              : "text-gray-700"
                            }`}

                        >
                          عن الجمعيه
                        </Link>

                        <Link
                          href="/en/aboutUs/boardMembers"

                          className={`block px-4  border-b border-gray-200  py-2 text-sm text-gray-700 hover:bg-[#9A9A3A]
                          ${pathname.includes('boardMembers') ? ' bg-[#9A9A3A] ' : 'text-gray-700'}`}

                        >
                          مجلس الادارة
                        </Link>
                        <Link
                          href="/en/aboutUs/generalAssembly"
                          className={`block  border-b border-gray-200  px-4 py-2 text-sm text-gray-700 hover:bg-[#9A9A3A]
                          ${pathname.includes('generalAssembly') ? ' bg-[#9A9A3A] ' : 'text-gray-700'} `}

                        >
                          الجمعية العمومية
                        </Link>
                        <Link
                          href="/en/aboutUs/organizationChart"
                          className={`block  border-b border-gray-200  px-4 py-2 text-sm text-gray-700 hover:bg-[#9A9A3A]
                          ${pathname.includes('organizationChart') ? ' bg-[#9A9A3A] ' : 'text-gray-700'}`}

                        >
                          الهيكل التنظيمي
                        </Link>
                        <Link
                          href="/en/aboutUs/Committees"
                          className={` block   border-b border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-[#9A9A3A]
                          ${pathname.includes('Committees') ? ' bg-[#9A9A3A] ' : 'text-gray-700'}`}

                        >
                          اللجان
                        </Link>
                        <Link
                          href="/en/aboutUs/GovAndTrans"
                          className={`block  border-b border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-[#9A9A3A]
                          ${pathname.includes('GovAndTrans') ? ' bg-[#9A9A3A] ' : 'text-gray-700'}`}

                        >
                          الحوكمة والشفايفة
                        </Link>
                      </div>

                    )}
                  </div>

                  <li>
                    <Link
                      className={` ${pathname.includes('/clinic') ? 'font-extrabold text-green-600 ' : 'text-black'}    text-black transition hover:text-[#019867]`}
                      href="/en/clinic"
                    >
                      العيادة
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:text-[#019867]"
                      href="/en/services"
                    >
                      خدماتنا
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:text-[#019867]"
                      href="/en/MediaCenter"
                    >
                      المركز الاعلامى
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:text-[#019867]"
                      href="/en/ContributeWithUs"
                    >
                      ساهم معنا
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-black transition hover:text-[#019867]"
                      href="/en/contactUs"
                    >
                      تواصل معنا
                    </Link>
                  </li>
                </ul>
              </nav>



              <CustomModalMenue
                bg="#015D3F"
                initState={true}
              >
                <ul className="cursor-pointer   flex justify-center items-center flex-col  text-white gap-4">
                  <li><Link onClick={closeModelActionMenu} href='/'>الرئيسية</Link></li>
                  <li>
                    <div className="relative">
                      <button
                        onClick={toggleBranchVisibility}
                        className={` ${isBranchVisible ? 'font-extrabold' : 'text-black'
                          } flex items-center justify-between px-4 py-2 rounded-md text-black  transition-all ease duration-500`}
                      >
                        <span className=" text-sm font-medium  text-white">من نحن</span>
                        <svg
                          className={`h-5 w-5 ${isBranchVisible ? 'transform rotate-180' : ''
                            }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {isBranchVisible && (
                        <ul className="list-disc  my-6  text-white ">
                          <li className={isBranchVisible ? 'fadeInLi' : ''}>
                            <Link
                              href="/en/aboutUs/AboutAssociation"
                              className="block border-b border-white px-4 py-2 text-sm"
                              onClick={closeModelActionMenu}
                            >
                              عن الجمعيه
                            </Link>
                          </li>

                          <li className={isBranchVisible ? 'fadeInLi' : ''}>
                            <Link
                              href="/en/aboutUs/boardMembers"
                              className="block border-b border-white px-4 py-2 text-sm"
                              onClick={closeModelActionMenu}
                            >
                              مجلس الادارة
                            </Link>
                          </li>

                          <li className={isBranchVisible ? 'fadeInLi' : ''}>
                            <Link
                              href="/en/aboutUs/generalAssembly"
                              className="block border-b border-white px-4 py-2 text-sm"
                              onClick={closeModelActionMenu}
                            >
                              الجمعية العمومية
                            </Link>
                          </li>


                          <li className={isBranchVisible ? 'fadeInLi' : ''}>
                            <Link
                              href="/en/aboutUs/organizationChart"
                              className="block border-b border-white px-4 py-2 text-sm"
                              onClick={closeModelActionMenu}
                            >
                              الهيكل التنظيمي
                            </Link>
                          </li>

                          <li className={isBranchVisible ? 'fadeInLi' : ''}>
                            <Link
                              href="/en/aboutUs/Committees"
                              className="block border-b border-white px-4 py-2 text-sm"
                              onClick={closeModelActionMenu}
                            >
                              اللجان
                            </Link>
                          </li>


                          <li className={isBranchVisible ? 'fadeInLi' : ''}>
                            <Link
                              href="/en/aboutUs/GovAndTrans"
                              className="block border-b border-white px-4 py-2 text-sm"
                              onClick={closeModelActionMenu}
                            >
                              الحوكمة والشفايفة
                            </Link>
                          </li>

                        </ul>
                      )}
                    </div>
                  </li>
                  <li><Link onClick={closeModelActionMenu} href='/en/clinic' >العيادة</Link></li>
                  <li><Link onClick={closeModelActionMenu} href='/en/services' >خدماتنا</Link></li>
                  <li><Link onClick={closeModelActionMenu} href='/en/MediaCenter' >المركز الاعلامى</Link></li>
                  <li><Link onClick={closeModelActionMenu} href='/en/ContributeWithUs' >ساهم معنا</Link></li>
                  <li><Link onClick={closeModelActionMenu} href='/en/contactUs' >تواصل معنا</Link></li>
                </ul>
              </CustomModalMenue>
            </div>
            {
              userToken ? (
                <div className="flex items-center gap-4">
                  <Link href='/en/cart' className="block sm:hidden xs:hidden md:flex lg:flex items-center relative">
                    <IoCartOutline className="media text-[24px]" />
                    {cartData?.data?.donations_count > 0 && <span className="  w-5 h-5 rounded-full flex items-center justify-center bg-[#019867] text-white absolute top-[-8px] text-[14px] font-bold start-[10px]">{cartData?.data?.donations_count}</span>}
                  </Link>
                  <Link href='/en/profile' className="block sm:hidden xs:hidden md:flex lg:flex items-center">
                    <CiUser className="media text-[24px]" />
                  </Link>
                  <div className="block sm:hidden xs:hidden md:flex lg:flex items-center">
                    <IoIosNotificationsOutline className="media text-[24px]" />
                  </div>
                </div>
              ) : (
                ""
              )
            }
            {
              userToken == null ? (
                <button
                  className="rounded-3xl bg-[#019867] px-[10px] py-[8px] text-sm    font-medium text-center text-white shadow"
                  
                  onClick={openModelAction}
                >
                  تسجيل الدخول
                </button>
              ) : (
                <button
                  className="rounded-3xl bg-[#019867] px-[10px] py-[8px] text-sm    font-medium text-center text-white shadow"
                 
                  onClick={handleLogOut}
                >
                  تسجيل الخروج
                </button>
              )
            }
            <div className="block lg:hidden md:hidden" onClick={openModelActionMenu}>
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </header >
    </>
  );
}

export default Navbar;
