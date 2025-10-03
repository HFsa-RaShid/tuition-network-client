
import moment from "moment";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { AuthContext } from "../../../../provider/AuthProvider";
import { useContext } from "react";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import useAllHiredByAStudent from "../../../../hooks/useAllHiredByAStudent";
import PaymentRow from "./PaymentRow"; 
import useAxisTutorByID from "../../../../hooks/useAxisTutorByID";

const PaymentHistoryStudent = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { paidJobs, isLoading } = useAllHiredByAStudent(currentUser?.email);

  const filteredJobs = paidJobs?.filter(
    (job) => job.source === "trialClassPayment" || job.source === "advanceSalary"
  );

 
  const handleDownloadInvoice = async (job,tutor) => {
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
            body { margin: 0;  font-family: sans-serif; }
            * { box-sizing: border-box; }
            .invoice-container {
              width: 800px;
              padding: 30px;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: white;
            }
            .header-section { display: flex; justify-content: space-between; margin-bottom: 4px; padding-bottom: 10px; }
            .details-section { margin-bottom: 6px; padding: 6px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; border: 1px solid #ddd; }
            th { background-color: #f2f2f2; text-align: left; color: #333; }
            td { color: #555; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header-section" style="align-items: center;">
              <div>
                <h1 style="color:#333; font-size:40px; margin:0;">TuToria</h1>
              </div>
              <div>
                <span style="background:#4CAF50; color:white; font-size:24px; padding:10px 20px; border-radius:5px; font-weight:bold;">PAID</span>
              </div>
            </div>

            <div class="header-section">
              <div>
                <h3>Invoice Number: <span>#${job._id.slice(0, 8)}</span></h3>
                <h3>Date: <span>${moment(job.paymentTime).format(
                  "DD MMM YYYY"
                )}</span></h3>
              </div>
            </div>

            <div class="header-section">
              <div class="details-section" style="text-align:left;">
                <h2>TuToria</h2>
                
                <p>support.tutoria@gmail.com</p>
              </div>

              <div class="details-section">
                <h3>Invoice To:</h3>
                <p><strong>Student Name:</strong> ${
                  currentUser.name || "N/A"
                }</p>
                <p><strong>Student Email:</strong> ${
                  currentUser.email || "N/A"
                }</p>
                <p><strong>Transaction ID:</strong> ${
                  job.transactionId || "N/A"
                }</p>
              </div>
            </div>

             <!-- 🔹 Tutor Information Section -->
          <div class="details-section" style="border:1px solid #eee; border-radius:6px; padding:6px; margin-bottom:4px;">
            <h3 style="margin-bottom:2px;">Tutor Information</h3>
            <p><strong>Tutor ID:</strong> ${job.tutorId || "N/A"}</p>
            <p><strong>Name:</strong> ${job.name || "N/A"}</p>
            <p><strong>Email:</strong> ${job.email || "N/A"}</p>
            <p><strong>Phone:</strong> ${tutor.phone || "N/A"}</p>
          </div>


            <div class="details-section">
                <h3 style="color: #333; font-size: 20px; margin-bottom: 10px;">Job Details:</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <p style="margin: 0; color: #555;">
                    <strong>Tuition Type:</strong> ${
                                  job.jobDetails?.tuitionType || "N/A"
                    }</p>
                    <p style="margin: 0; color: #555;">
                    <strong>Category:</strong> ${
                                  job.jobDetails?.category || "N/A"
                    }</p>
                    <p style="margin: 0; color: #555;">
                    <strong>Class/Course:</strong> ${
                                  job.jobDetails?.classCourse || "N/A"
                    }</p>
                            
                                <p style="margin: 0; color: #555;">
                                <strong>City:</strong> ${
                                  job.jobDetails?.city || "N/A"
                                }
                                </p>
                                <p style="margin: 0; color: #555;">
                                <strong>Location:</strong> ${
                                  job.jobDetails?.location || "N/A"
                                }
                                </p>
                                <p style="margin: 0; color: #555;">
                                <strong>Student Gender:</strong> ${
                                  job.jobDetails?.studentGender || "N/A"
                                }
                                </p>
                                <p style="margin: 0; color: #555;">
                                <strong>No. of Students:</strong> ${
                                  job.jobDetails?.noOfStudents || "N/A"
                                }
                                </p>
                                <p style="margin: 0; color: #555;">
                                <strong>Days per Week:</strong> ${
                                  job.jobDetails?.daysPerWeek || "N/A"
                                }
                                </p>
                                <p style="margin: 0; color: #555;">
                                <strong>Duration:</strong> ${
                                  job.jobDetails?.duration || "N/A"
                                }
                                </p>
                                <p style="margin: 0; color: #555;">
                                <strong>Salary:</strong> ${
                                  job.jobDetails?.salary || "N/A"
                                } BDT
                                </p>
                                
                                <p style="margin: 0; color: #555;">
                                <strong>Tutor Gender Preference:</strong> ${
                                  job.jobDetails?.tutorGenderPreference || "N/A"
                                }
                                </p>
                                <p style="margin: 0; color: #555;">
                                <strong>Subjects:</strong> ${
                                  job.jobDetails?.subjects.join(", ") || "N/A"
                                }
                                </p>
                            </div>
                     </div>

            <table>
              <thead>
                <tr><th>Description</th><th style="text-align:right;">Amount</th></tr>
              </thead>
              <tbody>
                    <tr>
                        <td>
                        ${
                          job.source === "trialClassPayment"
                            ? `Trial Class Fee for ${
                                job.jobDetails?.classCourse || "N/A"
                              }`
                            : job.source === "advanceSalary"
                            ? "First Month Salary"
                            : "Payment"
                        }
                        </td>
                        <td style="text-align:right;">${job.amount} BDT</td>
                    </tr>
                </tbody>

            </table>

            <div style="text-align:right; margin-top:20px;">
              <p style="font-size:18px; font-weight:bold; color:#333;">Total Amount: ${
                job.amount
              } BDT</p>
            </div>

            <div style="text-align:center; margin-top:40px; color:#777;">
              <p>Thank you!</p>
            </div>
          </div>
        </body>
        </html>
      `;

      newWindow.document.write(invoiceHTML);
      newWindow.document.close();

      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await htmlToImage.toCanvas(newWindow.document.body, {
        backgroundColor: "#ffffff",
        width: 800,
        height: newWindow.document.body.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${job._id}.pdf`);

      newWindow.close();
    } catch (error) {
      console.error("Failed to generate invoice:", error);
      alert(
        `Failed to generate invoice. Please try again. Detailed error: ${error.message}`
      );
    }
  };

  // Small-screen card component (uses hook internally per card)
  const PaymentCardSmall = ({ job, index }) => {
    const { tutorProfile: tutor } = useAxisTutorByID(job.tutorId);
    const statusClass = job.paidStatus
      ? "bg-green-200 text-green-800"
      : "bg-red-100 text-red-800";
    return (
      <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">#{index + 1}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClass}`}>
            {job.paidStatus ? "Paid" : "Unpaid"}
          </span>
        </div>
        <div className="mb-2">
          <p className="text-base font-semibold text-gray-800">{job.jobDetails?.classCourse || "N/A"}</p>
          <p className="text-sm text-gray-600">Amount: {job.amount} BDT</p>
          <p className="text-sm text-gray-600">Status: {job.paidStatus ? "Paid" : "Unpaid"}</p>
          <p className="text-sm text-gray-600">Date: {moment(job.paymentTime).format("DD MMM YYYY")}</p>
        </div>
        <button
          onClick={() => handleDownloadInvoice(job, tutor)}
          className="w-full bg-blue-200 hover:bg-blue-300 text-blue-700 font-semibold py-2 rounded text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!job.paidStatus}
        >
          Download Invoice
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="w-full mt-6 p-4 mx-5 ">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Payment History
        </h2>
        {filteredJobs?.length === 0 ? (
          <p className="text-center text-gray-500">No payment history found.</p>
        ) : (
          <>
            {/* Mobile: stacked cards */}
            <div className="md:hidden space-y-3">
              {filteredJobs.map((job, index) => (
                <PaymentCardSmall
                  key={job._id}
                  job={job}
                  index={index}
                />
              ))}
            </div>

            {/* Desktop/Tablet: table */}
            <div className="hidden md:block overflow-x-auto">
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
                  {filteredJobs.map((job, index) => (
                    <PaymentRow
                      key={job._id}
                      job={job}
                      index={index}
                      currentUser={currentUser}
                      handleDownloadInvoice={handleDownloadInvoice}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryStudent;

