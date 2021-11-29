import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toysData, setToysData] = useState();

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(e) {
    e.preventDefault()
    const body = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    }
    fetch("http://localhost:3001/toys", config)
    .then(r => r.json())
    .then(newToyData => setToysData([...toysData, newToyData]))
  }

  function deleteToy(id) {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }
    fetch(`http://localhost:3001/toys/${id}`, config)
    .then(r => r.json())
    .then(() => setToysData(toysData.filter(toy => toy.id !== id)))
    .catch(error => console.log("WHOA there bulleye! -->", error))
  }

  function likeToy(id, likes) {
    const body = {
      likes: likes + 1,
    }
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    }
    fetch(`http://localhost:3001/toys/${id}`, config)
    .then(r => r.json())
    .then(updatedToy => setToysData(toysData.map(toy => {
      return toy.id === updatedToy.id ? updatedToy : toy
    })))
    .catch(error => console.log("WHOA there bulleye! -->", error))
  }

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(r => r.json())
    .then(toysData => setToysData(toysData))
    .catch(error => console.log("WHOA there bulleye! -->", error))
  }, []);

  return (
    <>
      <Header />
      {showForm ? <ToyForm  addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toysData} delToy={deleteToy} likeToy={likeToy} />
    </>
  );
}

export default App;
