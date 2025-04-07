import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
import AppWrapper from "./components/AppWrapper";
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
import UploadDataPage from "./pages/UploadDataPage";
import CompanySettingsPage from "./pages/CompanySettingsPage";
import Accounting from "./pages/Services/Accounting";
import Audit from "./pages/Services/Audit";
import Compliance from "./pages/Services/Compliance";
import ExpenseTracker from "./pages/Tools/ExpenseTracker";
import Blog from "./pages/Resources/Blog";
import FAQ from "./pages/Resources/FAQ";
import Guides from "./pages/Resources/Guides";
import Webinars from "./pages/Resources/Webinars";
import Tips from "./pages/Resources/Tips";
import Insights from "./pages/Resources/Insights";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import CreatePremiumAccount from "./pages/CreatePremiumAccount";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalErrorBoundary>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppWrapper>
                <Routes>
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
                  <Route path="/upload-data" element={<UploadDataPage />} />
                  <Route path="/company-settings" element={<CompanySettingsPage />} />
                  
                  <Route path="/services/accounting" element={<Accounting />} />
                  <Route path="/services/audit" element={<Audit />} />
                  <Route path="/services/compliance" element={<Compliance />} />
                  
                  <Route path="/tools/tax-calculator" element={<TaxCalculator />} />
                  <Route path="/tools/expense-tracker" element={<ExpenseTracker />} />
                  
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/resources/guides" element={<Guides />} />
                  <Route path="/resources/webinars" element={<Webinars />} />
                  <Route path="/resources/tips" element={<Tips />} />
                  <Route path="/resources/insights" element={<Insights />} />
                  
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<Cookies />} />
                  
                  <Route path="/create-premium-account" element={<CreatePremiumAccount />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppWrapper>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </GlobalErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
