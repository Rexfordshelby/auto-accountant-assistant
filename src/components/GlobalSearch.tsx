
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Calculator, Receipt, User, Settings, File } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type SearchResult = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
  url: string;
};

const GlobalSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleResults: SearchResult[] = [
    { 
      id: '1', 
      title: 'Dashboard', 
      description: 'View your financial overview', 
      icon: <FileText className="h-4 w-4" />, 
      type: 'page',
      url: '/dashboard' 
    },
    { 
      id: '2', 
      title: 'Tax Calculator', 
      description: 'Calculate tax estimates', 
      icon: <Calculator className="h-4 w-4" />, 
      type: 'tool',
      url: '/tools/tax-calculator' 
    },
    { 
      id: '3', 
      title: 'Expense Tracker', 
      description: 'Track and manage expenses', 
      icon: <Receipt className="h-4 w-4" />, 
      type: 'tool',
      url: '/tools/expense-tracker' 
    },
    { 
      id: '4', 
      title: 'Profile Settings', 
      description: 'Update your account settings', 
      icon: <User className="h-4 w-4" />, 
      type: 'settings',
      url: '/profile' 
    },
    { 
      id: '5', 
      title: 'Invoice Management', 
      description: 'Create and manage invoices', 
      icon: <File className="h-4 w-4" />, 
      type: 'tool',
      url: '/invoicing' 
    },
    { 
      id: '6', 
      title: 'Account Settings', 
      description: 'Manage your account preferences', 
      icon: <Settings className="h-4 w-4" />, 
      type: 'settings',
      url: '/settings' 
    }
  ];

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Filter results based on query
    const filtered = sampleResults.filter(
      item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.url);
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)} 
        className="gap-2 text-sm h-9 px-3 hidden sm:flex"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <span className="text-xs text-muted-foreground ml-2 hidden md:inline-flex">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setOpen(true)}
        className="sm:hidden"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <Command className="rounded-lg">
            <div className="flex items-center border-b px-3">
              <Search className="h-4 w-4 mr-2 shrink-0 text-muted-foreground" />
              <CommandInput
                ref={inputRef}
                placeholder="Search for pages, reports, tools..."
                className="flex-1 h-11 focus:outline-none"
                value={query}
                onValueChange={setQuery}
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuery('')}
                  className="h-6 w-6 mr-1 shrink-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
            </div>
            <CommandList>
              <CommandEmpty>No results found</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="Results">
                  {results.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.title}
                      onSelect={() => handleSelect(result)}
                    >
                      <div className="mr-2 shrink-0">{result.icon}</div>
                      <div className="flex flex-col">
                        <span>{result.title}</span>
                        <span className="text-xs text-muted-foreground">{result.description}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalSearch;
