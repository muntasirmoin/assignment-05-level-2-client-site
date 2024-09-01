import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { useGetUpcomingBookingsByUserIdQuery } from "../../redux/features/publicPages/booking.api";
import CountdownTimer from "./CountdownTimer";
import { PiUserListBold } from "react-icons/pi";

interface Slot {
  date: string;

  startTime: string;

  // Add other fields if necessary done
}

interface Booking {
  _id: string;
  slotId: Slot;
  // Add other fields if necessary
}

const NavBar: React.FC = () => {
  const location = useLocation();
  // const user = selectCurrentUser();
  const user = useSelector(selectCurrentUser);

  const roleUser = user?.role === "user";

  console.log("roleUser", roleUser);

  // start
  const { data, error, isLoading } = useGetUpcomingBookingsByUserIdQuery(
    user?.userId
  );
  // Ensure data is properly typed and exists
  const bookings: Booking[] = data?.data || [];
  const now = new Date();

  // Filter and sort the bookings
  const combineDateAndTime = (date: string, time: string): Date => {
    // Example format: '2024-09-02' for date and '12:00' for time
    const [hours, minutes] = time.split(":").map(Number);
    const formattedDate = `${date}T${time}:00`; // Format as ISO string: 'YYYY-MM-DDTHH:MM:00'
    return new Date(formattedDate);
  };

  // Filter and sort the bookings
  const nextSlot = bookings
    .filter((booking) => {
      const bookingDate = combineDateAndTime(
        booking.slotId.date,
        booking.slotId.startTime
      );
      return bookingDate > now;
    })
    .sort((a, b) => {
      const dateA = combineDateAndTime(
        a.slotId.date,
        a.slotId.startTime
      ).getTime();
      const dateB = combineDateAndTime(
        b.slotId.date,
        b.slotId.startTime
      ).getTime();
      return dateA - dateB;
    })[0]; // Get the first (earliest) upcoming slot

  console.log("nextSlot", nextSlot?.slotId?.date, bookings);
  // end

  // console.log("navbarUSer", user);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const getLinkClasses = (path: string) => {
    const baseClasses = "py-2 px-4 rounded transition-colors duration-200";
    const hoverClasses = "hover:bg-[#8B0000] hover:text-white"; // Changed hover background color to a green shade
    const activeClasses =
      location.pathname === path ? "mr-2 ml-2 bg-[#8B0000] text-white" : ""; // Changed active background color to match hover color

    return `${baseClasses} ${hoverClasses} ${activeClasses}`;
  };

  return (
    <div className="fixed mx-auto w-full max-w-screen-xl z-50">
      <div className="navbar bg-[#0f3e2a] text-[#F8FAFC]">
        {" "}
        {/* Updated bg and text colors */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#1E293B] rounded-box w-52" // Updated dropdown bg color
            >
              <li>
                <Link to="/" className={getLinkClasses("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className={getLinkClasses("/services")}>
                  Service
                </Link>
              </li>
              <li>
                <Link
                  to="/bookingPageFeatures"
                  className={getLinkClasses("/bookingPageFeatures")}
                >
                  Booking
                </Link>
              </li>
              <>
                {user ? (
                  <>
                    {/* Render Logout Button if User is Logged In */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className={getLinkClasses("/")}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    {/* Render Login Link if User is Not Logged In */}
                    <li>
                      <Link to="/login" className={getLinkClasses("/login")}>
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </>

              <li>
                <Link to="/about" className={getLinkClasses("/about")}>
                  About
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <img
              src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1725218226/wheelLogo_tg2cdq.png"
              alt="Wheels Wash Logo"
              className="h-12"
            />
          </Link>
        </div>
        <div className="navbar-center mr-4 hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li></li>
            <li></li>
            <li>
              <Link to="/" className={getLinkClasses("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className={getLinkClasses("/services")}>
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/bookingPageFeatures"
                className={getLinkClasses("/bookingPageFeatures")}
              >
                Booking
              </Link>
            </li>

            <li>
              {nextSlot && roleUser ? (
                <div>
                  Next Slot:
                  <CountdownTimer
                    date={nextSlot.slotId.date}
                    time={nextSlot.slotId.startTime}
                  />
                </div>
              ) : null}
            </li>

            <li>
              <Link to="/about" className={getLinkClasses("/about")}>
                About
              </Link>
            </li>
            <>
              {user ? (
                <li>
                  <Link
                    to={`/${user.role}/dashboard`}
                    className={getLinkClasses(`/${user.role}/dashboard`)}
                  >
                    <PiUserListBold size={25} />
                  </Link>
                </li>
              ) : null}
            </>
            <>
              {user ? (
                <>
                  {/* Render Logout Button if User is Logged In */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className={getLinkClasses("/")}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Render Login Link if User is Not Logged In */}
                  <li>
                    <Link to="/login" className={getLinkClasses("/login")}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
