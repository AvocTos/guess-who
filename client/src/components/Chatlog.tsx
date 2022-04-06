import { useNavigate } from "react-router-dom";

const Chatlog = ({ log }: ChatlogProps) => {
  return (
    <div className="chatlog">
      {log.map((element: string, index: number) => (
        <p className="chatlog__message" key={index}>{element}</p>
      ))}
    </div>
  );
};

export default Chatlog;
