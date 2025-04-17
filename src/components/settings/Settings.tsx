import DashboardContainer from "@/container/DashboardContainer";
import {
  DeviceMobile,
  DotsThreeOutline,
  EnvelopeSimpleOpen,
  Keyhole,
} from "@phosphor-icons/react";
import React from "react";
import { Switch } from "../ui/switch";
import SettingMenu from "../menu/SettingMenu";

const Settings = () => {
  return (
    <DashboardContainer>
      <section className="flex">
        <SettingMenu />
        <main className="m-2 lg:mx-[100px]">
          <div className="flex justify-between mb-5">
            <h4>settings/configurations</h4>
            <button className="border border-[#218B53] bg-[#218B5310] px-3 py-2 rounded-xl">
              Save
            </button>
          </div>
          <div className="flex justify-between mb-5">
            <h4>Security</h4>
            <DotsThreeOutline size={24} color="#080808" weight="fill" />
          </div>
          <article className="flex flex-col items-center">
            <div className="flex items-center justify-between mt-3">
              <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg mx-3">
                <Keyhole size={24} color="#080808" weight="fill" />
              </span>
              <span className="md:w-[500px]">
                <h3 className="font-bold text-[#718096]">
                  Login 2-Step Verification
                </h3>
                <h5 className="text-[#718096]">
                  The Login 2step Verification adds an extra layer of security
                  to your account.{" "}
                </h5>
              </span>
              <button className=" py-3 px-5 w-auto bg-[#218B531A]  bg-[#218B53] text-white rounded-lg hover:font-semibold">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between  mt-3">
              <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg mx-3">
                <EnvelopeSimpleOpen size={24} color="#080808" weight="fill" />
              </span>
              <span className="md:w-[500px]">
                <h3 className="font-bold text-[#718096]">Email Setup</h3>
                <h5 className="text-[#718096]">
                  Please enter your email correctly
                </h5>
              </span>
              <button className=" py-3 px-5 w-auto bg-[#218B531A]  bg-[#218B53] text-white rounded-lg hover:font-semibold">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-start mt-3">
              <span className="bg-[#218b523d] p-3 flex flex-col items-center rounded-lg mx-3">
                <DeviceMobile size={24} color="#080808" weight="fill" />
              </span>
              <span className=" md:w-[500px]">
                <h3 className="font-bold text-[#718096]">SMS Setup</h3>
                <h5 className="text-[#718096]">For your security</h5>
              </span>
              <button className=" py-3 px-5 w-auto bg-[#218B531A]  bg-[#218B53] text-white rounded-lg hover:font-semibold">
                Enable
              </button>
            </div>
          </article>
          <div className="flex justify-between my-5">
            <h4>Notification</h4>
            <DotsThreeOutline size={24} color="#080808" weight="fill" />
          </div>
          <article className="flex flex-col items-center md:mx-[100px]">
            <div className="flex items-center justify-between w-full mt-3">
              <h3>Security Alert</h3>
              <Switch />
            </div>
            <div className="flex items-center justify-between w-full mt-3">
              <h3>SMS Notification</h3>
              <Switch />
            </div>
            <div className="flex items-center justify-between w-full mt-3">
              <h3>Referral commission alerts</h3>
              <Switch />
            </div>
          </article>
        </main>
      </section>
    </DashboardContainer>
  );
};

export default Settings;
