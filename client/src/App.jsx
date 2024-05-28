import { BrowserRouter, Route, Routes } from "react-router-dom";

import ButtonGradient from "./assets/ButtonGradient";
import Header from "./components/Header";
import { Main } from "./components/Main";
import Movies from "./components/Movies";
import Login from "./components/Login";

const App = () => {

  return (
    <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="/movies/:mood" element={<Movies />} />
          </Routes>


        <ButtonGradient />
    
    </BrowserRouter>
  );
};

export default App;
