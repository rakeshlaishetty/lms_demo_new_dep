import React , { useEffect,useState } from 'react'
import { Grid,InputLabel,Button  } from '@material-ui/core';
import axios from 'axios';
export default function AddDocument() {
  const [document, setDocument] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [classes,setClasses]=useState([])
  const [ resMsg,setResMsg ] = useState("")
  const [ resErrMsg,setResErrMsg ] = useState("")
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocument({ ...document, [name]: value });
  };
  const getClasses = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    let res = await axios.get(`/getAssignedClassToTeachersClass?schoolId=${adm.schoolId}&TeacherId=${adm._id}`);
    if(res.status === 200){
        setClasses(res.data);
        console.log('here data',res.data)
    }
}
useEffect(() => {
  getClasses()
}, [])

  return (
    <div>
        <div
        className="mt-3"
        style={{
          width: "95%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
                      <div>
                      <form id='form' onSubmit={async (e)=>{
                        e.preventDefault()
                  let {schoolId,_id}= JSON.parse(window.localStorage.getItem('userdata'));
                  let docInfo = {...document, class:selectedClass, division:selectedDivision,teacherId:_id,schoolId,image:e.target.elements.pic.files[0]}
                  let formData= new FormData()
                  for (let name in docInfo) {
                    console.log(name)
                    formData.append(name, docInfo[name]);}
                  
                  formData.append('file',e.target.elements.pic.files[0])
                  console.log(formData)
                  let res = await axios.post('/addLibraryDocument',formData);
                  if(res.status === 200){
                    alert('Document added successully');
                    setResMsg(res.data.message)
                  }
                  else{
                    setResErrMsg(res.data.message)
                  }
                }
                }>
                      <div className="form-group">
                            <label htmlFor="inputDocument" className="label">Document Name</label>
                            <input name='DocName' type="text" className="form-control mt-2" id="inputDocument" placeholder="History Notes" onChange={handleInputChange} required/>
                        </div>
                      <div className="form-group mt-4">
                            <label htmlFor="documentType" className="label">Document Type</label>
                            <input name='DocType' type="text" className="form-control mt-2" id="documentType" placeholder="Ex. jpeg" onChange={handleInputChange} required/>
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="inputClass" className="label">Assign class</label>
                            <select name='subjectClass' id="inputClass" className="form-control mt-2"
                             onChange={(e) =>{
                              if(e.target.value){
                                let [selectedClass,division] = e.target.value.split(",")
                                setSelectedClass(selectedClass)
                                setSelectedDivision(division)
                              }
                            } }>
                                <option value=''></option>
                                {
                                  classes?
                                    classes.map(x=><option value={`${x.class},${x.division}`}>{x.class}-{x.division}</option>)
                                  :""
                                }
                            </select>
                        </div>
                      <input className='mt-4' type="file" id="myFiles" name="pic" accept="image/*"  />
                      <div className='d-flex justify-content-center mt-3 py-3'>
                      <button
                      className='btn-rounded attendance-button'
                type='submit'
                style={{width: 'auto'}}
               
              >
                Add Document
              </button>
                      </div>
                      </form>
                      {resMsg?<h2 className='text-success'>{resMsg}</h2>:""}
                      {resErrMsg?<h2 className='text-danger'>{resErrMsg}</h2>:""}
                      
             </div>         
        </div>
    </div>
  )
}
