import { Link } from '@tanstack/react-router';
import { FolderOpenDot, User } from 'lucide-react';

interface Props {
  className?: string;
  listClassName?: string;
  clickCallback?: () => void;
}

export const NavigationList = ({ listClassName, className, clickCallback }: Props) => {
  const itemsClassName =
    'text-l w-full px-4 md:px-0 py-4 flex items-center gap-4 hover:text-theme transition-all';
  const activeClassName = 'text-theme';

  const handleCLick = () => {
    if (clickCallback) {
      clickCallback();
    }
  };

  return (
    <nav className={className}>
      <ul className={listClassName}>
        <li>
          <Link
            to={'/projects'}
            className={itemsClassName}
            onClick={handleCLick}
            activeProps={{ className: activeClassName }}
          >
            <FolderOpenDot />
            Проекты
          </Link>
        </li>

        <li>
          <Link
            to={'/profile'}
            className={itemsClassName}
            onClick={handleCLick}
            activeProps={{ className: activeClassName }}
          >
            <User />
            Профиль
          </Link>
        </li>
      </ul>
    </nav>
  );
};
