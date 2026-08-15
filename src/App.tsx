import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import WhySecureBit from "./pages/WhySecureBit";
import Services from "./pages/Services";
import AiSecurity from "./pages/AiSecurity";
import Training from "./pages/Training";
import VulnerabilityManagement from "./pages/VulnerabilityManagement";
import EndpointSecurity from "./pages/EndpointSecurity";
import CloudSecurity from "./pages/CloudSecurity";
import GovernanceRiskCompliance from "./pages/GovernanceRiskCompliance";
import IncidentResponse from "./pages/IncidentResponse";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Submissions from "./pages/Submissions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-securebit" element={<WhySecureBit />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/vulnerability-management" element={<VulnerabilityManagement />} />
            <Route path="/services/endpoint-security" element={<EndpointSecurity />} />
            <Route path="/services/cloud-security" element={<CloudSecurity />} />
            <Route path="/services/governance-risk-compliance" element={<GovernanceRiskCompliance />} />
            <Route path="/services/incident-response" element={<IncidentResponse />} />
            <Route path="/services/ai-security" element={<AiSecurity />} />
            <Route path="/services/training" element={<Training />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            {/* Backward-compatible redirects for old service slugs */}
            <Route
              path="/services/vulnerability-risk-management"
              element={<Navigate to="/services/vulnerability-management" replace />}
            />
            <Route
              path="/services/cloud-infrastructure-security"
              element={<Navigate to="/services/cloud-security" replace />}
            />
            <Route
              path="/services/incident-response-threat-readiness"
              element={<Navigate to="/services/incident-response" replace />}
            />
          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/submissions" element={<Submissions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
