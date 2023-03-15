import React  from 'react';
import { Button,TextField } from "@mui/material";
import {useFormik} from 'formik';
import * as yup from 'yup';





// schema validations
export const expensevalidation = yup.object({
 fule : yup.number(),
 movie : yup.number(),
 food : yup.number().required("Food is must"),
 loan : yup.number(),
 medical : yup.number(),
 others : yup.number()
})

const Addexpense = ({setAddBtn,setExpensepopup, setAddexpense,expensesData,setExpensesData,setNewexpense}) => {

    // console.log(expensesData)
    const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
          

        initialValues : {
            fuel:"",
            movie:"",
            food:"",
            loan:"",
            medical:"",
            others:""
        },

        validationSchema : expensevalidation ,
        onSubmit : (newexpense)=>{
            addNewexpense(newexpense)
            setNewexpense(newexpense)
            // console.log(newexpense)
        }
    })

    // const history =useHistory();


    const addNewexpense = async(newexpense) => {

        try {
     
            const response = await fetch("http://localhost:9000/expense/add",{
                method:"POST",
                body:JSON.stringify(newexpense),
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const data = await response.json();
            // console.log(data.data)
            setExpensesData([...expensesData,data.data])
    
            setExpensepopup(true)
            setAddexpense(false)

        } catch (error) {
            console.log("Error Occure :" , error)
        }
    }
     
    // console.log(newexpense)

    return(
    
         <form onSubmit={handleSubmit} className='inputfield'>
          <TextField 
           fullWidth label="Enter fuel expense"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.fuel}
           name="fuel"
           id="fullWidth"
           style={{marginTop:"3px"}}
           />
           <TextField 
           fullWidth label="Enter movie expense"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.movie}
           name="movie"
           id="fullWidth"
           style={{marginTop:"3px"}}
           />
           <TextField 
           fullWidth label="Enter food expense"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.food}
           name="food"
           id="fullWidth"
           style={{marginTop:"3px"}}
           />
           <TextField 
           fullWidth label="Enter loan expense"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.loan}
           name="loan"
           id="fullWidth"
           style={{marginTop:"3px"}}
           />
           <TextField 
           fullWidth label="Enter medical expense"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.medical}
           name="medical"
           id="fullWidth"
           style={{marginTop:"3px"}}
           />
           <TextField 
           fullWidth label="Enter others expense"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.others}
           name="others"
           id="fullWidth"
           style={{marginTop:"3px"}}
           />
       {touched.food&&errors.food&& <p style={{textAlign:"center",color:"red"}}>{errors.food}</p>}
           <div className='btn'>
           <Button
           
           color='success'
           variant="contained"
           type='submit'
           style={{margin:"20px 10px 10px 10px"}}
           >

            Add expense
           </Button>
           <Button
        
           variant="filled"
           style={{margin:"20px 10px 10px 10px",color:"grey",fontWeight:"600"}}
           onClick={()=>{setAddexpense(false);setAddBtn(true)}}
           >

            CANCEL
           </Button>
           </div>


         </form>
         
    )
}

export default Addexpense;