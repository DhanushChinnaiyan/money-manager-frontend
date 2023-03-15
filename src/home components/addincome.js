import React  from 'react';
import { Button,TextField } from "@mui/material";
import {useFormik} from 'formik';
import * as yup from 'yup';





// schema validations
export const incomevalidation = yup.object({
 income : yup.number().required("why not tell your income")
})

const AddIncome = ({setAddBtn,setNewincome, setAddincome,setIncomepopup,incomesData,setIncomesData}) => {

    // console.log(incomesData)
    const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
          

        initialValues : {
            income:""
        },

        validationSchema : incomevalidation ,
        onSubmit : (newincome)=>{
            addNewincome(newincome)
            setNewincome(newincome.income)
           
        }
    })

    // const history =useHistory();


    const addNewincome = async(newincome) => {

        try {
     
            const response = await fetch("http://localhost:9000/income/add",{
                method:"POST",
                body:JSON.stringify(newincome),
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const data = await response.json();
            // console.log(data.data)
            setIncomesData([...incomesData,data.data])
    
            setIncomepopup(true)
            setAddincome(false)

        } catch (error) {
            console.log("Error Occure :" , error)
        }
    }
     

    return(
    
         <form onSubmit={handleSubmit} className='inputfield'>
          <TextField 
           fullWidth label="Enter income"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.income}
           name="income"
           id="fullWidth"
           
           />
        {touched.income && errors.income ? <p style={{color:"red"}}> {errors.income} </p> : ""}
           <div className='btn'>
           <Button
           
           color='success'
           variant="contained"
           type='submit'
           style={{margin:"20px 10px 10px 10px"}}
           >

            Add income
           </Button>
           <Button
        
           variant="filled"
           style={{margin:"20px 10px 10px 10px",color:"grey",fontWeight:"600"}}
           onClick={()=>{setAddincome(false);setAddBtn(true)}}
           >

            CANCEL
           </Button>
           </div>


         </form>
         
    )
}

export default AddIncome;