import { useContext } from "react";
import { CatalogItem } from "./CatalogItem";
import { GameContext } from "../../contexts/GameContext";

export const Catalog = () => {

  const { games } = useContext(GameContext);


  return(
    <section id="catalog-page">
      <h1>All Games</h1>
      {games.length > 0 
       ? games.map(x => <CatalogItem key={x._id} game={x}/>)
       : <h3 className="no-articles">No articles yet</h3>}
    </section>
  );
}