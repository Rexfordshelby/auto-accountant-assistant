
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
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
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentCancel from "./pages/Payment/PaymentCancel";
import UserProfile from "./pages/UserProfile";
import FinancialInsightsDashboard from "./pages/FinancialInsightsDashboard";
import IntegrationsPage from "./pages/IntegrationsPage";
import AllAboutMe from "./pages/AllAboutMe";

// Service pages
import Accounting from "./pages/Services/Accounting";
import Audit from "./pages/Services/Audit";
import Compliance from "./pages/Services/Compliance";

// Resource pages
import Blog from "./pages/Resources/Blog";
import FAQ from "./pages/Resources/FAQ";
import Guides from "./pages/Resources/Guides";
import Webinars from "./pages/Resources/Webinars";
import Tips from "./pages/Resources/Tips";
import Insights from "./pages/Resources/Insights";

// Tool pages
import ExpenseTracker from "./pages/Tools/ExpenseTracker";

// Legal pages
import About from "./pages/About";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <NotificationProvider>
        <GlobalErrorBoundary>
          <AuthProvider>
            <SubscriptionProvider>
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
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/insights" element={<FinancialInsightsDashboard />} />
                    <Route path="/integrations" element={<IntegrationsPage />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/payment-cancel" element={<PaymentCancel />} />
                    <Route path="/allaboutme" element={<AllAboutMe />} />
                    
                    {/* Services pages */}
                    <Route path="/services/accounting" element={<Accounting />} />
                    <Route path="/services/audit" element={<Audit />} />
                    <Route path="/services/compliance" element={<Compliance />} />
                    
                    {/* Tools pages */}
                    <Route path="/tools/tax-calculator" element={<TaxCalculator />} />
                    <Route path="/tools/expense-tracker" element={<ExpenseTracker />} />
                    
                    {/* Resource pages */}
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/resources/guides" element={<Guides />} />
                    <Route path="/resources/webinars" element={<Webinars />} />
                    <Route path="/resources/tips" element={<Tips />} />
                    <Route path="/resources/insights" element={<Insights />} />
                    
                    {/* Company/Legal pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/cookies" element={<Cookies />} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </GlobalErrorBoundary>
      </NotificationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
