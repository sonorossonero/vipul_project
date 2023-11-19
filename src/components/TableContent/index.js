import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function TableContent(props) {
  const items = props.items;
  const handleEmailClick = () => {
    const emailAddress = items.email;
    const subject = 'Alert: Suspicious Activity Detected - Your Review Required';
    const body = "Dear User,I hope this message finds you well. We have detected some suspicious activity in recent job applications. Your prompt review of the attached list of candidates is crucial to maintaining the integrity of our recruitment process.Please find the attached file for your examination. Your expertise in identifying irregularities is highly valued.    Thank you for your immediate attention to this matter.";
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className='tableContent'>
        {/* user->name & email */}
      <div className='userProfile'>
        <div>
          {" "}
          <div className='name'>{items.name}</div>
          <div className='email'>{items.email}</div>
        </div>

        {/* direct mail link with subject and body pre-defined */}
        <div className='profileVisitIcon'>
          <Link onClick={handleEmailClick}>
            {" "}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              style={{ color: "blue" }}
            />
          </Link>
        </div>

      </div>

      {/* risk level  */}
      <div
        className='riskLevel'
        style={{
          color:
            items.riskLevel === "Medium"
              ? "rgb(136,103,15)"
              : items.riskLevel === "Low"
              ? "rgb(0,101,64)"
              : "rgb(125,36,36)",
        }}
      >
        <div
          className='circle'
          style={{
            background:
              items.riskLevel === "Medium"
                ? "rgb(136,103,15)"
                : items.riskLevel === "Low"
                ? "rgb(0,101,64)"
                : "rgb(125,36,36)",
            height: "10px",
            width: "10px",
            borderRadius: "50%",
          }}
        ></div>
        <div>{items.riskLevel}</div>
      </div>
      
      {/* trigger reason */}
      <div>{items.completed ? items.actionReason : items.triggerReason}</div>

      {/* queue dates */}
      <div>{items.completed ? items.timeToClose : items.inQueueFor}</div>
      
      {/* data added */}
      <div>{items.dateAddedOn}</div>


      {/* previously reviewed */}
      <div>
        {items.previouslyReviewed?.flag && (
          <div style={{ fontSize: "0.9rem" }}>Yes</div>
        )}
        <div
          style={{
            fontSize: items.previouslyReviewed ? "0.7rem" : "0.9rem",
            color: items.previouslyReviewed ? "grey" : "black",
          }}
        >
          {items.completed
            ? items.actionTakenBy.name
            : items.previouslyReviewed.date}
        </div>
        {items.actionTakenBy && (
          <div style={{ fontSize: "0.7rem", color: "grey" }}>
            {items.actionTakenBy.email}
          </div>
        )}
      </div>

    </div>
  );
}
