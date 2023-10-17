import { useNavigate } from "react-router-dom";
import {
  standardShadow,
  roundedEdge,
  subheadingStyle,
} from "../../app/globalStyles";
import { ProfileImage } from "../../vectors/profileImg";

export const Post = (props) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ ...standardShadow, ...roundedEdge }}
      className="w-full p-4 py-6 space-y-4 max-w-xl mx-auto"
    >
      <div className="flex space-x-4 items-center">
        <ProfileImage
          onClick={() => {
            goToUserProfile(props.username, props.author);
          }}
        />
        <p
          onClick={() => {
            goToUserProfile(props.username, props.author);
          }}
          style={{ ...subheadingStyle }}
        >
          {props.author}
        </p>
        <div className="grow"></div>
        <div className="rounded-xl bg-gray-300 px-3 cursor-pointer w-44 text-center">
          #{props.category}
        </div>
      </div>
      <p>{props.content}</p>
    </div>
  );

  function goToUserProfile(username, author) {
    navigate(`/user/${username}`, { state: { name: author } });
  }
};
