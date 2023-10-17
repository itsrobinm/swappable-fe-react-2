import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import styles from "./itemPageNew.module.css";
import { darkColor, lightGrey, lightestGrey } from "../../../app/globalStyles";
import "swiper/css";
import { CustomButton } from "../customButton";
import { useDispatch } from "react-redux";
import { likeItemAsync } from "../../effects";
import config from "../../../config.json"
import { CloseIcon } from "../../../vectors/CloseIcon/closeIcon";
import { CustomInput } from "../customInput";
import { MakeOffer } from "./MakeOffer/MakeOffer.tsx";

export const ItemPageNew = () => {
  const { state } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const dialogRef = useRef();

  useEffect(() => {
    //console.log(state)

  }, []);
  return (
    <div className={styles.contentBox}>
      <h1
        className={styles.textContainer}
        style={{ backgroundColor: lightestGrey }}
      >
        {state.item.title}
      </h1>
      <Swiper className={styles.itempageSwiper} navigation={true} pagination={true} >
        {state.item.imgUrls.map((imgUrl, index) => (
          <SwiperSlide>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img className="" src={imgUrl} alt={`photo ${index} of item`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className={`font-bold text-2xl text-center `}>Item Description:</h1>
      <p
        className={` border-radius-standard ${styles.textContainer}`}
        style={{ textAlign: "center", backgroundColor: lightestGrey }}
      >
        {state.item.content}
      </p>
      <CustomButton clicked={() => {
        dispatch(likeItemAsync({ itemID: state.item._id }));

      }} text="Like Item" enabled={true} />
      <CustomButton text="Make Offer" enabled={true} clicked={() => {
        console.log(`go to ${state.item._id}`)
        dialogRef.current.showModal();


      }} style={{ backgroundColor: darkColor }} />
      <MakeOffer ref={dialogRef} closeFunc={() => { dialogRef.current.close(); }} item={state.item} />
      {/* <dialog className={styles.dialog} ref={dialogRef}>
        <CloseIcon onClick={() => { dialogRef.current.close() }} />
        <h1
          className={styles.textContainer}
          style={{ backgroundColor: lightestGrey }}
        >Make Offer</h1>
        <img className={styles.offerThumbnail} src={state.item.imgUrls[0]} alt={`photo of item`} />
        <CustomInput
            //value={price}
            placeholder={"£60.00"}/>
        <CustomButton text="Send Offer" enabled={true} clicked={() => { console.log('ive clicked') }} />
      </dialog> */}
    </div>
  );
};
