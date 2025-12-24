import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

import { CopyButton } from '@/app/components/buttons/copy-button.tsx';
import { EditButton } from '@/app/components/buttons/edit-button.tsx';
import { Button } from '@/app/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu.tsx';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/app/components/ui/item.tsx';
import type { ProjectLink } from '@/entities/project-link/types.ts';

interface Props {
  link: ProjectLink;
}

export const LinkCard = ({ link }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Item key={link.id} variant='outline' className={'items-start'}>
      <ItemContent className={'truncate overflow-hidden'}>
        <ItemTitle>{link.title}</ItemTitle>
        <ItemDescription className={'w-full truncate text-nowrap'}>{link.url}</ItemDescription>
        <ItemDescription>{link.description}</ItemDescription>
      </ItemContent>

      <ItemActions>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild className={'data-[state=open]:text-destructive'}>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreVertical className='h-4 w-4' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setOpen(false)}>
              <CopyButton value={link.url} className={'w-full'}>
                Копировать URL
              </CopyButton>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(false)}>
              <EditButton className={'w-full'}>Редактировать</EditButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
};
