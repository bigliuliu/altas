
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import * as React from "react";
import { useDebounce } from "use-debounce";

import { Command } from "cmdk";
import { CommandInput, CommandItem, CommandList } from "../ui/command";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Property,searchProperty } from "@/types/api-types";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";


//new 
export interface searchProperties{
  _id:string;
  titleLR:string;
}

interface SearchProps {
  selectedResult?: searchProperty;
  onSelectResult: (property: searchProperty) => void;
}



export function TitleSearch({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectResult = (property: searchProperties) => {
    onSelectResult(property);
    setSearchQuery(""); // Reset the search query upon selection
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search Property Title"
      />
      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  selectedResult: SearchProps["selectedResult"];
  onSelectResult: SearchProps["onSelectResult"];
}

function SearchResults({
  query,
  selectedResult,
  onSelectResult,
}: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  // Get Search Employee
  const searchProperty = async (parameter: string) => {
    try {
      const encodedParameter = encodeURIComponent(parameter);
      const response = await axios.get(`${AtlasBackendApi}/public/search/${encodedParameter}`);
      console.log("response search", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw new Error("Failed to fetch search results");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => searchProperty(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
  });

  if (!debouncedSearchQuery) return null;

  return (
    <CommandList>
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}
      {!data && !isLoading && !isError && (
        <div className="p-4 text-sm">No Property found </div>
      )}
     {Array.isArray(data) ? (
  data.map(({ _id, titleLR }: searchProperties) => (
    <CommandItem
      key={_id}
      onSelect={() =>
        onSelectResult({
          _id,          
          titleLR,
        })
      }
      value={titleLR}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          selectedResult?._id === _id ? "opacity-100" : "opacity-0"
        )}
      />
       Title number: {titleLR}
    </CommandItem>
  ))
) : data ? (
  <CommandItem
    onSelect={() =>
      onSelectResult({
        _id: data._id,
        
        titleLR: data.titleLR,
      })
    }
    value={data.titleLR}
  >
    <Check
      className={cn(
        "mr-2 h-4 w-4",
        selectedResult?._id === data._id ? "opacity-100" : "opacity-0"
      )}
    />
    Title number: {data.titleLR}
  </CommandItem>
) : null}

    </CommandList>
  );
}
