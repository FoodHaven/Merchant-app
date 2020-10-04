import axios from "axios";
import { BASE_URL } from "./base";
import { mockRecord } from "../data/mockRecord";

const FetchRecord = async () => {
  // console.log(BASE_URL);
  // console.log(BASE_URL + "/records");
  const response = await axios.get(
    "http://chenyoung01.pythonanywhere.com/outputs/orders/"
  );

  if (response) {
    return response.data;
  }
  return null;
};

// Post request
const RepopulateRecord = async () => {
  console.log("Repopulating record");
  axios
    .post(BASE_URL + "/records/admin/repopulate", { records: mockRecord })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

const fetchGeneral = async (url) => {
  const res = await axios.get(url);
  if (res) {
    // console.log(res.data);
    return res.data;
  } else {
    return null;
  }
};
export { FetchRecord, RepopulateRecord, fetchGeneral };

// <Link to={`/${props.link}`}>{props.text}</Link>
