import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';




import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Search, SearchedEmployee } from './Search';
import { cn } from '@/lib/utils';
import { TitleSearch, searchProperties } from './TitleSearch';


const POPOVER_WIDTH = 'w-full';

export  function TitleNumberCombobox({ setValue }: any) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<
    searchProperties | undefined
  >();

  const handleSetActive = React.useCallback((property: searchProperties) => {
    setSelected(property);
    console.log(property);
    setValue( property);
    setOpen(false);
  }, [setValue]);

  const displayName = selected ? ` ${selected.titleLR}` : 'Select Property Title Number';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="my-2 flex w-full items-center justify-between rounded-md border border-gray-300 p-3"
        >
          {displayName}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" className={cn('p-0', POPOVER_WIDTH)}>
        <TitleSearch selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}
