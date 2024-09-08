import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  });

  // تحديث بيانات النموذج عند التغيير
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // إرسال بيانات النموذج وإضافة اللعبة الجديدة
  function handleSubmit(e) {
    e.preventDefault();

    // إرسال طلب POST لإضافة اللعبة الجديدة
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        likes: 0 // إضافة عدد الإعجابات الابتدائي 0
      })
    })
      .then(response => response.json())
      .then(newToy => {
        onAddToy(newToy); // استدعاء دالة إضافة اللعبة الجديدة في App.js
        setFormData({ name: "", image: "" }); // إعادة تعيين النموذج بعد الإضافة
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
