import { useRef, useState } from "react";

export default function Home() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [loadedFeedback, setLoadedFeedback] = useState([]);

  function submitForm(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedback() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setLoadedFeedback(data.feedback));
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedback}>Load Feedback</button>
      <ul>
        {loadedFeedback.map((item) => (
          <li key={item.id}>{item.email} : {item.text}</li>
        ))}
      </ul>
    </div>
  );
}
