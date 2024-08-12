import PageTitle from "@/components/shared/PageTitle";
import Link from "next/link";
import React from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { MdAccessTime, MdOutlineLocationOn } from "react-icons/md";

const Page = () => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Contacts Us" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <div className="font-normal text-sm py-2">
          Please visit the{" "}
          <Link
            href="/information"
            className="hightlight-font-color font-semibold"
          >
            information page
          </Link>{" "}
          to quickly find the information you need.
        </div>
        <div className="font-normal text-sm py-2">
          Still have questions ? We would love to hear from you.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5">
          <div className="section-light-background-color p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <HiOutlineMail className="mr-2" size={24} />
              <h2 className="text-lg font-medium">Email</h2>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium primary-light-font-color">
                <a href="mailto:email1@example.com">email1@example.com</a>
              </p>
            </div>
            <div>
              <p className="text-sm font-medium primary-light-font-color">
                <a href="mailto:email2@example.com ">email2@example.com</a>
              </p>
            </div>
          </div>
          <div className="section-light-background-color p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <HiOutlinePhone className="mr-2" size={24} />
              <h2 className="text-lg font-medium">Call Us</h2>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium primary-light-font-color">
                019182981201
              </p>
            </div>
            <div>
              <p className="text-sm font-medium primary-light-font-color">
                112819829128
              </p>
            </div>
          </div>
          <div className="section-light-background-color p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <MdOutlineLocationOn className="mr-2" size={24} />
              <h2 className="text-lg font-medium">Address</h2>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium primary-light-font-color">
                Robert-Koch-Straße 15, 84489 Burghausen
              </p>
            </div>
          </div>
          <div className="section-light-background-color p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <MdAccessTime className="mr-2" size={24} />
              <h2 className="text-lg font-medium">Opening Hours</h2>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium  primary-light-font-color">
                Monday - Friday 9 am - 5 pm
              </p>
            </div>
            <div>
              <p className="text-sm font-medium primary-light-font-color">
                Saturday 9 am - 12 pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
