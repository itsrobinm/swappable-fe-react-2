import React, { LegacyRef, forwardRef, useState } from "react"
import { CloseIcon } from "../../../../vectors/CloseIcon/closeIcon";
import styles from "./MakeOffer.module.css";
import { CustomButton } from "../../customButton";
import { CustomInput } from "../../customInput";
import { priceValidator } from "../../../validators/PriceValidator.ts";


export const MakeOffer = forwardRef((props: { item: any, closeFunc: () => void }, ref: LegacyRef<HTMLDialogElement>) => {
    const [price, setPrice] = useState("");
    return (
        <dialog ref={ref} className={styles.dialog}>
            <CloseIcon onClick={() => { props.closeFunc() }} />
            <img className={styles.offerThumbnail} src={props.item.imgUrls[0]} alt={`photo of item`} />
            <CustomInput
                value={price}
                onChange={(text: string) => {

                    if (priceValidator(text)) {
                        setPrice(text);
                    }
                }}
                placeholder={"£60.00"} />
            <CustomButton text="Send Offer" enabled={true} clicked={() => { console.log('ive clicked') }} />
        </dialog>)
});
