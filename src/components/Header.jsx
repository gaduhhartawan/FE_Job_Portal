import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { toast } from "react-toastify";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../hooks/api/auth/useAuthQuery";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const fullname = currentUser?.fullname.split(" ").join("+");

  const { mutate } = useLogoutMutation({
    onSuccess: () => {
      localStorage.setItem("currentUser", null);
      setLogout(false);
      toast.success("Berhasil Logout!", {
        pauseOnHover: false,
        position: "bottom-right",
      });
    },
  });

  return (
    <header className="bg-white">
      <nav
        className="h-28 mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8 relative"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="/ico.png" alt="" />
          </a>
          <Link
            to="/"
            className="mx-2 flex text-3xl font-bold font-plusjakarta tracking-tight"
          >
            careerpath.
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-7">
          <a
            href="#"
            className="hover:underline hover:underline-offset-2 hover:decoration-bluu hover:decoration-2 text-base font-semibold font-plusjakarta leading-6 text-gray-900"
          >
            Find Job
          </a>
          {/* <a href="#" className="text-base font-semibold font-plusjakarta leading-6 text-gray-900">
            Companies
          </a> */}
          <a
            href="#"
            className="hover:underline hover:underline-offset-2 hover:decoration-bluu hover:decoration-2 text-base font-semibold font-plusjakarta leading-6 text-gray-900"
          >
            Scholarship
          </a>
          <a
            href="#"
            className="hover:underline hover:underline-offset-2 hover:decoration-bluu hover:decoration-2 text-base font-semibold font-plusjakarta leading-6 text-gray-900"
          >
            Career Coaching
          </a>
          <Link
            to="/about"
            className="hover:underline hover:underline-offset-2 hover:decoration-bluu hover:decoration-2 text-base font-semibold font-plusjakarta leading-6 text-gray-900"
          >
            About
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-7">
          {currentUser && <BellIcon className="h-7 w-7 lg:flex self-center" />}
          {currentUser && (
            <img
              src={`https://ui-avatars.com/api/?name=${fullname}&rounded=true`}
              alt=""
              className="w-10 h-10 cursor-pointer"
              onClick={() => setLogout(!logout)}
            />
          )}
          {(currentUser?.isAdmin || currentUser?.isCompany) && (
            <a
              href="#"
              className="text-base font-semibold font-plusjakarta leading-6 text-gray-900 self-center"
            >
              Post a Job
            </a>
          )}
          {!currentUser && (
            <Link
              to="/login"
              className="rounded-full lg:flex h-11 -ml-1 bg-blue-500 hover:bg-blue-400 text-white"
            >
              <div className="text-base font-semibold font-plusjakarta leading-6 mx-8 self-center">
                Sign In / Sign Up
              </div>
            </Link>
          )}
        </div>
        {/* logout */}
        {logout && (
          <div className="absolute -bottom-10 right-9 border bg-white border-gray-400 p-2 rounded-xl w-36 text-center">
            <span>My Account</span>
            <button className="mt-1" onClick={mutate}>
              Logout
            </button>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="ico.png" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Find Job
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Scholarship
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Career Coaching
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
