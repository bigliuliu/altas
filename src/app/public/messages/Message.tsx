import React, { useState } from "react";
import "../styles/style.css";
import { property } from "@/helpers/propertySource";
import Image, { StaticImageData } from "next/image";
import {
  FilePlus,
  MapPin,
  Scales,
  SealCheck,
  SealQuestion,
  ShareFat,
} from "@phosphor-icons/react";
import { Land } from "@/constants/png";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RecipientCombobox } from "@/components/combobox/RecipientCombobox";
import { TitleNumberCombobox } from "@/components/combobox/TitleNumberCombobox";
import { DialogDescription } from "@radix-ui/react-dialog";
import { messageSource } from "@/helpers/messageSource";

const Message = () => {
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [messageState, setMessageState] = useState<{
    id: number;
    title: string;
    description: string;
    date: string;
  }>({
    id: 0,
    title: "",
    description: "",
    date: "",
  });

  const filteredMessages = messageSource.filter((element) => {
    if (inputText === "") {
      return messageSource;
    }
    //return the item which contains the user input
    else {
      return element.title.toLowerCase().includes(inputText);
    }
  });

  return (
    <article className="">
      <div className="flex">
        <ul className="flex flex-col h-[700px] overflow-y-scroll w-[40%] ">
          {filteredMessages.map((element, index) => {
            return (
              <article
                key={index}
                onClick={() => setMessageState(filteredMessages[index])}
                className="w-full p-2 mb-2 rounded-xl hover:cursor-pointer flex flex-col border border-gray-200 hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold p-2">{element.title}</h4>
                  <h5 className="text-sm p-2">{element.date}</h5>
                </div>
                <h4 className="text-sm mb-1 p-2 ">{element.description}</h4>
              </article>
            );
          })}
        </ul>
        <div className="w-[60%] p-3 mx-2 rounded-xl hover:cursor-pointer flex flex-col border border-gray-200 hover:shadow-2xl">
          <article className="p-3">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-xl">{messageState.title}</h4>
              <h5 className="text-sm p-2">{messageState.date}</h5>
            </div>
            <h4 className="text-base mb-3">{messageState.description}</h4>
          </article>
        </div>
      </div>
    </article>
  );
};

export default Message;
