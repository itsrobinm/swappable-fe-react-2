import { useEffect } from "react";
import { standardShadow } from "../../../app/globalStyles";
import { Heart } from "../../../vectors/Heart/Heart";
import styles from "./ItemCard.module.css";
import { likeItemAsync, unlikeItemAsync } from "../../effects";
import { useDispatch } from "react-redux";

function formatTitle(title) {
  if (title.length <= 9) return title;

  const trimmed = title.substring(0, 9).trim();
  const amountOfDots = 12 - trimmed.length;
  let returnStr = trimmed;

  for (let i = 0; i < amountOfDots; i++) {
    returnStr += ".";
  }

  return returnStr;
}

export const ItemCard = (props) => {
  useEffect(() => {
    //console.log(props);
  }, []);

  const dispatch = useDispatch();

  return (
    <div
      {...props}
      style={{ ...standardShadow }}
      className={` border-radius-standard ${styles.container}`}
    >
      <img
        draggable={false}
        className={`h-44 w-full object-cover object-center ${styles.image}`}
        src={props.item.imgUrls[0]}
        alt="item"
      />
      <div className={styles.infoContainer}>
        <div className={styles.itemTitle}>
          <span>{formatTitle(props.item.title)} </span>
          <span className={styles.price}>£{props.item.price}</span>
        </div>
        <div className={styles.actionsContainer}>
          <Heart
            likedbythisuser={props.item.likedByThisUser}
            onClick={(e) => {
              e.stopPropagation();
              console.log(`execute like for itemm: ${props.item._id}`);

              if (!props.item.likedByThisUser) {
                dispatch(likeItemAsync({ itemID: props.item._id })).then(
                  (action) => {
                    //console.log(action.payload);
                  }
                );
              } else {
                dispatch(unlikeItemAsync({ itemID: props.item._id })).then(
                  (action) => {
                    //console.log(action.payload);
                  }
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
