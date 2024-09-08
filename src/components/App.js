import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // جلب الألعاب عند تحميل التطبيق
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  // إضافة لعبة جديدة
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // حذف اللعبة
  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedToys = toys.filter((toy) => toy.id !== id);
      setToys(updatedToys);
    });
  }

  // تحديث الإعجابات
  function handleUpdateLikes(id, newLikes) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((toy) =>
          toy.id === updatedToy.id ? updatedToy : toy
        );
        setToys(updatedToys);
      });
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateLikes={handleUpdateLikes}
      />
    </>
  );
}

export default App;
