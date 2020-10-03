import React, { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as Fuse from "fuse.js";
import RecordRow from "../components/table/recordRow";
import { filterPlainArray, compareValues } from "../utils/other/array";
import { fetchingRecord } from "../utils/redux/reducers/record";
import "../styles/animation.css";
import axios from "axios";

const gridHeaderValues = {
  id: "ID",
  amount: "Amount",
  time: "Time",
  size: "Size",
};

let keys = ["id", "created", "deal_name", "user_name"];

const options = {
  threshold: 0.2,
  keys: keys,
};

const RecordList = (props) => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const recordList = useSelector((state) => state.recordReducer);
  const [filteredList, setFilteredList] = useState([]);
  const isLoading = useSelector((state) => state.loadingReducer);
  const filterInput = useSelector((state) => state.filterInputReducer);
  const tags = useSelector((state) => state.tagReducer);
  const [filters, setFilters] = useState([]);
  const rangeValue = useSelector((state) => state.priceRangeReducer);

  const [sortArray, setSortArray] = useState([0, 0, 0, 0]);

  const SetSorting = (index) => {
    let newArray = [0, 0, 0, 0];
    newArray[index] = (sortArray[index] + 1) % 3;
    setSortArray(newArray);
    console.log(newArray);
  };

  useEffect(() => {
    setFilteredList(recordList);
  }, []);

  // huge useEffect
  useEffect(() => {
    let temp = [];
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].value == true) {
        temp.push(tags[i].keyword);
      }
    }
    setFilters(temp);

    let newList = filterPlainArray(recordList, { size: temp });

    // Good to here

    var fuse = new Fuse(newList, options);
    if (filterInput != "") {
      newList = fuse.search(filterInput);
    }

    // if (sortArray.includes(1)) {
    //   let idx = sortArray.indexOf(1);
    //   newList.sort(compareValues(keys[idx], "asc"));
    // } else if (sortArray.includes(2)) {
    //   let idx = sortArray.indexOf(2);
    //   newList.sort(compareValues(keys[idx], "desc"));
    // }

    // Filter with param ID
    let temp2 = newList.filter((item) => item.deal_id == id);
    // Filter range value

    setFilteredList(temp2.filter((item) => item.discount_price < rangeValue));

    // setFilteredList(newList);
  }, [tags, filterInput, sortArray, rangeValue, recordList]);

  useEffect(() => {
    dispatch(fetchingRecord());
    console.log(id);
  }, []);

  const symbolRotate = (index) => {
    let state = sortArray[index];
    return (
      <div>{state == 1 ? <div> +</div> : state == 2 ? <div>-</div> : null}</div>
    );
  };

  return (
    <div className="p-8 w-full">
      <div className="w-full rounded-md bg-gray-200 p-3 flex flex-row mb-4">
        <div
          className="mr-3 bg-gray-500 rounded-md"
          style={{ width: "100px", height: "100px" }}
        ></div>
        <div>
          <div className="font-bold text-2xl mb-2">Sushi bundle deal</div>
          <div className="flex flex-row">
            <div style={{ width: "200px" }}>
              <div>Status: Live</div>
              <div>Responses: 212</div>
            </div>
            <div>
              <div>Time: 20min</div>
              <div>Note </div>
            </div>
          </div>
        </div>
      </div>
      <button className="p-3 bg-purple-600 text-white rounded-md hover:bg-purple-800 mb-3">
        Add new order +
      </button>
      <div className="grid grid-cols-5 bg-gray-100 w-full mb-1 mt-1 p-3 cursor-pointer">
        <div onClick={() => SetSorting(0)} className="flex flex-row font-bold">
          ID {symbolRotate(0)}
        </div>
        <div onClick={() => SetSorting(1)} className="flex flex-row font-bold">
          User {symbolRotate(1)}
        </div>
        <div onClick={() => SetSorting(2)} className="flex flex-row font-bold">
          Deal {symbolRotate(2)}
        </div>
        <div onClick={() => SetSorting(3)} className="flex flex-row font-bold">
          Created {symbolRotate(3)}
        </div>
        <div className="font-bold">Status</div>
      </div>
      {isLoading == 0 ? (
        <div className="flex w-full mt-32 content-center">
          <div className="m=0 m-auto">
            <MoonLoader size={70} color={"#123abc"} />
          </div>
        </div>
      ) : (
        <div className="fade-in overflow-scroll" style={{ height: "500px" }}>
          {filteredList.map((record) => (
            <RecordRow item={record} id={record.id} key={record._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordList;
// <button onClick={fetchFake}>Fetch fake</button>

// const fetchFake = async () => {
//   axios
//     .get("http://chenyoung01.pythonanywhere.com/outputs/orders/", {
//       method: "GET",
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// };
