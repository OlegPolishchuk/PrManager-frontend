import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { CopyButton } from '@/app/components/buttons/copy-button.tsx';
import { DeleteButton } from '@/app/components/buttons/delete-button.tsx';
import { EditButton } from '@/app/components/buttons/edit-button.tsx';
import { Button } from '@/app/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu.tsx';
import { Item, ItemActions, ItemContent } from '@/app/components/ui/item.tsx';
import { Typography } from '@/app/components/ui/typography.tsx';
import type { Note } from '@/entities/notes/types.ts';

interface Props {
  note: Note;
}

export const NoteCard = ({ note }: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const handleDeleteNote = (id: string) => {
    console.log(id);
  };

  const handleEditLinkClick = () => {
    setEditMode(true);
  };

  return (
    <>
      <Item key={note.id} variant='outline' className={'items-start'}>
        <ItemContent className={'truncate overflow-hidden'}>
          <Typography variant={'small'} className={'mb-4 ml-2'}>
            {note.groupTitle}
          </Typography>

          {note.type === 'NOTE' ? (
            <div className={'flex flex-col gap-5 rounded-lg bg-theme/5 p-4'}>
              <pre>{note.note}</pre>
            </div>
          ) : (
            <div className={'flex flex-col gap-5 rounded-lg bg-theme/5 p-4'}>
              {note.records?.map((record) => {
                return (
                  <div className={''}>
                    <Typography variant={'muted'}>{record.title}:</Typography>

                    <div className={'flex items-center gap-6'}>
                      <Typography variant={'small'}>{record.value}</Typography>
                      <CopyButton value={record.value} className={'h-[25px] w-[25px] p-1!'} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ItemContent>

        <ItemActions>
          <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild className={'data-[state=open]:text-destructive'}>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={handleEditLinkClick}>
                <EditButton className={twMerge('w-full justify-between')}>Редактировать</EditButton>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleDeleteNote(note.id)}>
                <DeleteButton className={'w-full justify-between'}>Удалить</DeleteButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      {/*<UpdateProjectLinkModal link={link} open={isEditMode} onOpenChange={setEditMode} />*/}
    </>
  );
};
