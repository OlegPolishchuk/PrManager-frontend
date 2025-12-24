import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { CopyButton } from '@/app/components/buttons/copy-button.tsx';
import { DeleteButton } from '@/app/components/buttons/delete-button.tsx';
import { EditButton } from '@/app/components/buttons/edit-button.tsx';
import { LinkTypeBadge } from '@/app/components/link-type-badge/link-type-badge.tsx';
import { UpdateProjectLinkModal } from '@/app/components/pages/current-project/tabs/project-links-tab/update-project-link-modal.tsx';
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
import { useDeleteProjectLink } from '@/entities/project-link/hooks.ts';
import type { ProjectLink } from '@/entities/project-link/types.ts';

interface Props {
  link: ProjectLink;
}

export const LinkCard = ({ link }: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const deleteLinkMutation = useDeleteProjectLink();

  const handleDeleteLink = (id: string) => {
    console.log(id);

    deleteLinkMutation.mutate(id, {
      onSuccess: () => setOpenDropdown(false),
    });
  };

  const handleEditLinkClick = () => {
    setEditMode(true);
  };

  return (
    <>
      <Item key={link.id} variant='outline' className={'items-start'}>
        <ItemContent className={'truncate overflow-hidden'}>
          <div className={'flex items-center gap-2'}>
            <LinkTypeBadge linkType={link.type} />

            <a href={link.url} target={'_blank'} className={'underline'}>
              <ItemTitle className={'flex flex-row items-center'}>{link.title}</ItemTitle>
            </a>
          </div>

          <ItemDescription className={'w-full truncate text-nowrap'}>{link.url}</ItemDescription>
          <ItemDescription>{link.description}</ItemDescription>
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
              <DropdownMenuItem onClick={() => setOpenDropdown(false)}>
                <CopyButton value={link.url} className={'w-full justify-between'}>
                  Копировать URL
                </CopyButton>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEditLinkClick}>
                <EditButton className={twMerge('w-full justify-between')}>Редактировать</EditButton>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleDeleteLink(link.id)}>
                <DeleteButton className={'w-full justify-between'}>Удалить</DeleteButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>

      <UpdateProjectLinkModal link={link} open={isEditMode} onOpenChange={setEditMode} />
    </>
  );
};
