import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ButtonGradient from "./assets/ButtonGradient";
import Header from "./components/Header";
import { Main } from "./components/Main";
import Movies from "./components/Movies";

const App = () => {
  return (
    <Router>
      <>
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
          <Header />
          <Main />

          <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies/:genre" element={<Movies />} />
          </Routes>

        </div>

        <ButtonGradient />
      </>
    </Router>
  );
};

export default App;
