import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateLikes }) {
  function handleDeleteClick() {
    onDeleteToy(toy.id);
  }

  function handleLikeClick() {
    onUpdateLikes(toy.id, toy.likes + 1);
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes</p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
