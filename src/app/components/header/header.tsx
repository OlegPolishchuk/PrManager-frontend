import { Button } from '@/app/components/ui/button.tsx';
import { Switch } from '@/app/components/ui/switch.tsx';
import { useTheme } from '@/app/providers';

export const Header = () => {
  const { setTheme, theme } = useTheme();

  const handleChangeTheme = (checked: boolean) => {
    if (checked) {
      return setTheme('light');
    }

    setTheme('dark');
  };

  return (
    <header>
      <div className='flex items-center space-x-2'>
        <Switch onCheckedChange={handleChangeTheme} defaultChecked={theme === 'light'} />
      </div>
      <div>
        <Button>Button</Button>
        <Button variant={'outline'}>Button</Button>
      </div>
    </header>
  );
};
