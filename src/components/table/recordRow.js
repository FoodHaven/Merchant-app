import React, { useState, useEffect } from "react";
// import HistoryModal from "../modals/historyModal";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { fetchingRecord } from "../../utils/redux/reducers/record";

import { SET_FLAGGED } from "../../utils/redux/reducers/record";

const HistoryModalSetting = {
  content: {
    width: "600px",
    height: "300px",
    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "solid",
    borderWidth: "2px",
    borderRadius: "20px",
    borderColor: null,
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.25)",
  },
};

const setStatusColor = (name) => {
  if (name === "Processed") {
    return "#E5FAFF";
  } else if (name === "Failed") {
    return "#FFE5E5";
  } else if (name === "Processing") {
    return "#D8FFD8";
  }
};

//History Modal
const HistoryModal = (props) => {
  const dispatch = useDispatch();

  const [flag, setFlag] = useState(false);

  const onDeleteRecord = async (id, closeRequest) => {
    const url = "http://chenyoung01.pythonanywhere.com/orders/" + id;
    const configObj = {
      method: "DELETE",
    };
    await fetch(url, configObj).then((res) => console.log("bruh"));
    closeRequest();
    await dispatch(fetchingRecord());
  };

  const fakeDelete = (id) => {
    console.log("bruh");
    dispatch(fetchingRecord());
  };

  useEffect(() => {
    setFlag(props.item.flagged);
  }, [props.item]);

  const toggleFlag = () => {
    setFlag(!flag);
    props.setFlag(!flag);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={HistoryModalSetting}
      contentLabel="Example Modal"
    >
      <div className="leading-7">
        <div className="text-2xl font-semibold mb-4">Order information</div>
        <div>ID: {props.item.id}</div>
        <div>User: {props.item.user}</div>
        <div>Deal: {props.item.deal_name}</div>
        <div>Created: {props.item.created}</div>
        <div></div>
        <div className="flex flex-row absolute bottom-0 mb-4">
          <button
            onClick={() => onDeleteRecord(props.item.id, props.onRequestClose)}
            className="p-3 bg-red-400 rounded-md mr-3 font-semibold text-white"
          >
            Delete record
          </button>
          <button
            className="p-3 bg-gray-200 rounded-md mr-3 font-semibold"
            onClick={props.onRequestClose}
          >
            Close Modal
          </button>
        </div>
      </div>
    </Modal>
  );
};

//Record Row
const RecordRow = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    console.log(flag);
  }, [flag]);

  const toggleFlag = () => {
    setFlag(!flag);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div
        className="grid grid-cols-5 bg-gray-100 w-full mb-1 mt-1 p-3 cursor-pointer hover:bg-gray-300 items-center"
        onClick={openModal}
      >
        <div>{props.item.id}</div>
        <div>{props.item.user_name}</div>
        <div>{props.item.deal_name}</div>
        <div>{props.item.created}</div>
        <div>
          <div
            className="inline-block p-3 bg-gray-200 rounded-lg"
            style={{ backgroundColor: setStatusColor("Processing") }}
          >
            Processing
          </div>
        </div>
      </div>
      <HistoryModal
        item={props.item}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        setFlag={setFlag}
        flagState={flag}
      />
    </div>
  );
};

// {props.item.status}

export default RecordRow;
