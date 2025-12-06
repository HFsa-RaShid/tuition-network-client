import React, { useMemo, useState, useEffect } from "react";
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
import PieChart from "../../../../components/PieChart";
import useAllPayment from "../../../../hooks/useAllPayment";
import MonthlyStatusChart from "../../../../components/MonthlyStatusChart";
import EmptyState from "../../../../components/EmptyState";

const MetricCard = ({ icon, label, value, helper }) => (
  <div className="bg-gray-100/90 border border-gray-100 rounded-xl p-5 shadow-lg flex items-center gap-4">
    <span className={`text-blue-500 text-sm p-3 bg-blue-200 rounded-xl`}>
      {icon}
    </span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
      {helper && <p className="text-xs text-gray-400 mt-1">{helper}</p>}
    </div>
  </div>
);

const RevenueBreakdown = ({ summary }) => {
  const tutor = summary?.revenueSummary?.tutor || 0;
  const platform = summary?.revenueSummary?.platform || 0;
  const total = summary?.revenueSummary?.total || tutor + platform;

  const pieData = [
    { label: "Paid to tutors", value: tutor, color: "#10b981" },
    { label: "TuToria commission", value: platform, color: "#7c3aed" },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <MdOutlinePayments className="text-blue-500 text-2xl" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Platform Revenue
          </h3>
          <p className="text-sm text-gray-500">
            Visual breakdown of recent confirmed payments
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <PieChart data={pieData} size={180} innerRadius={56} />
        </div>

        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-2">Total collected</div>
          <div className="text-2xl font-semibold text-gray-800 mb-4">
            {total?.toLocaleString("en-US") || 0} BDT
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded"
                  style={{ background: "#10b981" }}
                />
                <span>Paid to tutors</span>
              </div>
              <div className="font-semibold text-emerald-600">
                {tutor?.toLocaleString("en-US") || 0} BDT
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded"
                  style={{ background: "#7c3aed" }}
                />
                <span>TuToria commission</span>
              </div>
              <div className="font-semibold text-purple-600">
                {platform?.toLocaleString("en-US") || 0} BDT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MiniTrendBar = ({ data }) => {
  const max = useMemo(
    () =>
      data && data.length ? Math.max(...data.map((item) => item.amount)) : 1,
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
          <div
            key={i}
            className="h-16 bg-gray-100/90 rounded-xl animate-pulse"
          />
        ))}
      </div>
    ) : notices.length === 0 ? (
      <EmptyState message="No notices published yet." />
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
      reset({
        title: "",
        message: "",
        audience: "all",
        priority: "normal",
      });
    }
  });

  return (
    <form
      onSubmit={submit}
      className="bg-[#eeeef3] border border-gray-100 rounded-xl p-2 shadow-lg space-y-4 h-full"
    >
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaBullhorn className="text-red-500" /> Publish Notice
      </h3>

      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="w-full border white border-gray-200 rounded-lg px-4 py-3 text-sm"
      />

      <textarea
        {...register("message", { required: true })}
        placeholder="Message"
        rows={18}
        className="w-full border bg-white border-gray-200 rounded-lg px-4 py-3 text-sm min-h-[220px]"
      />

      <div className="grid grid-cols-2 gap-3 text-sm">
        <select
          {...register("audience")}
          className="border border-gray-200 bg-white rounded-lg px-3 py-2"
        >
          <option value="all">All Users</option>
          <option value="students">Students</option>
          <option value="tutors">Tutors</option>
        </select>

        <select
          {...register("priority")}
          className="border border-gray-200 bg-white rounded-lg px-3 py-2"
        >
          <option value="normal">Normal Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full bg-gradient-to-r from-blue-300 to-blue-500 text-black py-3 rounded-lg text-base font-semibold hover:bg-indigo-700 transition"
      >
        {formState.isSubmitting ? "Publishing..." : "Publish Notice"}
      </button>
    </form>
  );
};


const AdminDashboard = () => {
  const { summary, isLoading, isError, refetch } = useStatsSummary();
  const { allPayment = [] } = useAllPayment();
  const {
    notices = [],
    isLoading: noticeLoading,
    refetch: refetchNotices,
  } = useDashboardNotices();
  const axiosSecure = useAxiosSecure();

  // monthly banned/unbanned chart state (derived from /users)
  const [monthlyStatus, setMonthlyStatus] = useState([]);
  const [monthlyLoading, setMonthlyLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchUsersAndCompute = async () => {
      setMonthlyLoading(true);
      try {
        const res = await axiosSecure.get("/users");
        const users = res?.data || [];

        // compute last 6 months labels
        const months = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          months.push({
            key: `${d.getFullYear()}-${d.getMonth()}`,
            label: d.toLocaleString("en-US", { month: "short" }),
            year: d.getFullYear(),
            month: d.getMonth(),
            banned: 0,
            unbanned: 0,
          });
        }

        users.forEach((u) => {
          const created =
            u.createdAt ||
            u.created_at ||
            u.created ||
            u.createdOn ||
            u.joinedAt ||
            u.registeredAt ||
            u.updatedAt ||
            u.updated_at;
          const date = created ? new Date(created) : null;
          if (!date) return;
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          const monthObj = months.find((m) => m.key === key);
          if (!monthObj) return;
          if (u.banned === "yes") monthObj.banned += 1;
          else monthObj.unbanned += 1;
        });

        if (mounted) setMonthlyStatus(months);
      } catch (err) {
        // ignore errors
      } finally {
        if (mounted) setMonthlyLoading(false);
      }
    };
    fetchUsersAndCompute();
    return () => {
      mounted = false;
    };
  }, [axiosSecure]);

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
  // If raw payment list is available, prefer those totals so Admin dashboard matches AllPayment page
  const tutoriaPaymentsFromAll = allPayment.filter((p) => p.tuToriaAmount > 0);
  const tutorPaymentsFromAll = allPayment.filter((p) => p.tutorAmount > 0);

  const totalTutoriaFromAll = tutoriaPaymentsFromAll.reduce(
    (s, p) => s + (p.tuToriaAmount || 0),
    0
  );
  const totalTutorFromAll = tutorPaymentsFromAll.reduce(
    (s, p) => s + (p.tutorAmount || 0),
    0
  );

  const mergedSummary = allPayment.length
    ? {
        ...summary,
        revenueSummary: {
          tutor: totalTutorFromAll,
          platform: totalTutoriaFromAll,
          total: totalTutorFromAll + totalTutoriaFromAll,
        },
      }
    : summary;

  // build recentPayments from raw payments so MiniTrendBar can render consistent bars
  const recentPaymentsFromAll = allPayment
    .slice()
    .sort((a, b) => new Date(b.paymentTime) - new Date(a.paymentTime))
    .slice(0, 6)
    .map((p) => ({
      transactionId: p.transactionId || p._id,
      amount: (p.tuToriaAmount || 0) + (p.tutorAmount || 0),
      name:
        p.email ||
        p.studentEmail ||
        (p.tutorId ? `Tutor ${p.tutorId}` : "User"),
    }));

  if (allPayment.length) {
    mergedSummary.recentPayments = recentPaymentsFromAll;
  }

  return (
    <div className="px-4 lg:px-0 pb-10 ml-10">
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
        <div className="lg:col-span-2 bg-gray-100/90 border border-gray-100 rounded-2xl p-6 shadow-lg">
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
          <RevenueBreakdown summary={mergedSummary} />
          <div className="mt-6">
            <div className="mt-6 bg-white border border-gray-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Monthly banned / unbanned users
              </h4>
              {monthlyLoading ? (
                <div className="h-24 flex items-center justify-center text-sm text-gray-500">
                  Loading...
                </div>
              ) : (
                <MonthlyStatusChart data={monthlyStatus} />
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-100/90 border border-gray-100 rounded-2xl p-2 shadow-lg">
          <div className="min-h-[480px] p-4">
            <NoticeComposer onSubmit={handleNoticePost} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <div className="bg-gray-100/90 border border-gray-100 rounded-2xl p-6 shadow-lg">
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
