import { Avatar, Button, Input, Switch } from "antd";
import { User } from "lucide-react";
import React, { useState } from "react";

const ProfileUser = () => {
  const [isChange, setIsChange] = useState({
    isChangeName: false,
    isChangeUsername: false,
  });
  const handleSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <div className="w-3/5 m-0 m-auto p-5">
        <div className="w-3/5 m-0 m-auto flex flex-col gap-5">
          <p className="text-2xl font-semibold">Profile details</p>
          <div className="flex gap-6 items-center">
            <Avatar size={100} icon={<User />} />
            <Button
              color="default"
              variant="text"
              className="border border-slate-400 p-4 font-semibold"
            >
              Change photo
            </Button>
            <p className="font-semibold text-gray-400 underline cursor-pointer">
              Remove
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-sm">Username</label>
              <div className="flex gap-2">
                <Input
                  variant="filled"
                  className="border-none rounded-md bg-gray-200 w-80 h-11"
                  onChange={(event) => {
                    setIsChange((prevState) => ({
                      ...prevState,
                      isChangeUsername: event.target.value ? true : false,
                    }));
                  }}
                />
                {isChange?.isChangeUsername ? (
                  <Button
                    type="primary"
                    className="h-11 border border-slate-300 p-4 font-semibold"
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    color="default"
                    variant="text"
                    className="h-11 border border-slate-300 p-4 font-semibold"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
          <p className="font-semibold text-sm">Email</p>
          <p className="text-base">abc@gmail.com</p>
          <p className="font-semibold text-sm">Role</p>
          <p className="text-base">User</p>
          <p className="font-semibold text-sm">Level</p>
          <p className="text-base">Premium</p>
          <hr />
          <p className="text-2xl font-semibold">Notifications</p>
          <div className="flex justify-between">
            <p className="text-base">
              Receive newsletters, promotions and news from Freepik Company
            </p>
            <Switch defaultChecked onChange={handleSwitch} />
          </div>
          <p>
            Freepik will process your data to send you information about our
            products and services, promotions, surveys, raffles, based on our
            legitimate interest, and updates from the creators you follow, if
            you have consented to this. Your data will not be disclosed to third
            parties. They will be communicated outside the EU under the terms of
            the <span className="text-blue-600">privacy policy</span>. You can
            opt out of our notifications with the slider.{" "}
            <span className="text-blue-600">More information</span>
          </p>
          <hr />
          <p className="font-semibold hover:underline cursor-pointer">
            Delete account
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
