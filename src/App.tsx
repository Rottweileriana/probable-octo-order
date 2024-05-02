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
  HomeComponent,
  ContactComponent,
  AboutComponent,
} from "./components/index";
import styled from "styled-components";

import "./App.css";

//#region Styles

const BodyFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const BodyContainer = styled.div``;

const BodyBackgroundContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  margin: 0;
  padding: 0;
  min-height: 100vh;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("./images/StreetMexicoBackground.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(4px);
    transform: scale(1.02);
    z-index: -1;
  }
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
`;

const CourseMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  padding-top: 190px;

  @media (max-width: 768px) {
    padding-top: 120px;
  }
`;

const SidesMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  margin: 0;
`;

const CocktailMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  margin: 0;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const ShoppingCartContainer = styled.div`
  background-image: url("./images/StreetMexicoBackground2.jpg");
  background-size: cover;
  background-image: no-repeat;
  background-position: center;
  width: 100vw;
  overflow: scroll;
  overflow-x: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

//#endregion

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
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
          <NavBarComponent />
          <BodyFooterContainer>
            <BodyContainer>
              <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route
                  path="/Menu"
                  element={
                    <ErrorBoundary>
                      <BodyBackgroundContainer>
                        <MainContainer>
                          <CourseMenuContainer id="CourseMenu">
                            <CourseMenu />
                          </CourseMenuContainer>
                          <SidesMenuContainer id="SidesMenu">
                            <SidesMenu />
                          </SidesMenuContainer>
                          <CocktailMenuContainer id="CocktailMenu">
                            <CocktailMenu />
                          </CocktailMenuContainer>
                        </MainContainer>
                      </BodyBackgroundContainer>
                    </ErrorBoundary>
                  }
                ></Route>
                <Route path="/About" element={<AboutComponent />} />
                <Route path="/Contact" element={<ContactComponent />} />
                <Route
                  path="/Shoppingcart"
                  element={
                    <ShoppingCartContainer>
                      <ShoppingCart />
                      <CheckoutForm />
                    </ShoppingCartContainer>
                  }
                />
                <Route
                  path="/ConfirmationPage"
                  element={<ConfirmationPage />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </BodyContainer>
            <FooterContainer>
              <FooterComponent />
            </FooterContainer>
          </BodyFooterContainer>
        </CartProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
