import React from "react";

function ToyCard({ id, name, image, likes, delToy, likeToy }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button onClick={() => likeToy(id, likes)} className="like-btn">Like {"<3"}</button>
      <button onClick={() => delToy(id)} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
