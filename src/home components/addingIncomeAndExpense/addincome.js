import React, { useState }  from 'react';
import { Button,CircularProgress,TextField } from "@mui/material";
import {useFormik} from 'formik';
import * as yup from 'yup';





// schema validations
export const incomevalidation = yup.object({
 income : yup.number().required("why not tell your income")
})

const AddIncome = ({setAddBtn,setNewincome, setAddincome,setIncomepopup,incomesData,setIncomesData}) => {

    // loading state
    const [loading,setLoading] = useState(false)
    // console.log(incomesData)
    const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
          

        initialValues : {
            income:""
        },

        validationSchema : incomevalidation ,
        onSubmit : (newincome)=>{
            setLoading(true)
            addNewincome(newincome)
            setNewincome(newincome.income)
           
        }
    })

    // const history =useHistory();


    const addNewincome = async(newincome) => {

        try {
     
            const response = await fetch("https://money-manager-backend-git-master-dhanushchinnaiyan.vercel.app/income/add",{
                method:"POST",
                body:JSON.stringify(newincome),
                headers : {
                    "Content-Type" : "application/json",
                    "x-auth-user":localStorage.getItem("userToken")
                }
            });

            const data = await response.json();
            // console.log(data.data)
            setIncomesData([...incomesData,data.data])
            setLoading(false)
            setIncomepopup(true)
            setAddincome(false)
            

        } catch (error) {
            setLoading(false)
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
           disabled={loading&&true}
           sx={{width: "calc(130px + 1vw)"}}
           >

            {loading ? <CircularProgress color='success' size="calc(20px + 0.5vw)"/> : "Add income"}
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