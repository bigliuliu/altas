import { useAppContext } from "@/context/AppContext";
import { settingsMenuItems } from "@/data/settings-items";
import { List } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SettingMenu = () => {
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

  return (
    <main
      className="transition-all duration-300 ease-in-out h-screen  shadow-lg z-10"
      style={isCollapseNavMenu ? { width: "230px" } : { width: "auto" }}
    >
      <article>
        {settingsMenuItems.map((element, index) => {
          return (
            <React.Fragment key={index}>
              {element.path === "/" ? ( // Check if the current element represents the logout item
                <div
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
                </div>
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
      </article>
    </main>
  );
};

export default SettingMenu;
