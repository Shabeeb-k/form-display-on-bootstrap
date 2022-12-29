import "./App.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TextField from "@mui/material/TextField";

function App() {


  let nextId = 0;



  
  const [open, setOpen] = useState(false);

  const[email,setEmail]=useState('');

  

  const [edit, setEdit] = useState(false);

  const [updateEmail,setupdateEmail]=useState([]);
  
  const[emailarray,setEmailarray]=useState([]);

  const [valPhoneNumber, setValPhonenumber] = useState();

  const { register, handleSubmit, setValue,getValues,} = useForm({
    defaultValues: {
      
    },
  });



  const handleopen = () => {
    setOpen(true);
  };


  const modalClose = () => {
    setOpen(false);
  };



const addEmail = () =>{
  setupdateEmail(email);
  setEmailarray(email);
  console.log("stored",emailarray);
  // console.log("event",email);  
}
  
  const handleEmail = (e) =>{
    setEmail(e.target.value);
    // console.log("email",e.target.value);
  }
  const handleEditMail =(e)=>{
    console.log('e: ', e);
    setEdit(e);
    

      }
  const deleteEmail = (id)=>{
    console.log('updateEmail: ', id);
    
    const delEmail = [...updateEmail];

    console.log("email",delEmail);
    
    delEmail.splice(id,1);

    setupdateEmail(delEmail); 
}

  const onSubmit = (e) => {
  setEmail("email",e.target.value);
  console.log("email",e.target.value);
      }
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
      <button type="button" className="btn btn-dark" onClick={handleopen}>
        add button
      </button>

      {/* <button onClick={handleopen}> add button</button> */}
      <Modal open={open} onClose={modalClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating pb-3">
              <TextField
                label="Name here"
                variant="outlined"
                {...register("name", { required: "Name is required" })}
              />
            </div>

            <div className="email pb-3">
              <TextField
                label="Email here"
                variant="outlined"
                type="email"
                {...register("email", {
                  required: "Email Address is required",
                  
                })}
                onChange={e => setEmail(e.target.value)}
                value = {email}
                   
              />      
              
              <AddIcon className="addicon"  onClick={() => {
        setEmail('');
        
        setupdateEmail([
          ...updateEmail,
          { id: nextId++, email:email }
        ]);
     
    } }
    
      />
      <ul>

        {updateEmail.map((updateEmail,index) => 
        (
          //ternary operator is used on edit icon instead of if else
          <li key={updateEmail.id}>{updateEmail.email} {(email.length==!1)? 
            <EditIcon onClick={()=>handleEditMail(index)}/>:''} {(email.length==!1)?<DeleteIcon onClick={()=>deleteEmail(index)} />:''}
          </li>
        
        ))
        
        }
        
      
      </ul>


            </div>
            <div className="form-floating phonenumber pb-3">
              <PhoneInput
                name="phoneNumber"
                type="tel"
                placeholder="phonenumber"
                country={"in"}
                {...register("phoneNumber", {
                  required: "phoneNumber mandatory",
                  minLength: {
                    value: 10,
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                  },
                })}
              />
              <AddIcon />
            </div>
            <div className="col-md-12 pb-3">
              <button type="button" className="btn btn-success" >
                save
              </button>
              <button type="button" className = "btn btn-danger" >
                cancel
              </button>
            </div>
            <input type="submit" />
          </form>
        </Box>


      </Modal>
    </>
  );
}
export default App;

