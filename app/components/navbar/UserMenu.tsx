"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // explicit type of either HtmlDivElement or null to remove error .contains
  // checks if null before calling contains
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // use effect to add event listener on component mount and remove when unmounted
  useEffect(() => {
    // close menu on click outside - set event type explicitly to mouse event
    const handleClickOutside = (event: MouseEvent) => {
      // treat event.target as node (has type EventTarget initially) - this gives it access to the contains method
      // event.target is the dom element that was clicked on "mousedown"
      // contains will be true for any element that is a child of the drop down ref div
      //  false for elements that are not a child of the drop down rev div
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // claean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
          ref={dropDownRef}
        >
          <div className="flex cursor-pointer flex-col">
            <>
              <MenuItem
                onClick={() => {
                  loginModal.onOpen();
                  setIsOpen(!isOpen);
                }}
                label="Login"
              />
              <MenuItem
                onClick={() => {
                  registerModal.onOpen();
                  setIsOpen(!isOpen);
                }}
                label="Sign up"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
