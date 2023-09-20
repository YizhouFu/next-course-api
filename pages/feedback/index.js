import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function Feedback(props) {
  return (
    <ul>
      {props.feedbacks.map((item) => (
        <li key={item.id}>
          {item.email} : {item.text}
        </li>
      ))}
    </ul>
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
