import "./App.css";
import MainPage from "./components/main-page/MainPage";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import GeneratedPage from "./components/generated-page/GeneratedPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/generated-page" element={<GeneratedPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
