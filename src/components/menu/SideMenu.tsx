import { AtlasLogoAlt2 } from "@/constants/svg";
import { useAppContext } from "@/context/AppContext";
import { dashboardMenuItems } from "@/data/menu-items";

import { List, SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"; // Import signOut function
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const SideMenu = () => {

  const { isCollapseNavMenu, setCollapseNavMenu, user } = useAppContext();
  const currentRoute = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      // return router.push("/");
    },
  });

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/login'
    });
    router.push('/login');
  };

  return (
    <main
      className="transition-all duration-300 ease-in-out h-screen fixed top-0 shadow-lg z-10"
      style={isCollapseNavMenu ? { width: "230px" } : { width: "auto" }}
    >
      <div
        className="flex items-center mb-[50px] "
        style={
          isCollapseNavMenu
            ? { justifyContent: "space-between" }
            : { justifyContent: "center" }
        }
      >
        <Link href="/"
          className="m-2 max-w-[100px] overflow-hidden"
          style={isCollapseNavMenu ? { display: "block" } : { display: "none" }}
        >
          <Image
            src={AtlasLogoAlt2}
            alt=""
            onClick={() => {
              console.log(
                isCollapseNavMenu ? isCollapseNavMenu : isCollapseNavMenu
              );
              setCollapseNavMenu(!isCollapseNavMenu);
            }}
          />
        </Link>
        <span
          className="m-3"
          onClick={() => {
            console.log(
              isCollapseNavMenu ? isCollapseNavMenu : isCollapseNavMenu
            );
            setCollapseNavMenu(!isCollapseNavMenu);
          }}
        >
          <List size={24} color="#1e1e1e" weight="bold" />
        </span>
      </div>
      <article>
        <Link
          href={`/${session?.user?.userdata?.role}`}
          className={
            currentRoute === `/${session?.user?.userdata?.role}`
              ? "group hover:bg-[#218B53] flex items-center p-2 bg-[#218B53] text-white rounded-lg m-1 cursor-pointer "
              : "group hover:bg-[#218B53] flex items-center p-2 text-[rgb(143,149,178)] rounded-lg m-1 cursor-pointer"
          }
        >
          <span className="mx-2 group-hover:text-white">
            <List size={24} />
          </span>
          <h4
            style={
              isCollapseNavMenu ? { display: "block" } : { display: "none" }
            }
            className=" group-hover:text-white "
          >
            Dashboard
          </h4>
        </Link>
        {dashboardMenuItems.map((element, index) => {
          return (
            <React.Fragment key={index}>
              {element.path === "/" ? ( // Check if the current element represents the logout item
                <button
                  // Attach onClick handler for logout
                  className={
                    currentRoute === `${element.path}`
                      ? "group hover:bg-[#218B53] flex items-center p-2 bg-[#218B53] text-white rounded-lg m-1 cursor-pointer "
                      : "group hover:bg-[#218B53] flex items-center p-2 text-[rgb(143,149,178)] rounded-lg m-1 cursor-pointer"
                  }
                >
                  <span className="mx-2 group-hover:text-white">
                    {element.icon}
                  </span>
                  <h4
                    style={
                      isCollapseNavMenu
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    className=" group-hover:text-white "
                  >
                    {element.title}
                  </h4>
                </button>
              ) : (
                // Render other menu items as links
                <Link
                  href={element.path}
                  style={
                    element.path.includes(session?.user?.userdata?.role as string)
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                  className={
                    currentRoute === `${element.path}`
                      ? "group hover:bg-[#218B53] flex items-center p-2 bg-[#218B53] text-white rounded-lg m-1 cursor-pointer "
                      : "group hover:bg-[#218B53] flex items-center p-2 text-[rgb(143,149,178)] rounded-lg m-1 cursor-pointer"
                  }
                >
                  <span className="mx-2 group-hover:text-white">
                    {element.icon}
                  </span>
                  <h4
                    style={
                      isCollapseNavMenu
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    className=" group-hover:text-white "
                  >
                    {element.title}
                  </h4>
                </Link>
              )}
            </React.Fragment>
          );
        })}
        <Link
          href="/"
          onClick={handleLogout}
          className="group hover:bg-[#218B53] flex items-center p-2 text-[rgb(143,149,178)] rounded-lg m-1 cursor-pointer"
        >
          <span className="mx-2 group-hover:text-white">
            <SignOut size={24} />
          </span>
          <h4
            style={
              isCollapseNavMenu ? { display: "block" } : { display: "none" }
            }
            className=" group-hover:text-white "
          >
            Logout
          </h4>
        </Link>
      </article>
    </main>
  );
};

export default SideMenu;