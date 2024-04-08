import React, { ReactNode } from "react";
import { CartProvider } from "./components/context";
import {
  CourseMenu,
  CocktailMenu,
  SidesMenu,
  NavBarComponent,
  FooterComponent,
  ShoppingCart,
  CheckoutForm,
  ConfirmationPage,
  ErrorPage,
  BrowserRouter,
  Routes,
  Route,
} from "./components/index";
import styled from "styled-components";

import "./App.css";

const MainComponent = styled.div`
  padding-top: 50px;
`;

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>

                  <MainComponent>
                    <NavBarComponent />
                    <div id="CourseMenu">
                      <CourseMenu />
                    </div>
                    <div id="SidesMenu">
                      <SidesMenu />
                    </div>
                    <div id="CocktailMenu">
                      <CocktailMenu />
                    </div>
                    <div id="ShoppingCart">
                      <ShoppingCart />
                    </div>
                    <div>
                      <CheckoutForm />
                    </div>
                    <div>
                      <FooterComponent />
                    </div>
                  </MainComponent>
                </ErrorBoundary>
              }
            ></Route>
            <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
