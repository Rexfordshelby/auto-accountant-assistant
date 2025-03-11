
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface AutoRedirectProps {
  to: string;
  delay?: number;
  message?: string;
}

const AutoRedirect = ({ to, delay = 3000, message = "Redirecting you to another page..." }: AutoRedirectProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Navigation",
      description: message,
    });

    const timer = setTimeout(() => {
      navigate(to);
    }, delay);

    return () => clearTimeout(timer);
  }, [to, delay, navigate, toast, message]);

  return null;
};

export default AutoRedirect;
