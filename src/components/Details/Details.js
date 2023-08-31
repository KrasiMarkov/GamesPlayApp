import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as gameService from "../../services/gameService"; 
import { GameContext } from "../../contexts/GameContext";

export const Details = () => {

  const { gameId } = useParams();
  const { addComment } = useContext(GameContext);
  const [currentGame, setCurrentGame] = useState({});
  const [comment, setComment] = useState({
    username: '',
    comment: ''
  }); 
  const [error, setError] = useState({
    username: '',
    comment: ''
  });

  useEffect(() => {
      gameService.getOne(gameId)
        .then(result => {
            setCurrentGame(result);
        })
  }, []);

  



  const addCommentHandler = (e) => {
     
    e.preventDefault();

    const result = `${comment.username}: ${comment.comment}`;

    addComment(gameId, result);

  }

  const onChange = (e) => {

    setComment(state => ({
      ...state,
      [e.target.name]: [e.target.value]
    }));
  }

  const validateUsername = (e) => {

    let username = e.target.value;
    let errorMessage = '';

    if(username.length < 3){
      errorMessage = 'Username must be longer than 3 symbols.';
    }
    else if(username.length > 15){
      errorMessage = 'Username must be lower than 15 symbols.';
    }

    setError(state => ({
      ...state,
      username: errorMessage
      
    }));
  }

  const validateComment = (e) => {

    let comment = e.target.value;

    let errorMessage = '';

    if(comment.length < 2){
      errorMessage = 'Comment must be longer than 1 symbols.';
    }
    else if(comment.length > 50){
      errorMessage = 'Comment must be lower than 50 symbols.';
    }

    setError(state => ({
      ...state,
      comment: errorMessage
    }));
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
          <li  key={x._id} className="comment">
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
        <Link to={""} className="button">
          Delete
        </Link>
      </div>
    </div>
    {/* Bonus */}
    {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" onSubmit={addCommentHandler}>
      <input
          type="text"
          placeholder="John Doe"
          name="username"
          value={comment.username}
          onChange={onChange}
          onBlur={validateUsername}
        />
        {error.username && <div style={{color: 'red'}}>{error.username}</div>}
        <textarea
          name="comment"
          placeholder="Comment......"
          value={comment.comment}
          onBlur={validateComment}
          onChange={onChange}
        />
        {error.comment && <div style={{color: 'red'}}>{error.comment}</div>}
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