
import moment from "moment";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import usePaidJobs from "../../../../hooks/usePaidJobs";
import { AuthContext } from "../../../../provider/AuthProvider";
import { useContext } from "react";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { paidJobs,refetch, isLoading } = usePaidJobs(currentUser?.email);

  const handleDownloadInvoice = async (job) => {
    try {
      const newWindow = window.open("", "_blank", "width=800,height=600");
      if (!newWindow) {
        alert("Please allow pop-ups to download the invoice.");
        return;
      }

      const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice</title>
          <style>
            /* Reset some default styles */
            body { margin: 0; padding: 20px; font-family: sans-serif; }
            * { box-sizing: border-box; }


            .invoice-container {
              width: 800px;
              padding: 30px;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: white;
            }
            .header-section {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              
              padding-bottom: 10px;
            }
            .details-section {
              margin-bottom: 20px;
              
              padding: 15px;
              
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              padding: 12px;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
              text-align: left;
              color: #333;
            }
            td {
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header-section" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px;">
  <div>
    <h1 style="text-align: left; color: #333; font-size: 40px; margin-bottom: 0;">
      TuToria
    </h1>
    
  </div>
  <div style="text-align: right;">
    <span style="background-color: #4CAF50; color: white; font-size: 24px; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
      PAID
    </span>
  </div>
</div>

            </div>
          
            <div class="header-section">
              <div>
                <h3 style="color: #555; margin-bottom: 5px;">Invoice Number: <span style="font-weight: normal;">#${job._id.slice(
                  0,
                  8
                )}</span></h3>
                <h3 style="color: #555; margin-bottom: 5px;">Date: <span style="font-weight: normal;">${moment(
                  job.paymentTime
                ).format("DD MMM YYYY")}</span></h3>
              </div>
              
            </div>

            <div class="header-section">
            <div class="details-section" style="text-align: left;">
                <h2 style="color: #333; font-size: 20px;">TuToria</h2>
                <p style="color: #777; margin: 0;">University of Barishal</p>
                <p style="color: #777; margin: 0;">support.tutoria@gmail.com</p>
              </div>


            <div class="details-section">
              <h3 style="color: #333; font-size: 20px; margin-bottom: 8px;">Invoice To:</h3>
              <p style="margin: 0; color: #555;"><strong>Student Name:</strong> ${
                job.name || "N/A"
              }</p>
              <p style="margin: 0; color: #555;"><strong>Student Email:</strong> ${
                job.email || "N/A"
              }</p>
              <p style="margin: 0; color: #555;"><strong>Student Email:</strong> ${
                job.transactionId || "N/A"
              }</p>
            </div>
            </div>


            <div class="details-section">
  <h3 style="color: #333; font-size: 20px; margin-bottom: 10px;">Job Details:</h3>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <p style="margin: 0; color: #555;">
      <strong>Tuition Type:</strong> ${job.jobDetails?.tuitionType || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>Category:</strong> ${job.jobDetails?.category || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>Class/Course:</strong> ${job.jobDetails?.classCourse || "N/A"}
    </p>
   
    <p style="margin: 0; color: #555;">
      <strong>City:</strong> ${job.jobDetails?.city || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>Location:</strong> ${job.jobDetails?.location || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>Student Gender:</strong> ${job.jobDetails?.studentGender || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>No. of Students:</strong> ${job.jobDetails?.noOfStudents || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>Days per Week:</strong> ${job.jobDetails?.daysPerWeek || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>Duration:</strong> ${job.jobDetails?.duration || "N/A"}
    </p>
    <p style="margin: 0; color: #555;">
      <strong>Salary:</strong> ${job.jobDetails?.salary || "N/A"} BDT
    </p>
    
    <p style="margin: 0; color: #555;">
      <strong>Tutor Gender Preference:</strong> ${
        job.jobDetails?.tutorGenderPreference || "N/A"
      }
    </p>
     <p style="margin: 0; color: #555;">
      <strong>Subjects:</strong> ${job.jobDetails?.subjects.join(", ") || "N/A"}
    </p>
  </div>
</div>


            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fee for ${job.jobDetails?.classCourse || "N/A"}</td>
                  <td style="text-align: right;">${job.amount} BDT</td>
                </tr>
              </tbody>
            </table>


            <div style="text-align: right; margin-top: 20px;">
              <p style="font-size: 18px; font-weight: bold; color: #333;">Total Amount: ${
                job.amount
              } BDT</p>
            </div>


            <div style="text-align: center; margin-top: 40px; color: #777;">
              <p>Thank you!</p>
            </div>
          </div>
        </body>
        </html>
      `;

      newWindow.document.write(invoiceHTML);
      newWindow.document.close();

      // Wait for a moment to ensure content is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Use html-to-image to generate a canvas from the new window's body
      const canvas = await htmlToImage.toCanvas(newWindow.document.body, {
        backgroundColor: "#ffffff",
        // Exclude scrollbars from the image capture
        width: 800,
        height: newWindow.document.body.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${job._id}.pdf`);

      // Close the temporary window after a successful download
      newWindow.close();
    } catch (error) {
      console.error("Failed to generate invoice:", error);
      alert(
        `Failed to generate invoice. Please try again. Detailed error: ${error.message}`
      );
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4 ml-8 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Payment History
      </h2>
      {paidJobs?.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-center">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-center">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Course Name</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Payment Time</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paidJobs.map((job, index) => (
                <tr key={job._id} className="hover:bg-gray-50 text-gray-800">
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
                      onClick={() => handleDownloadInvoice(job)}
                      className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                      disabled={!job.paidStatus}
                    >
                      Download Invoice 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;




