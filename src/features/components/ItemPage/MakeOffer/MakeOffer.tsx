import React, { LegacyRef, forwardRef, useState } from "react"
import { CloseIcon } from "../../../../vectors/CloseIcon/closeIcon.js";
import styles from "./MakeOffer.module.css";
import { CustomButton } from "../../customButton.js";
import { CustomInput } from "../../customInput.js";
import { priceValidator } from "../../../validators/PriceValidator";
import { accentColor } from "../../../../app/globalStyles.js"
import { useDispatch } from "react-redux";
import { makeOffer } from "../../../effectsNew";
import { Item } from "../../../../types/types";
import { useAppDispatch } from "../../../../hooks";

export const MakeOffer = forwardRef((props: { item: Item, closeFunc: () => void }, ref: LegacyRef<HTMLDialogElement>) => {
    const [price, setPrice] = useState("");
    const dispatch = useAppDispatch();
    return (
        <dialog ref={ref} className={`${styles.dialog} border-radius-standard`}>
            <div className={styles.dialogContainer}>
                <CloseIcon style={{ color: accentColor }} className={styles.closeButton} onClick={() => { props.closeFunc() }} />
                <img className={styles.offerThumbnail} src={props.item.imgUrls[0]} alt={`photo of item`} />
                <div style={{ flexGrow: "1" }}></div>
                <p>Your Offering Price: </p>
                <CustomInput
                    value={price}
                    onChange={(text: string) => {

                        if (priceValidator(text)) {
                            setPrice(text);
                        }
                    }}
                    placeholder={"£60.00"} />
                    <CustomButton text="Send Offer" enabled={true} clicked={() => {
                    let thing = dispatch(makeOffer({itemID: props.item._id, price: price })).then((action) => {
                    console.log(action.payload);

                    }) ;
                }} />
            </div>
        </dialog>)
});
