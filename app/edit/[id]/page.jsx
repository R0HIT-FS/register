import EditForm from '../../Components/EditForm';
import React from 'react';

const getUser=async(id)=>{
  try {

      const res = await fetch(`http://localhost:3000/api/users/${id}`,{
          cache:"no-store"
      })
      if(!res.ok){
          throw new Error("failed to fetch user");
      }
      return res.json()
  } catch (error) {
      console.log(error)
  }

}

const Edit = async({params}) => {
  const {id} = params;
  const data = await getUser(id)
  return (
    <div>
      <EditForm data={data}/>
    </div>
  )
}

export default Edit