import { standardShadow } from "../../app/globalStyles";


export const Card = ({ content }) => {
  return (
    <div
      style={{
        ...standardShadow,
        // boxShadow: "0px 0px 30px 20px #FFFFFF",
        borderRadius: "2%",
        padding: "20px",
        backgroundColor: "#FFFFFFA7",
        position: "relative",
        margin: "20px",
        minWidth: "250px",
        maxWidth: "450px",
        //width: "45%",
      }}
      // className="space-y-4 backdrop-blur-md	"
      className=" inline-block m-auto space-y-4 text-center"
    >
      {content}
    </div>
  );
};