import ListPeliculas from "./componentes/ListPeliculas";
import './App.css';
import { Natvar } from "./componentes/Natvar";
import { UserProvider } from "./context/UserContext";

function App() {

  return (
    <div >
      <UserProvider>
      <Natvar/>
      <ListPeliculas/>
      </UserProvider>
    </div>
  );
}

export default App;
