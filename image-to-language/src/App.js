import "./App.css";
import MainPage from "./components/main-page/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneratedPage from "./components/generated-page/GeneratedPage";
import SignUpPage from "./components/signUp-page.js/SignUpPage";
import SignInPage from "./components/signIn-page/SignInPage";
import ConfirmEmailPage from "./components/email-confirmation/EmailConfiramtionPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUpPage/>} />
          <Route path="/confirm-email" element={<ConfirmEmailPage/>} />
          <Route path="/sign-in" element={<SignInPage/>} />
          <Route path="/generated-page" element={<GeneratedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
