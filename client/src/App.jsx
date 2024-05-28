import ButtonGradient from "./assets/ButtonGradient";
import Header from "./components/Header";
import { Main } from "./components/Main";

const App = () => {
  return (
   <>
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <Main/>
        
    </div>

      <ButtonGradient />

   </>
  )
}

export default App
