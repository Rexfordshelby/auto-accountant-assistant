
import React from 'react';
import { Moon, Sun, PaintBucket, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    light: <Sun className="h-5 w-5 text-amber-500" />,
    dark: <Moon className="h-5 w-5 text-indigo-400" />,
    purple: <Palette className="h-5 w-5 text-purple-500" />,
    blue: <PaintBucket className="h-5 w-5 text-blue-500" />
  };

  const themeLabels = {
    light: "Light",
    dark: "Dark",
    purple: "Purple",
    blue: "Blue"
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full border-2 hover:bg-accent hover:text-accent-foreground"
          >
            {themeIcons[theme]}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 p-2 bg-popover shadow-lg">
          <div className="space-y-2">
            <p className="text-xs font-medium text-center text-muted-foreground mb-2">Theme</p>
            <ToggleGroup type="single" value={theme} onValueChange={(value) => value && setTheme(value as any)} className="flex justify-center gap-1">
              {Object.entries(themeIcons).map(([key, icon]) => (
                <ToggleGroupItem 
                  key={key} 
                  value={key} 
                  className="rounded-full data-[state=on]:bg-muted" 
                  aria-label={`${key} theme`}
                >
                  {icon}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            
            <div className="flex flex-col gap-1 pt-2">
              {Object.entries(themeLabels).map(([key, label]) => (
                <DropdownMenuItem 
                  key={key}
                  onClick={() => setTheme(key as any)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span>{label}</span>
                  {theme === key && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                </DropdownMenuItem>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeToggle;
