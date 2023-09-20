import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function Feedback(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedback(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbacks.map((item) => (
          <li key={item.id}>
            {item.email} : {item.text}
            <button onClick={loadFeedback.bind(null, item.id)}>
              show detail
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbacks: data,
    },
  };
}
