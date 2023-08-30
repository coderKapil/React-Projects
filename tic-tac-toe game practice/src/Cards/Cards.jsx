import Icon from "../Icons/Icon";
import "./card.css";

function Card({ gameEnd, player, onPlay, index }) {
  let icon = <Icon />;
  if (player == "O") {
    icon = <Icon name="circle" />;
  } else if (player == "X") {
    icon = <Icon name="cross" />;
  }

  return (
    <div
      className="card"
      onClick={() => !gameEnd && player == "" && onPlay(index)}
    >
      {icon}
    </div>
  );
}

export default Card;
