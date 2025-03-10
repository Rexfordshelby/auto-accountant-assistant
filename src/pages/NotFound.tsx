
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl font-medium">404</span>
        </div>
        <h1 className="text-3xl font-semibold mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-black/90 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Return to home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
