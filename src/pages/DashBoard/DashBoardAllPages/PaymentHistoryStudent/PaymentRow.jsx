import React from "react";
import moment from "moment";
import useAxisTutorByID from "../../../../hooks/useAxisTutorByID";

const PaymentRow = ({ job, index, currentUser, handleDownloadInvoice }) => {
  const { tutorProfile: tutor } = useAxisTutorByID(job.tutorId);

  return (
    <tr className="hover:bg-gray-50 text-gray-800">
      <td className="p-3 border">{index + 1}</td>
      <td className="p-3 border font-semibold">
        {job.jobDetails?.classCourse || "N/A"}
      </td>
      <td className="p-3 border">{job.amount} BDT</td>
      <td className="p-3 border">
        {job.paidStatus ? (
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
            Paid
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
            Unpaid
          </span>
        )}
      </td>
      <td className="p-3 border">
        {moment(job.paymentTime).format("DD MMM YYYY")}
      </td>
      <td className="p-3 border">
        <button
          onClick={() => handleDownloadInvoice(job, tutor)}
          className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
          disabled={!job.paidStatus}
        >
          Download Invoice
        </button>
      </td>
    </tr>
  );
};

export default PaymentRow;
