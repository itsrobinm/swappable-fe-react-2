import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import { posts } from "../../mockedData/posts";
import { Post } from "../components/post";
import {
  lightGrey,
  lighterGrey,
  lightestGrey,
  standardShadow,
} from "../../app/globalStyles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postsSelect, dashboardSelect } from "../selectors";

import { useEffect } from "react";
import { getCategoriesAsync, getPostsAsync } from "../effects";
import { LoadingScreen } from "../loadingScreen";
import { HomeIcon } from "../../vectors/home";
import { CreatePostIcon } from "../../vectors/createPost";
import { ProfileIcon } from "../../vectors/profileIcon";
import { setActivePageIndex } from "../counterSlice";
import { ItemCard } from "../components/ItemCard/itemcard";
import { TopBar } from "../components/TopBar/topBar";
import { LoadingCard } from "../components/ItemCard/loadingCard";

export const PostsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postsSelect$ = useSelector(postsSelect);
  const dashboardSelect$ = useSelector(dashboardSelect);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // function clicked(item) {
  //   navigate(`/item/${item._id}`, { state: { item: item } });
  // }

  useEffect(() => {
    dispatch(setActivePageIndex(0));
    dispatch(getCategoriesAsync());

    dispatch(getPostsAsync({})).then((action) => {
    });
  }, []);

  return (
    <>
      <div>
        <div className="space-y-4 px-4 max-w-xl mx-auto">
          <Swiper
            slidesPerView={"auto"}
            className={"tab-swiper "}
            spaceBetween={10}
          >
            {dashboardSelect$.getCategoriesPending
              ? Array.from({ length: 5 }).map((_, index) => (
                  <SwiperSlide
                    style={{ backgroundColor: lightestGrey }}
                    className={`cursor-pointer border-radius-standard`}
                    key={index}
                  >
                    <span style={{ color: "transparent" }}>Loading</span>
                  </SwiperSlide>
                ))
              : ""}

            {dashboardSelect$.categories.map((category, index) => (
              <>
                <SwiperSlide
                  style={{ backgroundColor: lighterGrey }}
                  className={`cursor-pointer border-radius-standard`}
                  onClick={() => {
                    setActiveCategoryIndex(index);
                    dispatch(getPostsAsync({ categoryId: category._id }));
                  }}
                  key={index}
                >
                  {category.name}
                </SwiperSlide>
              </>
            ))}
          </Swiper>
          <div className="grid grid-cols-3 gap-4">
            {postsSelect$.pending &&
              Array.from({ length: 5 }).map((_, index) => (
                <LoadingCard key={index} />
              ))}
            {postsSelect$.posts.map((item, index) => {
              return (
                <ItemCard
                  key={index}
                  item={item}
                  onClick={() => {
                    navigate(`/item/${item._id}`, { state: { item: item } });
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
