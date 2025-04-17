import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const PropertyBar = ({ inputText, setInputText }: any) => {
  const [activeButton, setActiveButton] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  let handleInputHandler = (event: { target: { value: string } }) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
    console.log(inputText);
  };
  return (
    <main>
      <div className="flex items-center justify-between my-1">
        <div className="flex items-center border border-[#ccc] rounded-full px-2 w-1/3">
          <MagnifyingGlass size={24} color="#1e1e1e" weight="bold" />
          <input
            type="text"
            className="outline-none p-2 w-full"
            placeholder="Search property by title number or Alias"
            onChange={handleInputHandler}
          />
        </div>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue="location"
              onValueChange={(value) => {
                field.onChange(value);
                setInputText(value);
              }}
              value={field.value}
            >
              <SelectTrigger className=" bg-[#A5A5A520] w-[200px] outline-none m-1 ">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                <SelectItem value="location">-- County --</SelectItem>
                <SelectItem value="parkland">Parkland</SelectItem>
                <SelectItem value="rongai">Rongai</SelectItem>
                <SelectItem value="mlolongo">Mlolongo</SelectItem>
                <SelectItem value="naivasha">Naivasha</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {/* <Controller
          name="sizes"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue="all"
              onValueChange={(value) => {
                field.onChange(value);
                setInputText(value);
              }}
              value={field.value}
            >
              <SelectTrigger className=" bg-[#A5A5A520] w-[200px] text-[#808195]  outline-none m-1">
                <SelectValue placeholder="Asset Value" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                <SelectItem value="all">-- All Sizes--</SelectItem>
                <SelectItem value="0.40">0.05Ha - 0.40Ha</SelectItem>
                <SelectItem value="2">0.41Ha - 2.0Ha</SelectItem>
                <SelectItem value="8">2.01Ha - 8.1Ha </SelectItem>
                <SelectItem value="8.2">8.2Ha +</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue="titleType"
              onValueChange={(value) => {
                field.onChange(value);
                setInputText(value);
              }}
              value={field.value}
            >
              <SelectTrigger className=" bg-[#A5A5A520] w-[200px] text-[#808195]  outline-none m-1">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                <SelectItem value="titleType">-- Title Types --</SelectItem>
                <SelectItem value="freehold">Freehold Titles</SelectItem>
                <SelectItem value="leasehold">Leasehold Titles</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="propertyVerification"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue="status"
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className=" bg-[#A5A5A520] w-[200px] outline-none m-1">
                <SelectValue placeholder="Property Verification" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                <SelectItem value="status">
                  -- Verification Status --
                </SelectItem>
                <SelectItem value="allProperties">All Titles</SelectItem>
                <SelectItem value="verified">Verified Titles</SelectItem>
              </SelectContent>
            </Select>
          )}
        /> */}
      </div>
    </main>
  );
};

export default PropertyBar;
