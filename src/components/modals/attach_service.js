import React from "react";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, TextField, TextareaAutosize } from "@mui/material";
import AsyncSelect from "react-select/async";
import {
  serviceAttach,
  serviceSearch,
} from "../../actions/services/servicesAction";
import SnackbarAlert from "../utils/snackbar";

const AttachServiceModal = ({
  attachServiceModal,
  closeAttachServiceModal,
  app_id,
  appId,
}) => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [search, setSearch] = useState(null);

  const [selectedValue, setSelectedValue] = useState(null);

  const loadOptions = (inputValue, callback) => {
    serviceSearch({ app_id, search: inputValue })
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
          callback([], new Error("An error occurred"));
        } else {
          const options = res.data.map((service) => ({
            value: service.ID,
            label: service.sender,
          }));

          if (options.length === 0) {
            callback([], new Error("No results found"));
          } else if (options.length === 1) {
            callback(options, null);
            setSelectedValue(options[0]);
          } else {
            // Multiple results found, return the first one as default value
            callback(options, null);
            setSelectedValue(options[0]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        callback([], new Error("An error occurred"));
      });
  };

  const handleInputChange = (newValue) => {
    setSearch(newValue);
  };

  const handleSelectedChange = (newValue) => {
    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (search) {
      loadOptions();
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const service_id = selectedValue.value;

    const res = serviceAttach({ service_id, appId }).then((res) => {
      if (res.status === 200) {
        setEventType("success");
        setEventMessage("Service Successfully Attached");
        setEventTitle("SERVICE ATTACH");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Service NOT Attached");
        setEventTitle("SERVICE ATTACH");
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 600,
    height: 450,
    bgcolor: "#ffff",
    outline: "none",
    border: "none",
    // boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  return (
    <>
      <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      <Modal
        open={attachServiceModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeAttachServiceModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center w-full">
                <p className="text-xl content-center items center">
                  ATTACH SERVICE
                </p>

                <br />

                <div className="w-full">
                  <AsyncSelect
                    value={selectedValue}
                    inputValue={search}
                    onInputChange={handleInputChange}
                    onChange={handleSelectedChange}
                    loadOptions={loadOptions}
                    isClearable={true}
                    styles={customStyles}
                    className="w-full"
                  />

                  <button
                    className="bg-blue-900 text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
                    style={{
                      marginTop: "2rem",
                      alignSelf: "center",
                      ...(isButtonClicked ? greenButton : {}),
                    }}
                    onClick={(e) => {
                      handleSubmit(e);
                      setIsButtonClicked(true);
                    }}
                  >
                    {isButtonClicked ? "DONE!" : "ATTACH"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default AttachServiceModal;
