import './MessageCard.css';

export const MessageCard = () => {
  return (
    <div className="messageInfo__container">
      <img
        className="imageMessage__chat"
        src="https://res.cloudinary.com/dukuzakaw/image/upload/v1669996836/plannerApp/users/s21dhmfupoduqkva0hp0.webp"
        alt="Gustavo Silva"
      />
      <div className="messageDetails__chat">
        <div className="chatDetails__msg">
          <p>Why a teacher?</p>
        </div>
        <div className="timesTamp__chatInfo">
          <span>Gustavo Silva</span>
          <span>11:25 AM</span>
        </div>
      </div>
    </div>
  );
};
