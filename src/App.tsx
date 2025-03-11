
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import TaxServices from "./pages/TaxServices";
import FinancialAdvisory from "./pages/FinancialAdvisory";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import TaxCalculator from "./pages/TaxCalculator";

// Service pages
import Accounting from "./pages/Services/Accounting";
import Audit from "./pages/Services/Audit";
import Compliance from "./pages/Services/Compliance";

// Resource pages
import Blog from "./pages/Resources/Blog";
import FAQ from "./pages/Resources/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/tax-services" element={<TaxServices />} />
            <Route path="/financial-advisory" element={<FinancialAdvisory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            
            {/* Services pages */}
            <Route path="/services/accounting" element={<Accounting />} />
            <Route path="/services/audit" element={<Audit />} />
            <Route path="/services/compliance" element={<Compliance />} />
            
            {/* Tools pages */}
            <Route path="/tools/tax-calculator" element={<TaxCalculator />} />
            
            {/* Resource pages */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
