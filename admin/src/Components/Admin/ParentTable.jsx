import React, { useState, useEffect } from 'react';
import { ListUsers } from './ListUsers';
import { ViewRegisters } from './ViewRegisters';
import { AddUser } from './AddUser';
import axios from 'axios';

//import { useSelector } from 'react-redux';

export const ParentTable  = ({ item }) => {
  
    const handleDelete = async (id) => {
      try {
        const headers = {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOSwiZW1haWwiOiJtYW5hZ2VyQHNwbS5jb20iLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTY3NzgyMjExNiwiZXhwIjoxNjc3OTA4NTE2fQ.JIVQvSEki1OksXAS9bqZ9iu0iHfczcHjKPf4zOC0hgE'
        };
        await axios.delete(`/manager/deletePatient/${id}`,{headers});
        //const updatedData = data;
        //setData(updatedData);
      } catch (error) {
        console.error(error);
      }
    }

    const handleAccept = async (id) => {
      try {
        const headers = {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOSwiZW1haWwiOiJtYW5hZ2VyQHNwbS5jb20iLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTY3NzgyMjExNiwiZXhwIjoxNjc3OTA4NTE2fQ.JIVQvSEki1OksXAS9bqZ9iu0iHfczcHjKPf4zOC0hgE'
        };
        await axios.put(`http://localhost:3001/api/v1/manager/approveRegistration/${id}`,null,{headers});
      } catch (error) {
        console.error(error);
      }
    }

    const handleReject = async (id) => {

      console.log(id);
      try {
        const headers = {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOSwiZW1haWwiOiJtYW5hZ2VyQHNwbS5jb20iLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTY3NzgyMjExNiwiZXhwIjoxNjc3OTA4NTE2fQ.JIVQvSEki1OksXAS9bqZ9iu0iHfczcHjKPf4zOC0hgE'
        };
        await axios.delete(`manager/denyRegistration/${id}`,{headers});
        //const updatedData = data;
        //setData(updatedData);
      } catch (error) {
        console.error(error);
      }
    }

    const handleSubmit = (id) => {
      const updatedData = data;
      setData(updatedData);
  };

    // const handleAccept = (record) => {
    //     // implement logic to accept user
    //         alert("User Accepted");
    // };

    function calculateAge(dateOfBirth) {
      //console.log(dateOfBirth);
      let [year, month, day] = dateOfBirth.split('-');
      day = day.substring(0,2);
      //console.log(year + " " + month + " " + day);
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    
    const getStaffStatus = (medicalStaff) =>{

      if(medicalStaff === null || medicalStaff === NaN){
        return 'Active';
      }else{
        return medicalStaff.active === true ? 'Active' : 'Pending';
      }
    }

    const getRole = (user) => {
      return user.role === 'patient' ? user.role : user.medical_staff.type === 'd' ? 'Doctor' : 'Counsellor';
    }

    const getLicenseNumber = (user) => {      
      if(user.role === 'patient'){
        return 'N/A';
      }
      return user.medical_staff.license_number;
    }
    
    // //Same as delete
    // const handleReject = (record) => {
    //     // implement logic to reject user
    //         alert("User Rejected");
    // };
    const [data, setData] = useState([]);
    //Fecth data API
    try {
      const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozOSwiZW1haWwiOiJtYW5hZ2VyQHNwbS5jb20iLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTY3NzgyMjExNiwiZXhwIjoxNjc3OTA4NTE2fQ.JIVQvSEki1OksXAS9bqZ9iu0iHfczcHjKPf4zOC0hgE'
      };
    useEffect(()=>{
      const fetchData = async () => {
        const result = await axios.get('/manager/getallusers',{headers});
        const userArray = result.data;
        let newUserArray= [];
        userArray.map(function(user){

          const userObj = {
            key: user.user_id,
            id: user.user_id,
            name: user.name,
            age: calculateAge(user.date_of_birth),
            number: user.phone_number,
            address: user.address,
            email: user.email,
            role: getRole(user),
            status: getStaffStatus(user.medical_staff),
            license: getLicenseNumber(user)

          }
          newUserArray.push(userObj);
        });
        setData(newUserArray);
      };
        fetchData();
      }, [data]);
    }
    catch (error)
    {
      console.log(error)
    }
    
  return (
    // <TableComponent data={data} handleDelete={handleDelete} />
    //<ViewRegisters data={data} />
    <>
    {item === "2" ? (
        <ListUsers key="2" data={data} handleDelete={handleDelete} />
      ) : item === "1" ? (
        <ViewRegisters key="1" data={data} handleAccept={handleAccept} handleReject={handleReject}/>
      ) : item === "3" ? (
        <AddUser key="3" handleSubmit={handleSubmit}/>
      ) : (
        <p>None of the conditions are true</p>
      )}
    </>
  )
}
