import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import Dropzone from "../dropzone/dropzone";
import SelectSearch from "../other/selectSearch";
import { fetchItems } from "../../utils/redux/reducers/items";
import { fetchingCampaign } from "../../utils/redux/reducers/campaign";
import { BASE_URL } from "../../utils/api/base";

const input = "p-3 bg-gray-200 rounded-md mb-4 w-full";

const modalSetting = {
  content: {
    width: "600px",
    height: "800px",
    marginTop: "50px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "solid",
    borderWidth: "2px",
    borderRadius: "20px",
    borderColor: null,
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.25)",
  },
};

// const fakeEvent = {
//   title: "Sample event",
//   description: "This is a sample event",
//   original_price: 100,
//   new_price: 90,
//   items: ["http://chenyoung01.pythonanywhere.com/items/1/"],
//   restaurant: "http://chenyoung01.pythonanywhere.com/restaurants/1/",
//   final_votes: 0,
//   img_url: "https://source.unsplash.com/random",
//   deadline: "2020-10-09T15:12:00Z",
// };

const NewcampaignModal = (props) => {
  const dispatch = useDispatch();
  const [eventname, setEventname] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [deadline, setDeadline] = useState("");

  // Component on mount
  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  const discountedPriceChange = (value) => {
    setDiscountedPrice(value);
  };

  //   General hook function
  const onChange = (event, changeFunction) => {
    changeFunction(event.target.value);
  };

  const onSubmit = () => {
    const obj = {
      title: eventname,
      description: eventDescription,
      original_price: price,
      new_price: parseInt(discountedPrice),
      items: selectedItems,
      restaurant: "http://chenyoung01.pythonanywhere.com/restaurants/1/",

      final_votes: 0,
      img_url: imageURL,
      deadline: "2020-10-09T15:12:00Z",
    };

    const configObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    console.log("Creating deal");

    fetch(BASE_URL + "deals/", configObj).then((res) => res.json());

    dispatch(fetchingCampaign());
    props.closeModal();

    console.log(obj);
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      style={modalSetting}
      contentLabel="Example Modal"
    >
      <div className="relative flex flex-col h-full">
        <div className="font-bold text-2xl mb-3">
          Create bulk order campaign
        </div>
        <SelectSearch
          setPrice={setPrice}
          price={price}
          discountedPriceChange={discountedPriceChange}
          discountedPrice={discountedPrice}
          setSelectedItems={setSelectedItems}
        />
        <input
          className={input}
          placeholder="Event name"
          value={eventname}
          onChange={(event) => onChange(event, setEventname)}
        />
        <input
          className={input}
          placeholder="Event Description"
          value={eventDescription}
          onChange={(event) => onChange(event, setEventDescription)}
        />
        <Dropzone
          width="100%"
          height="100px"
          text="Upload campaign image"
          setImageURL={setImageURL}
        />
        <div className="w-full flex flex-row-reverse mb-4">
          <div className="right-0">
            <button
              className="p-3 bg-green-400 rounded-md font-bold text-white"
              onClick={onSubmit}
              style={{ width: "150px" }}
            >
              Create
            </button>
          </div>
          <div className="flex flex-row">
            <button
              className="p-3 bg-gray-200 rounded-md mr-3"
              onClick={props.closeModal}
              style={{ width: "150px" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewcampaignModal;
