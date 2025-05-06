//import { CustomButton } from "./components/customButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getCategoriesAsync } from "../effects";
import { createPostSelect } from "../selectors";
import {
  lighterGrey,
  roundedEdge,
  standardShadow,
} from "../../app/globalStyles";
import { LeftArrow } from "../../vectors/leftArrow";
import { useNavigate } from "react-router-dom";
import { setActivePageIndex } from "../counterSlice";
import TextField from "@mui/material/TextField";
import { CustomInput } from "../components/customInput";
import styles from "./createPost.module.css";
import { AddImage } from "../components/AddImage/AddImage";
import { CustomAutoComplete } from "../components/Autocomplete/Autocomplete";
import { CustomButton } from "../components/customButton";
import { TextBox } from "../components/TextBox/TextBox";
import { priceValidator } from "../validators/PriceValidator.ts";

export const ListItem = () => {
  const [postText, setPostText] = useState("");
  const [title, setTitle] = useState("");
  const [categoryArr, setCategoryArr] = useState([]);
  const [categoryIdStateful, setCategoryIdStateful] = useState("");
  const [price, setPrice] = useState("");
  const [imageArr, setImageArr] = useState(new Array(5).fill(null));

  const dispatch = useDispatch();
  const createPostSelect$ = useSelector(createPostSelect);
  const numPhotos = 5;
  let navigate = useNavigate();

  function isPhotoUploadEnabled(index) {
    if (index === 0) return true;
    if (imageArr[index - 1] !== null) return true;
    return false;
  }

  useEffect(() => {
    dispatch(setActivePageIndex(1));
    dispatch(getCategoriesAsync()).then((action) => {
      console.log(action.payload);

      let myArr = action.payload.map((obj) => {
        return { label: obj.name, id: obj._id };
      });

      setCategoryArr(myArr);
    });
  }, []);

  return (
    <>
      <div className="p-4 max-w-xl mx-auto space-y-4">
        <div
          style={{ ...standardShadow }}
          className="space-y-4 p-4 border-radius-standard"
        >
          <h1 className="text-xl text-center font-bold">Item Title</h1>
          <CustomInput
            placeholder={"Item Title"}
            onChange={(text) => {
              setTitle(text);
            }}
          />
          <h1 className="text-xl text-center font-bold">
            Describe your item...
          </h1>
          <TextBox onChange={(text) => setPostText(text)} />
          <h1 className="text-xl text-center font-bold">Add Photos</h1>
          <div className={`flex justify-between ${styles.imagesContainer}`}>
            {Array.from({ length: numPhotos }).map((_, index) => (
              <AddImage
                uniqueID={index}
                image={imageArr[index]}
                enabled={isPhotoUploadEnabled(index)}
                removeImage={() => {
                  let arrCopy = [...imageArr];
                  arrCopy.splice(index, 1);
                  setImageArr(arrCopy);
                }}
                onRerender={() => {}}
                setImage={(param) => {
                  console.log("this shouldve been called again ");
                  let arrCopy = [...imageArr];
                  arrCopy[index] = param;
                  setImageArr(arrCopy);
                }}
              />
            ))}
          </div>

          <h1 className="text-xl text-center font-bold">Item Price</h1>
          <CustomInput
            value={price}
            placeholder={"£60.00"}
            onChange={(text) => {
              if (priceValidator(text)) {
                setPrice(text);
              }
            }}
          />

          <h1 className="text-xl text-center font-bold">Item Category</h1>

          <CustomAutoComplete
            arr={categoryArr}
            valChange={(myVal) => {
              /* TODO: Change this, it's a bit horrendous */
              categoryArr.forEach((val) => {
                if (val.label === myVal) {
                  setCategoryIdStateful(val.id);
                }
              });
            }}
          />
          <CustomButton
            enabled={true}
            text={"List Item"}
            loading={createPostSelect$.pending}
            clicked={(enabled) => {
              if (enabled) {
                const form = new FormData();
                form.append("content", postText);
                form.append("categoryId", categoryIdStateful);
                form.append("title", title);
                form.append("price", price);

                imageArr.forEach((image) => {
                  console.log(image);
                  if (image) {
                    form.append("files", image, image.name);
                  }
                });

                console.log(form);

                dispatch(createPost({ form: form })).then((action) => {
                  if (action.payload) {
                    navigate("/home");
                  } else {
                  }
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
