import React, { useEffect, useState } from "react";
import axios from 'axios';
import Voucher from './AdminVoucherComponent'

export default function Modal() {
  
    const [voucher, setVoucher] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/voucher')
            const responseData = response.data
            console.log(responseData)
            setVoucher(responseData)
        } catch (error) {
            console.error("Loi do du lieu", error)
        }
    };
    useEffect(() => {
       
        fetchData();
    }, [])

    const getVoucher = async (id) => {
        try {
            const totalAndShip = {
                "total": 1000,
                "shiping": 20
            };
            const response = await axios.post(`http://localhost:8080/api/voucher/usevoucher/${id}`, totalAndShip);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
        <Voucher/>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Khuyến mãi
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none flex-grow">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Voucher
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
</div>
                                {/*body*/}
                                <div className="grid grid-rows-2 grid-flow-col gap-4">
                                    {voucher.map(item => (
                                        <div className="text-center" key={item.id}>{item.nameVoucher}
                                            <div className="flex justify-center">
                                                <img src="https://lh6.googleusercontent.com/jO_cEr2BmpBaWvW0dajO3Q-En72dgctZi2InwR4UH2ka263JtegSlU-7LHg49Kk6XUW01vwenKfSpp65KTZ6swl1Y9raYF0PC0AM4l7VF2s8SUoQ_qbeJwqRR3trTRY2ER62FAcDy2fp2tPp6bwBRxQ" className="self-center w-50 h-40 mx-6" />

                                            </div>
                                            <p>{item.description}</p>
                                            <div className="flex justify-center">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                    onClick={() => getVoucher(item.id)}>
                                                    Áp dụng
                                                </button>

                                            </div>

                                        </div>

                                    ))}





                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}