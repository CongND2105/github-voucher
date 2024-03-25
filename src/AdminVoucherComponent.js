import axios from "axios";
import React, { useEffect, useState } from "react";




export default function Voucher() {

    const [voucher,setVoucher] = useState([]);
    const [formData,setFormData] = useState({
      nameVoucher : '',
      value : '',
      description : '',
      freeship : ''
    });
    
    const handleChange = (e) =>{
      const {name, value} = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name] : value
      
       
      }));
      console.log(value)
    }
    const resetForm = () => {
      setFormData({
        nameVoucher: '',
        value: '',
        description: '',
        freeship: 'true'
      });
    }
    
    const handleSubmit = async () => {
      
      try {
          const response = await axios.post('http://localhost:8080/api/voucher/create', formData)
          console.log("Add voucher success", response.data)
          console.log(formData.freeship,"create")
          resetForm();
          fetchData();
      } catch (error) {
          console.log("Loi khong the add", error)
      }
      
    }
    const deleteVoucher = async (id) =>{
      try {
          const response = await axios.delete(`http://localhost:8080/api/voucher/delete/${id}`)
          console.log("Xoa thanh cong")
          fetchData();
      } catch (error) {
        console.log("Khong the xoa", error)
      }
    }
    const editVoucher = async (id) =>{
      try {
          const response = await axios.post(`http://localhost:8080/api/voucher/edit/${id}`)
          setFormData(response.data)
          console.log(response.data)
      } catch (error) {
        console.log("khong the chon", error)
      }
    }
    const fetchData = async () =>{
      try {
          const response = await axios.get('http://localhost:8080/api/voucher')
          const responseData = response.data
          console.log(response)
          console.log(responseData)
          setVoucher(responseData)
          
      } catch (error) {
          console.error("Loi do du lieu", error)
      }
  };
    
    useEffect(()=>{
       
        fetchData();
    },[])

    
  return (
    // <form onSubmit={handleSubmit}>
    <div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Name Voucher
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="nameVoucher"
            name="nameVoucher"
            value={formData.nameVoucher}
            type="text"
            placeholder="Name Voucher"
            onChange={handleChange}
          />
          
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Discount value (%)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            name="value"
            value={formData.value}
            onChange={handleChange}
            type="text"
            placeholder="Discount value"
          />
        </div>
      </div>
     
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Freeship
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="freeship"
              value={formData.freeship}
              onChange={handleChange}
            >
              <option value="true">Freeship</option>
              <option value="false">Non-Freeship</option>
              
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit" onClick={handleSubmit}>
            Create
        </button>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                             <div className="overflow-hidden">
                <table
                className="min-w-full text-left text-sm font-light text-surface dark:text-black">
                <thead
                    className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                    <th scope="col" className="px-6 py-4">ID</th>
                    <th scope="col" className="px-6 py-4">Name Voucher</th>
                    <th scope="col" className="px-6 py-4">Discount Value</th>
                    <th scope="col" className="px-6 py-4">Freeship</th>
                    <th scope="col" className="px-6 py-4">Description</th>
                    <th scope="col" className="px-6 py-4">Change</th>
                    </tr>
                </thead>
                <tbody>
                {voucher.map(item => (
                    <tr key={item.id} className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.nameVoucher}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.value}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.freeship ? 'true' : 'false'}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.description}</td>
                      <button className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                      type="submit" onClick={()=>editVoucher(item.id)}>
                      Edit
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="submit" onClick={()=>deleteVoucher(item.id)}>
                      Delete
        </button>
                    </tr>
                  ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
    
    
  );
}
