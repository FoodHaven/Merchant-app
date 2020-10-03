import React, { useEffect, useState } from "react";
import Select from "react-select";
import Slider from "react-input-slider";

import { useDispatch, useSelector } from "react-redux";
import {
  SET_TAGS,
  SET_FILTER_INPUT,
  SET_RANGE,
} from "../../utils/redux/reducers/record";

let tagCSS =
  "inline-block p-3 bg-gray-300 mb-1 mr-1 rounded-lg hover:bg-gray-400 cursor-pointer";

const filterTags = [
  { keyword: "small", value: false },
  { keyword: "medium", value: false },
  { keyword: "large", value: false },
];

const Restaurantnav = (props) => {
  const [tags, setTags] = useState(filterTags);
  const [methodSelect, setMethodSelect] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const globalSlider = useSelector((state) => state.priceRangeReducer);
  const [sliderState, setSliderState] = useState({ x: 300 });
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    setSearchInput(e.target.value);
    dispatch(SET_FILTER_INPUT(e.target.value));
  };

  const setTagPolarity = (tagName) => {
    // copy array
    let index = tags.findIndex((tag) => tag.keyword == tagName);
    let newTags = tags.slice();
    newTags[index].value = !tags[index].value;
    setTags(newTags);
    dispatch(SET_TAGS(newTags));
  };

  const changeSelect = (event) => {
    setMethodSelect(event.targe.value);
  };

  return (
    <div style={{ width: "400px" }} className="shadow-md h-screen p-8">
      <input
        className="p-2 bg-gray-200 mb-4 hover:bg-gray-300"
        placeholder="Enter here"
        onChange={(e) => onInputChange(e)}
        value={searchInput}
      />
      <div className="text-xl font-semibold">Selected tags</div>
      <div className="flex flex-row">
        {tags.map((tag) => (
          <React.Fragment>
            {tag.value ? (
              <div
                className={tagCSS}
                onClick={() => setTagPolarity(tag.keyword)}
              >
                {tag.keyword}
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <br />
      <hr />
      <br />
      <div className="flex flex-row">
        {tags.map((tag) => (
          <React.Fragment>
            {tag.value == false ? (
              <div
                className={tagCSS}
                onClick={() => setTagPolarity(tag.keyword)}
              >
                {tag.keyword}
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <br />
      <div className="text-xl font-semibold">Price range</div>
      <div>Price: 0 - {sliderState.x}</div>
      <Slider
        axis="x"
        xstep={0.01}
        xmin={0}
        xmax={300}
        x={globalSlider}
        onChange={({ x }) => {
          setSliderState({ x: parseFloat(x.toFixed(0)) });
          dispatch(SET_RANGE(x));
        }}
      />
    </div>
  );
};

export default Restaurantnav;
