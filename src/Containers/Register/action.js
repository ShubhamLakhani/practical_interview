import Axios from "axios";

export const registration = (type,data) => {
    return Axios
      .post(
        `http://wren.in:3200/api/sign-up/${type}`,
        data
      )
      .then((response) => {
          return response;
      })
      .catch((err) => {
          return err;
      });
  };