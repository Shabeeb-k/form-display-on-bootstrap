import "./App.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Card from "react-bootstrap/Card";
import TextField from "@mui/material/TextField";
import { isValidPhoneNumber } from "react-phone-number-input";
// import { FormControl, FormHelperText } from "@mui/material";
// import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ mode: "all" });

  const [open, setOpen] = useState(false);

  const [nameTyping, setNameTyping] = useState(""); // when user typing the name

  const [emailTyping, setemailTyping] = useState(""); // when typing email changes storing state

  const [emailList, setEmailList] = useState([]); // list of emails

  const [phoneTyping, setPhoneTyping] = useState("");

  const [phoneList, setPhoneList] = useState([]);

  const [formData, setFormData] = useState([]);

  const [cardDelete, setCardDelete] = useState([]);

  const [skillSelected, setSkillSelected] = useState([]);

  const top100Films = [
    {
      title: "php",
    },
    {
      title: "React",
    },
    {
      title: "Node js",
    },
    {
      title: "Mysql",
    },
    {
      title: "Python",
    },
    {
      title: "Git",
    },
  ];

  const handleopen = () => {
    setemailTyping("");
    setPhoneTyping("");
    setNameTyping("");
    setEmailList([]);
    setPhoneList([]);
    setSkillSelected([]);
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const addEmail = (e) => {
    const email = [...emailList, emailTyping];
    setEmailList(email);
    setemailTyping("");
  };

  // deleting the email field
  const deleteEmail = (index) => {
    // console.log("index: ", index);

    const delEmail = [...emailList];

    // console.log("email", delEmail);

    delEmail.splice(index, 1);
    console.log(delEmail.splice(index, 1));
    setEmailList(delEmail);
    setemailTyping("");
  };

  const addPhone = (e, value) => {
    // console.log("phn",value);
    const phone = [...phoneList, value];
    // console.log(phone);
    setPhoneList(phone);
    setPhoneTyping("");
  };

  const deletePhone = (value, index) => {
    // console.log("phn", value, index);
    const delPhone = [...phoneList];
    // console.log("dl",delPhone);
    // console.log("phn",phone);
    delPhone.splice(index, 1);
    setPhoneList(delPhone);
    console.log(delPhone);
    setPhoneTyping("");
  };

  const handlePhoneInput = (value, country, e, formattedValue) => {
    // console.log(value, formattedValue, country, country.dialCode.length);

    if (
      !isValidPhoneNumber(formattedValue, country.countryCode) &&
      value.length > country.dialCode.length
    ) {
      setError("phonenumber", {
        type: "validate",
        message: "phoneNumber is mandatory",
      });
    } else {
      clearErrors("phonenumber");
      setValue("phonenumber", formattedValue);
    }
    setPhoneTyping(formattedValue);
  };

  const validatePhoneInput = (handlePhoneInput) => {
    if (handlePhoneInput) {
      isValidPhoneNumber(handlePhoneInput);
      return true;
    } else if (handlePhoneInput.length == 10) {
      return true;
    } else {
      return false;
    }
  };

  // edit the card
  const editCard = (index) => {
    // setCardEdit(data);
    const edit = formData[index];
    console.log("formData", edit);
    setValue("name", edit.name);

    setNameTyping(edit.name);
    setEmailList(edit.email);
    setPhoneList(edit.phonenumber);
    setSkillSelected(edit.film_options);
    // setPhoneTyping(edit["phonenumber"]);
    // setValue("email", edit.email);
    // setValue("phonenumber", edit.phonenumber);
    setValue("isedit", 1);
    setValue("id", index);
    setOpen(true);
  };

  const AddorEdit = getValues("isedit");
  const ind = getValues("id");

  const onsubmit = (data) => {
    console.log("data", data);
    if (AddorEdit === 1) {
      // emailList.push(data.email);
      // phoneList.push(data.phonenumber);
      const newDatas = {
        ...data,
        email: emailList,
        phonenumber: phoneList,
      };
      formData[ind] = newDatas;
      console.log(formData);
      setOpen(false);
    } else {
      const newData = {
        ...data,
        email: emailList,
        phonenumber: phoneList,
      };
      formData.push(newData);
      console.log(emailList);
      setemailTyping("");
      setNameTyping("");
      setPhoneTyping("");
      setOpen(false);
    }
  };

  // console.log("err", errors);

  // Delete card
  const deleteCard = (index) => {
    // console.log(index);
    const delCard = [...formData];
    console.log("de", delCard);
    delCard.splice(index, 1);
    setCardDelete(delCard);
    setFormData(delCard);
    // console.log("del",delCard);
  };

  // checking any error occured when onsubmit not working
  // const onInvalid = (errors) => console.error(errors);

  // cancel button function-modal closing and form resetting to initial
  const onCancel = (e) => {
    setOpen(false);
    setemailTyping("");
    setPhoneTyping("");
    setNameTyping("");
  };

  // auto fill select
  const selectAutomatic = (e, options) => {
    setValue("film", options, { shouldValidate: true });
    setValue("film_options", options, { shouldValidate: true });
    setSkillSelected(options);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "100%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleopen}>
        add button
      </Button>
      <Modal open={open} onClose={modalClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="form-floating pb-3">
              <TextField
                label="Name here"
                variant="outlined"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: " atleast 3 character is required",
                  },
                  // maxLength: {
                  //   value: 15,
                  //   message: "allowed only 15 characters",
                  // },
                })}
                type="text"
                value={nameTyping}
                onChange={(e) => setNameTyping(e.target.value)}
              />
              <p>{errors.name?.message}</p>
            </div>

            <div className="email pb-3">
              <TextField
                label="Email here"
                variant="outlined"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  // minLength: {
                  //   value: 5,
                  //   message: "atleast 4 character is required",
                  // },
                  //   maxLength:{value:20,message:"allowed only 20 characters"},
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email",
                  },
                })}
                value={emailTyping}
                onChange={(e) => setemailTyping(e.target.value)}
              />
              <p>{errors.email?.message}</p>
              <AddIcon onClick={(e) => addEmail(e)} />
            </div>
            {emailList.map((value, index) => {
              return (
                <div>
                  <li key={index}>
                    {value}
                    <DeleteIcon onClick={() => deleteEmail(index)} />
                  </li>
                </div>
              );
            })}

            <div className="form-floating phonenumber pb-3">
              <PhoneInput
                name="phoneNumber"
                type="tel"
                placeholder="phonenumber"
                country={"in"}
                {...register("phonenumber", {
                  required: "phonenumber is required",
                  minLength: {
                    value: 10,
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      //       message:"phonenumber must be 10 character",
                    },
                    validate: (value) => validatePhoneInput(value),
                  },
                })}
                value={phoneTyping}
                onChange={(value, country, e, formattedValue) =>
                  handlePhoneInput(value, country, e, formattedValue)
                }
              />
              <p>{errors.phonenumber?.message}</p>
              <AddIcon onClick={(e) => addPhone(e, phoneTyping)} />{" "}
              {/* <p>{errors.phonenumber?.message}</p> */}{" "}
            </div>

            {phoneList.map((value, index) => {
              return (
                <div>
                  <ul>
                    <li key={index}>
                      {value}
                      <DeleteIcon onClick={() => deletePhone(value, index)} />
                    </li>
                  </ul>
                </div>
              );
            })}
            <div className>
              <Autocomplete
                multiple
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[1]]}
                onChange={(e, options) => selectAutomatic(e, options)}
                //{(e, options) =>
                // setValue("movie",options);
                //setValue("film_options", options);
                //setFilmSelector(options);
                //}

                renderInput={(movie) => (
                  <TextField
                    {...movie}
                    label="skill"
                    placeholder="Favorites"
                    {...register("film", {
                      required:
                        skillSelected.length > 0
                          ? false
                          : "The field is required",
                    })}
                  />
                )}
                value={skillSelected}
              />

              <p>{errors.film?.message}</p>
              {/* {console.log("e", skillSelected.length, errors.film)} */}
              {/* {required===true ? <p>sdgsdfs</p>:<p></p>} */}
              {/* {(skillSelected.length) > 0 ? <p>sefsdfdf</p> :<p></p>} */}
            </div>
            <Button variant="outlined" color="error" type="submit">
              save
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={(e) => onCancel(e)}
            >
              cancel
            </Button>
          </form>
        </Box>
      </Modal>
      {formData.map((data, index) => {
        return (
          <Card style={{ width: "18rem" }} key={index} className="card">
            <Card.Body>
              <Card.Title>Form Data</Card.Title>
              <Card.Text>Name:{data.name}</Card.Text>
              <Card.Text>Email:{data.email.map((em) => em + ",")}</Card.Text>
              <Card.Text>PhoneNumber:{data.phonenumber + ", "}</Card.Text>
              <Card.Text>
                skills:{data.film_options.map((film) => film.title + ", ")}{" "}
              </Card.Text>
              <Card.Text>
                <EditIcon onClick={() => editCard(index)} />
              </Card.Text>
              <Card.Text>
                <DeleteIcon onClick={() => deleteCard(index)} />
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}{" "}
    </>
  );
}
export default App;
