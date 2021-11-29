import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, delToy, likeToy }) {
  console.log("ALLTOYS", toys);
  let allToyCards = "loading..."
  if (toys) {
    allToyCards = toys.map(({ id, name, image, likes }) => {
      return <ToyCard
        key={id}
        likeToy={likeToy}
        delToy={delToy}
        id={id} name={name}
        image={image}
        likes={likes}
      />
    });
  }


  return (
    <div id="toy-collection">
      {allToyCards}
    </div>
  );
}

export default ToyContainer;
