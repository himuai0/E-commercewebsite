import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Category from "@/pages/Category";
import Product from "@/pages/Product";
import Cart from "@/pages/Cart";
import AIGenerator from "@/pages/AIGenerator";
import CustomMade from "@/pages/CustomMade";
import ReadyMade from "@/pages/ReadyMade";
import Sublimation from "@/pages/Sublimation";
import DTF from "@/pages/DTF";
import CorporateSolutions from "@/pages/CorporateSolutions";
import BulkPrinting from "@/pages/BulkPrinting";
import CustomTShirtPrinting from "@/pages/CustomTShirtPrinting";
import CreateYourDesign from "@/pages/CreateYourDesign";
import UserGuide from "@/pages/UserGuide";
import Catalogues from "@/pages/Catalogues";
import BrandCatalogues from "@/pages/BrandCatalogues";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/:slug" component={Product} />
          <Route path="/product-category/:slug" component={Category} />
          <Route path="/cart" component={Cart} />
          <Route path="/ai-generator" component={AIGenerator} />
          <Route path="/custom-made" component={CustomMade} />
          <Route path="/ready-made" component={ReadyMade} />
          <Route path="/sublimation" component={Sublimation} />
          <Route path="/direct-to-film-dtf" component={DTF} />
          <Route path="/corporate-solutions" component={CorporateSolutions} />
          <Route path="/bulk-t-shirt-printing-malaysia" component={BulkPrinting} />
          <Route path="/custom-t-shirt-printing-malaysia" component={CustomTShirtPrinting} />
          <Route path="/create-your-design" component={CreateYourDesign} />
          <Route path="/user-guide" component={UserGuide} />
          <Route path="/catalogues-by-tmaker" component={Catalogues} />
          <Route path="/catalogue-by-brands" component={BrandCatalogues} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppRoutes />
        </WouterRouter>
        <Toaster position="bottom-right" richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
