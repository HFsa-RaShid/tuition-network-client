import React, { useMemo } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaClipboardList,
  FaClock,
  FaMoneyBillWave,
  FaBullhorn,
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";
import { useForm } from "react-hook-form";
import useStatsSummary from "../../../../hooks/useStatsSummary";
import useDashboardNotices from "../../../../hooks/useDashboardNotices";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MetricCard = ({ icon, label, value, helper, accent }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
    <span className={`text-white text-xl p-3 rounded-2xl ${accent}`}>{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
      {helper && <p className="text-xs text-gray-400 mt-1">{helper}</p>}
    </div>
  </div>
);

const RevenueBreakdown = ({ summary }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <MdOutlinePayments className="text-blue-500 text-2xl" />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Platform Revenue</h3>
        <p className="text-sm text-gray-500">Last few confirmed payments</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Total collected</span>
        <span className="font-semibold">
          {summary?.revenueSummary?.total?.toLocaleString("en-US") || 0} BDT
        </span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Paid to tutors</span>
        <span className="font-semibold text-emerald-600">
          {summary?.revenueSummary?.tutor?.toLocaleString("en-US") || 0} BDT
        </span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>TuToria commission</span>
        <span className="font-semibold text-purple-600">
          {summary?.revenueSummary?.platform?.toLocaleString("en-US") || 0} BDT
        </span>
      </div>
    </div>
  </div>
);

const MiniTrendBar = ({ data }) => {
  const max = useMemo(
    () => (data && data.length ? Math.max(...data.map((item) => item.amount)) : 1),
    [data]
  );

  return (
    <div className="flex gap-3 h-16 items-end">
      {data.map((item) => (
        <div key={item.transactionId} className="flex-1 relative">
          <div
            className="bg-blue-200 rounded-md"
            style={{ height: `${(item.amount / max) * 100}%` }}
          ></div>
          <p className="text-[10px] text-gray-500 text-center mt-1 truncate">
            {item.name?.split(" ")[0] || "Tutor"}
          </p>
        </div>
      ))}
    </div>
  );
};

const NoticeTable = ({ notices, onDelete, loading }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <FaBullhorn className="text-orange-500" />
      <h3 className="text-lg font-semibold text-gray-800">Recent Notices</h3>
    </div>
    {loading ? (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    ) : notices.length === 0 ? (
      <div className="text-center text-gray-400 py-10 text-sm">
        No notices published yet.
      </div>
    ) : (
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="border border-gray-100 rounded-xl p-4 flex justify-between items-start gap-3"
          >
            <div>
              <p className="text-sm text-gray-400 uppercase">
                {new Date(notice.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              <h4 className="font-semibold text-gray-800">{notice.title}</h4>
              <p className="text-sm text-gray-600">{notice.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                Audience: {notice.audience ?? "all"}
              </p>
            </div>
            <button
              onClick={() => onDelete(notice._id)}
              className="text-xs text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const NoticeComposer = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { audience: "all", priority: "normal" },
  });

  const submit = handleSubmit(async (values) => {
    const success = await onSubmit(values);
    if (success) {
      reset({ audience: "all", priority: "normal" });
    }
  });

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3"
    >
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaBullhorn className="text-indigo-500" /> Publish Notice
      </h3>
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
      />
      <textarea
        {...register("message", { required: true })}
        placeholder="Message"
        rows={3}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
      ></textarea>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <select
          {...register("audience")}
          className="border border-gray-200 rounded-lg px-3 py-2"
        >
          <option value="all">All Users</option>
          <option value="students">Students</option>
          <option value="tutors">Tutors</option>
        </select>
        <select
          {...register("priority")}
          className="border border-gray-200 rounded-lg px-3 py-2"
        >
          <option value="normal">Normal Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
      >
        {formState.isSubmitting ? "Publishing..." : "Publish Notice"}
      </button>
    </form>
  );
};

const AdminDashboard = () => {
  const { summary, isLoading, isError, refetch } = useStatsSummary();
  const {
    notices = [],
    isLoading: noticeLoading,
    refetch: refetchNotices,
  } = useDashboardNotices();
  const axiosSecure = useAxiosSecure();

  const handleNoticePost = async (payload) => {
    try {
      await axiosSecure.post("/notices", payload);
      toast.success("Notice published");
      refetchNotices();
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post notice");
      return false;
    }
  };

  const handleNoticeDelete = async (id) => {
    try {
      await axiosSecure.delete(`/notices/${id}`);
      toast.success("Notice deleted");
      refetchNotices();
    } catch (error) {
      toast.error("Failed to delete notice");
    }
  };

  const loading = isLoading;

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load admin insights. Please refresh the page.
      </div>
    );
  }

  const metricCards = [
    {
      icon: <FaUsers />,
      label: "Total Users",
      value: summary?.totalUsers || 0,
      helper: `${summary?.activeStudents || 0} active students`,
      accent: "bg-blue-500",
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "Tutors",
      value: summary?.totalTutors || 0,
      helper: `${summary?.activeTutors || 0} active this week`,
      accent: "bg-emerald-500",
    },
    {
      icon: <FaClipboardList />,
      label: "Tutor Requests",
      value: summary?.totalRequests || 0,
      helper: `${summary?.pendingRequests || 0} pending`,
      accent: "bg-amber-500",
    },
    {
      icon: <FaMoneyBillWave />,
      label: "Payments",
      value: summary?.totalPayments || 0,
      helper: "Completed transactions",
      accent: "bg-purple-500",
    },
  ];

  return (
    <div className="px-4 lg:px-0 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Admin Overview Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Monitor key platform KPIs and manage notices centrally.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {metricCards.map((card, idx) => (
          <MetricCard key={idx} {...card} />
        ))}
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Revenue & Engagement Snapshot
              </h3>
              <p className="text-sm text-gray-500">
                Recent payment performance and tutor activity
              </p>
            </div>
            <FiTrendingUp className="text-indigo-500 text-2xl" />
          </div>
          <RevenueBreakdown summary={summary} />
          <div className="mt-6">
            <p className="text-xs text-gray-400 mb-2">
              Recent payment contributors
            </p>
            <MiniTrendBar data={summary?.recentPayments || []} />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <NoticeComposer onSubmit={handleNoticePost} />
        </div>
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <NoticeTable
            notices={notices}
            loading={noticeLoading}
            onDelete={handleNoticeDelete}
          />
        </div>
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
            Platform health
          </p>
          <h3 className="text-3xl font-bold mt-2">
            {summary?.totalRequests - summary?.pendingRequests || 0} approvals
          </h3>
          <p className="text-sm mt-2 text-indigo-100">
            Keep approval response time under 24h to maintain tutor trust and
            conversion rate.
          </p>
          <div className="mt-6 bg-white bg-opacity-10 rounded-xl p-4">
            <div className="flex justify-between text-sm">
              <span>Confirmation rate</span>
              <span className="font-semibold">
                {summary?.totalRequests
                  ? (
                      ((summary.totalRequests - summary.pendingRequests) /
                        summary.totalRequests) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Active disputes</span>
              <span className="font-semibold text-amber-200">0 cases</span>
            </div>
            <p className="text-xs text-indigo-100 mt-3">
              Tip: Convert notices into actionable updates by sharing benchmarks
              with tutors weekly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;