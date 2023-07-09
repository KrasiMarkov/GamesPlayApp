import './App.css';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Details } from './components/Details/Details';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

function App() {
  return (
    <div id="box">
    <Header/>
  {/* Main Content */}
  <main id="main-content"></main>
    <Home/>
    <Login/>
    <Register/>
    <Create/>
  {/* Edit Page ( Only for the creator )*/}
  <section id="edit-page" className="auth">
    <form id="edit">
      <div className="container">
        <h1>Edit Game</h1>
        <label htmlFor="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" defaultValue="" />
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" defaultValue="" />
        <label htmlFor="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min={1}
          defaultValue=""
        />
        <label htmlFor="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
        <label htmlFor="summary">Summary:</label>
        <textarea name="summary" id="summary" defaultValue={""} />
        <input className="btn submit" type="submit" defaultValue="Edit Game" />
      </div>
    </form>
  </section>
    <Details/>
    <Catalog/>
</div>
  );
}

export default App;
