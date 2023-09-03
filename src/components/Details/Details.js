import { useContext, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as gameService from "../../services/gameService"; 
import { GameContext } from "../../contexts/GameContext";
import * as commentService from "../../services/commentService";

export const Details = () => {

  const { addComment, fetchGameDetails, selectGame, gameRemove } = useContext(GameContext);
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  
  const currentGame = selectGame(gameId);
  
  
  useEffect(() => {
    (async () => {
      const gameDatails = await gameService.getOne(gameId);
      const gameComments = await commentService.getByGameId(gameId);

      fetchGameDetails(gameId, { ...gameDatails, comments: gameComments.map(x => `${x.user.email}: ${x.text}`) });
    })();
      
  }, []);


  const addCommentHandler = (e) => {
     
    e.preventDefault();

    const formData = new FormData(e.target);

    const comment = formData.get('comment');

    commentService.create(gameId, comment)
       .then(result => {
         addComment(gameId, comment);
       });

   

  }

  const gameDeleteHandler = () => {

    const confirmation = window.confirm('Are you sure want to delete this game?');

    if(confirmation){
       
      gameService.remove(gameId)
       .then(() => {
          gameRemove(gameId);
          navigate('/catalog');
       })
    }

    
  }

    return(
        <section id="game-details">
    <h1>Game Details</h1>
    <div className="info-section">
      <div className="game-header"> 
        <img className="game-img" src={currentGame.imageUrl}/>
        <h1>{currentGame.title}</h1>
        <span className="levels">Max Level: {currentGame.maxLevel}</span>
        <p className="type">{currentGame.category}</p>
      </div>
      <p className="text">{currentGame.summary}</p>
      {/* Bonus ( for Guests and Users ) */}
      <div className="details-comments">
        <h2>Comments:</h2>
        <ul>
          {currentGame.comments?.map(x => 
          <li key={x} className="comment">
            <p>{x}.</p>
          </li>)}
        </ul>
        {!currentGame.comments &&  
             <p className="no-comment">No comments.</p>}
        
      </div>
      {/* Edit/Delete buttons ( Only for creator of this game )  */}
      <div className="buttons">
        <Link to={`/games/${gameId}/edit`} className="button">
          Edit
        </Link>
        <button  className="button" onClick={gameDeleteHandler}>
          Delete
        </button>
      </div>
    </div>
    {/* Bonus */}
    {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" onSubmit={addCommentHandler}>
        
        <textarea
          name="comment"
          placeholder="Comment......"
          
        />
        
        <input
          className="btn submit"
          type="submit"
          value="Add Comment"
        />
      </form>
    </article>
  </section>
    );
}