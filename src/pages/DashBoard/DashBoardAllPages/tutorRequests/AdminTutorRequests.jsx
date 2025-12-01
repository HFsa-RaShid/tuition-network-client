
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useDemoRequests from "../../../../hooks/useDemoRequests";

const AdminTutorRequests = () => {
  const { demoRequests: requests, refetch, isLoading } = useDemoRequests();
  const axiosSecure = useAxiosSecure();
  const [loadingId, setLoadingId] = useState(null);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [linkInput, setLinkInput] = useState("");
  const [datetimeInput, setDatetimeInput] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const sorted = [...(requests || [])].sort((a, b) => {
    const da = new Date(a.createdAt || a.postedAt || a._id);
    const db = new Date(b.createdAt || b.postedAt || b._id);
    return db - da;
  });

  const openSendLinkModal = (req) => {
    setSelectedReq(req);
    setLinkInput("");
    setDatetimeInput("");
    setSendModalOpen(true);
  };

  const handleDelete = (req) => {
    setSelectedReq(req);
    setDeleteMessage("");
    setDeleteModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 ml-10">
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((r, idx) => (
          <div key={r._id} className="card bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-bold text-lg">{r.studentName || r.userName}</h3>
              <p >ID: {r.studentId || r.studentCustomId || "-"}</p>
              <p >{r.studentEmail || r.userEmail}</p>
              <p >Phone: {r.studentPhone || r.phone || "-"}</p>
            </div>

            <div className="mb-4 border-t pt-2">
              <h4 className="font-semibold">{r.tutorName || r.tutor || "-"}</h4>
              <p >ID: {r.tutorId || r.tutorCustomId || "-"}</p>
              <p >Email: {r.tutorEmail || "-"}</p>
              <p >Phone: {r.tutorPhone || "-"}</p>
            </div>

            <div className="text-sm text-gray-500 mb-2">
              Posted: {new Date(r.createdAt || r.postedAt || r._id).toLocaleString()}
            </div>

            <div className="flex gap-2 mt-auto flex-wrap">
              <button
                className="btn-primary flex-1"
                onClick={() => openSendLinkModal(r)}
                disabled={loadingId === r._id}
              >
                {loadingId === r._id ? "Sending..." : "Send Link"}
              </button>

              <button
                className="btn btn-sm btn-error text-white flex-1"
                onClick={() => handleDelete(r)}
                disabled={loadingId === r._id}
              >
                {loadingId === r._id ? "Removing..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Send Link Modal */}
      <div className={`modal ${sendModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Send Meeting Link</h3>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Meeting Link</span>
            </label>
            <input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              type="text"
              placeholder="https://..."
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Date & Time</span>
            </label>
            <input
              value={datetimeInput}
              onChange={(e) => setDatetimeInput(e.target.value)}
              type="text"
              placeholder="2025-11-27 15:00"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                setSendModalOpen(false);
                setSelectedReq(null);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                if (!linkInput || !datetimeInput) {
                  toast.error("Link and date/time required");
                  return;
                }
                try {
                  setLoadingId(selectedReq._id);
                  await axiosSecure.post("/tutorRequests/send-link", {
                    requestId: selectedReq._id,
                    link: linkInput,
                    datetime: datetimeInput,
                  });
                  toast.success("Link sent");
                  setSendModalOpen(false);
                  setSelectedReq(null);
                  setLinkInput("");
                  setDatetimeInput("");
                  await refetch();
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to send link");
                } finally {
                  setLoadingId(null);
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className={`modal ${deleteModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove Request</h3>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Optional message to student</span>
            </label>
            <textarea
              value={deleteMessage}
              onChange={(e) => setDeleteMessage(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Tutor not interested..."
            />
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                setDeleteModalOpen(false);
                setSelectedReq(null);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={async () => {
                try {
                  setLoadingId(selectedReq._id);
                  await axiosSecure.delete(`/tutorRequestsDemo/${selectedReq._id}`, {
                    data: { notifyMessage: deleteMessage },
                  });
                  toast.success("Request removed and student notified");
                  setDeleteModalOpen(false);
                  setSelectedReq(null);
                  setDeleteMessage("");
                  await refetch();
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to delete");
                } finally {
                  setLoadingId(null);
                }
              }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTutorRequests;
