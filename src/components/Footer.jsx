import { FaDiscord, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoMdContact } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-10">

      <div className="flex justify-center items-center gap-10 py-5 border-b border-gray-400">

        <div className="flex flex-col text-sm">
          <a href="#" className="hover:underline">
            Privacy info
          </a>

          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>

        <div className="flex gap-6 text-xl">

          <a href="#">
            <FaDiscord />
          </a>

          <a href="#">
            <FaInstagram />
          </a>

          <a href="#">
            <MdOutlinePrivacyTip />
          </a>

          <a href="#">
            <FaXTwitter />
          </a>

        </div>

      </div>

      <div className="text-center text-sm py-2">
        @copyright: Myself
      </div>

    </footer>
  );
}