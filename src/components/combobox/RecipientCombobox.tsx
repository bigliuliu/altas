import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';




import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Search, SearchedEmployee } from './Search';
import { cn } from '@/lib/utils';

const POPOVER_WIDTH = 'w-full';

export  function RecipientCombobox({ setValue }: any) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<
    SearchedEmployee | undefined
  >();

  const handleSetActive = React.useCallback((employee: SearchedEmployee) => {
    setSelected(employee);
    console.log(employee);
    setValue( employee);
    setOpen(false);
  }, [setValue]);

  const displayName = selected ? `${selected.user?.fullName} - ${selected.idNumber}` : 'Select Property Recipient';

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
        <Search selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}
