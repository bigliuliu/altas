import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { Command } from "cmdk";
import { CommandInput, CommandItem, CommandList } from "../ui/command";
import axios from "axios";
import { cn } from "@/lib/utils";
import { userSource } from "@/helpers/userSource";
import { AtlasBackendApi } from "@/constants/atlas-backend-api";


export interface SearchedEmployee {
  _id: string;
  user: {
    _id: string;
    fullName: string;
  }

  // name: string;
  // address: string;
  // registrationDate: string;
  // primaryContact: number;
  // documents: string;
  // status: string;
  idNumber: string;
}

interface SearchProps {
  selectedResult?: SearchedEmployee;
  onSelectResult: (employee: SearchedEmployee) => void;
}

export function Search({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectResult = (employee: SearchedEmployee) => {
    onSelectResult(employee);
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
        placeholder="Enter Property Recipient ID"
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
  const searchEmployee = async (parameter: string) => {
    try {
      const response = await axios.get(`${AtlasBackendApi}/search/${parameter}`);
      console.log("response search", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw new Error("Failed to fetch search results");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => searchEmployee(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
  });

  if (!debouncedSearchQuery) return null;

  return (
    <CommandList>
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}
      {!data && !isLoading && !isError && (
        <div className="p-4 text-sm">No Recipient found</div>
      )}
      {Array.isArray(data) ? (
        data.map(({ _id, user, idNumber }: SearchedEmployee) => (
          <CommandItem
            key={_id}
            onSelect={() =>
              onSelectResult({
                _id,
                user,
                idNumber,
              })
            }
            value={idNumber}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedResult?._id === _id ? "opacity-100" : "opacity-0"
              )}
            />
            Name: {user ? user.fullName : 'Unknown'} - ID number: {idNumber}
          </CommandItem>
        ))
      ) : data ? (
        <CommandItem
          onSelect={() =>
            onSelectResult({
              _id: data._id,
              user: data.user,
              idNumber: data.idNumber,
            })
          }
          value={data.idNumber}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              selectedResult?._id === data._id ? "opacity-100" : "opacity-0"
            )}
          />
          Name: {data.user?.fullName} - ID number: {data.idNumber}
        </CommandItem>
      ) : null}

    </CommandList>
  );
}
