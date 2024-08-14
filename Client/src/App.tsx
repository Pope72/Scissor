import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/:domainUrl" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
