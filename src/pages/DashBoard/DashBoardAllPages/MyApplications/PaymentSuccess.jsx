
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { MdContentCopy } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import usePayment from '../../../../hooks/usePayment';

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const { payments: paymentData, isLoading, isError } = usePayment(tranId);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tranId);
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 1500); 
  };

  if (isLoading) {
    return <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
  }

  if (isError || !paymentData) {
    return <p className="text-center mt-10 text-red-500">Failed to load payment data.</p>;
  }

  return (
    <div className="max-w-[60%] mx-auto mt-24 p-6 border rounded-md shadow-md bg-slate-100">
      <div className="flex items-center justify-center gap-2 text-green-600 mb-6">
        <FaCheckCircle className="text-3xl" />
        <h2 className="text-xl font-semibold">Your payment was successful</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Name</p>
          <p className="font-medium">{paymentData?.name}</p>
        </div>

        <div>
          <p className="text-gray-500">Transaction ID</p>
          <div className="relative flex items-center gap-2">
            <p className="font-medium">{tranId}</p>
            <div
              className="cursor-pointer text-pink-600 relative"
              onClick={handleCopy}
            >
              <MdContentCopy size={20} />

              {/* Tooltip */}
              {tooltipVisible && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-500">Total Amount</p>
          <p className="font-medium">{Number(paymentData?.amount).toFixed(2)} BDT</p>
        </div>
        <div>
          <p className="text-gray-500">Time</p>
          <p className="font-medium">
            {moment(paymentData?.paymentTime).format('hh:mm A DD/MM/YY')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
