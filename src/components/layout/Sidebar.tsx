import React from "react";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminRoutePaths } from "../../routes/admin.route";
import { Link } from "react-router-dom";
import { userRoutePaths } from "../../routes/user.route";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

// import { adminPaths } from "../../routes/admin.routes";
// import { facultyPaths } from "../../routes/faculty.routes";
// import { studentPaths } from "../../routes/student.routes";
// import { useAppSelector } from "../../redux/hooks";
// import { TUSer, useCurrentToken } from "../../redux/features/auth/authSlice";
// import { verifyToken } from "../../utils/verifyToken";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  const roleUser = user?.role;
  console.log("user", roleUser);

  //   const token = useAppSelector(useCurrentToken);

  //   let user: TUSer | null = null;

  //   if (token) {
  //     user = verifyToken(token) as TUSer;
  //   }

  let sidebarItems: any = [];
  //  switch (user?.role) {
  switch (roleUser) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminRoutePaths, userRole.ADMIN);
      //   console.log("sidebarItems:", sidebarItems);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userRoutePaths, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <div className="h-screen sticky top-0 left-0 w-64 bg-[#0f3e2a] text-white">
      {/* Sidebar Header */}
      <div className="flex justify-center items-center h-20 bg-[#0f3e2a]">
        <h1 className="text-xl font-bold">Wheels</h1>
      </div>

      <hr className="w-full border-t-2 border-red-500" />

      <ul className="menu">
        {sidebarItems.map((item) => (
          <li key={item.key} className="relative">
            {item.children ? (
              <details className="group cursor-pointer">
                <summary className="py-2 px-4 rounded hover:bg-[#8B0000]">
                  {item.label}
                </summary>
                <ul className="bg-[#0f3e2a] mt-2">
                  {item.children.map((child) => (
                    <li
                      key={child.key}
                      className="border border-gray-600 rounded p-2 mt-2 hover:bg-[#8B0000]"
                    >
                      {child.label}
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link
                to={item.path}
                className="block  p-1 rounded hover:bg-[#8B0000]"
              >
                <li>{item.label} </li>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Sidebar Menu
      <ul className="menu">
        {sidebarItems.map((item, index) => (
          <Link
            to={item.path}
            className="mt-2  text-center rounded hover:bg-[#8B0000]"
          >
            <li key={item.key}>{item.label}</li>
          </Link>
        ))}
      </ul> */}
    </div>
  );
};

export default Sidebar;
