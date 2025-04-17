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

const PropertyBar = ({inputText, setInputText}:any) => {
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

  let handleInputHandler = (event: { target: { value: string; }; }) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
    console.log(inputText);
    
  };
  return (
    <main>
      <div className="flex items-center justify-between my-1">
        <div className="flex items-center border border-[#ccc] rounded-full px-2">
          <MagnifyingGlass size={24} color="#1e1e1e" weight="bold" />
          <input type="text" className="outline-none p-2" placeholder="Search property by title number" onChange={handleInputHandler} />
        </div>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue="ngong"
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="w-[150px] bg-[#A5A5A520] outline-none m-1">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                <SelectItem value="ngong">Ngong</SelectItem>
                <SelectItem value="nyeri">Nyeri</SelectItem>
                <SelectItem value="kisii">Kisii</SelectItem>
                <SelectItem value="embu">Embu</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="sizes"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue="all"
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className=" bg-[#A5A5A520] text-[#808195]  outline-none m-1">
                <SelectValue placeholder="Asset Value" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
                <SelectItem value="all">-- All Assets--</SelectItem>
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
              defaultValue="freehold"
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className=" bg-[#A5A5A520] text-[#808195]  outline-none m-1">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
              <SelectItem value="all">All Titles</SelectItem>
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
              defaultValue="allProperties"
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className=" bg-[#A5A5A520] outline-none m-1">
                <SelectValue placeholder="Property Verification" />
              </SelectTrigger>
              <SelectContent className="bg-[#ffffff] text-[#808195] bg-opacity-100">
              <SelectItem value="allProperties">All Titles</SelectItem>
                <SelectItem value="verified">Verified Titles</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </main>
  );
};

export default PropertyBar;
