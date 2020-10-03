import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import Dropzone from "../dropzone/dropzone";
import SelectSearch from "../other/selectSearch";

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

const NewcampaignModal = (props) => {
  const [eventname, setEventname] = useState("");
  const [other, setOther] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [imageURL, setImageURL] = useState("");

  const onSubmit = () => {
    const eventObj = {
      name: eventname,
      price: price,
      discountedPrice: discountedPrice,
    };
  };

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
          placeholder="Other"
          value={other}
          onChange={(event) => onChange(event, setOther)}
        />
        <input
          className={input}
          placeholder="Price"
          value={price}
          onChange={(event) => onChange(event, setPrice)}
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
              onClick={props.closeModal}
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
