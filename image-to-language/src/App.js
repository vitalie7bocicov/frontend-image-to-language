import "./App.css";
import MainPage from "./components/main-page/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneratedPage from "./components/generated-page/GeneratedPage";
import SignUpPage from "./components/signUp-page.js/SignUpPage";
import SignInPage from "./components/signIn-page/SignInPage";
import ConfirmEmailPage from "./components/email-confirmation/EmailConfiramtionPage";
import HistoryPage from "./components/history-page/HistoryPage";
import GeneratedPageFromHistory from "./components/generated-page-from-history/GeneratedPageFromHistory";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/generated-page" element={<GeneratedPage />} />
          <Route path="/generated-page-from-history" element={<GeneratedPageFromHistory />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
