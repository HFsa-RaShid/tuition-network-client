import React, { useContext, useMemo } from "react";
import {
  FaClipboardList,
  FaClock,
  FaChalkboardTeacher,
  FaAward,
  FaBullhorn,
} from "react-icons/fa";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAllJobs from "../../../../hooks/useAllJobs";
import useAllHiredByAStudent from "../../../../hooks/useAllHiredByAStudent";
import useDashboardNotices from "../../../../hooks/useDashboardNotices";

const StatCard = ({ icon, label, value, subLabel, accent }) => (
  <div className="bg-[#F9F9FF] border border-gray-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
    <span
      className={`text-blue-500 text-xl p-3 rounded-xl bg-blue-200 bg-opacity-90`}
    >
      {icon}
    </span>
    <div>
      <p className="text-sm text-gray-700">{label}</p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
      {subLabel && <p className="text-xs text-gray-500 mt-1">{subLabel}</p>}
    </div>
  </div>
);

const PerformanceChart = ({ data }) => {
  const maxValue =
    data.length > 0
      ? Math.max(...data.map((item) => Math.max(item.requests, item.hires)), 1)
      : 1;

  return (
    <div className="">
      <div className="flex justify-between items-start mb-4 ">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 ">
            Posting vs Hiring Trend
          </h3>
          <p className="text-sm text-gray-500">
            Last {data.length} months overview
          </p>
        </div>
        <div className="flex gap-3 text-sm ">
          <span className="flex items-center gap-2 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-blue-400"></span> Requests
          </span>
          <span className="flex items-center gap-2 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Hires
          </span>
        </div>
      </div>
      <div className="flex items-end gap-5 h-64 border-t border-gray-300 pt-6 ">
        {data.map((item) => {
          const requestHeight = (item.requests / maxValue) * 100;
          const hireHeight = (item.hires / maxValue) * 100;
          return (
            <div
              key={item.key}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div className="flex items-end gap-2 h-48 w-full justify-center">
                <div
                  className="w-6 rounded-md bg-blue-100 flex items-end justify-center"
                  style={{ height: `${requestHeight}%` }}
                >
                  <span className="text-[11px] text-blue-800 font-semibold mb-1">
                    {item.requests}
                  </span>
                </div>
                <div
                  className="w-6 rounded-md bg-emerald-100 flex items-end justify-center"
                  style={{ height: `${hireHeight}%` }}
                >
                  <span className="text-[11px] text-emerald-700 font-semibold mb-1">
                    {item.hires}
                  </span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          );
        })}
        {data.length === 0 && (
          <div className="text-center text-gray-400 w-full">
            Not enough activity to plot a chart yet.
          </div>
        )}
      </div>
    </div>
  );
};

const NoticeBoard = ({ notices = [], loading }) => (
  <div className="">
    <div className="flex items-center gap-2 mb-4">
      <FaBullhorn className="text-orange-500" />
      <h3 className="text-lg font-semibold text-gray-800">Notice Board</h3>
    </div>
    <div className="space-y-4 max-h-72 overflow-auto pr-1">
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((key) => (
            <div
              key={key}
              className="animate-pulse h-16 bg-gray-100 rounded-xl"
            ></div>
          ))}
        </div>
      )}
      {!loading && notices.length === 0 && (
        <div className="text-center text-gray-400 py-10 text-sm">
          No notices from admin yet.
        </div>
      )}
      {!loading &&
        notices.map((notice) => (
          <div
            key={notice._id}
            className="border border-gray-100 rounded-xl p-4 bg-orange-50"
          >
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold text-gray-800">{notice.title}</p>
              <span className="text-[11px] uppercase tracking-wide text-gray-500">
                {notice.priority || "normal"}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-snug">
              {notice.message}
            </p>
            <p className="text-[11px] text-gray-400 mt-2">
              {new Date(notice.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
    </div>
  </div>
);

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, isLoading: userLoading } = useCurrentUser(user?.email);
  const {
    allJobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
  } = useAllJobs();
  const {
    paidJobs = [],
    isLoading: hiredLoading,
    isError: hireError,
  } = useAllHiredByAStudent(user?.email);
  const {
    notices = [],
    isLoading: noticeLoading,
    isError: noticeError,
  } = useDashboardNotices();

  const studentJobs = useMemo(() => {
    if (!currentUser?.email || !allJobs) return [];
    return allJobs
      .filter((job) => job.userEmail === currentUser.email)
      .sort(
        (a, b) =>
          new Date(b.postedAt || b.createdAt) -
          new Date(a.postedAt || a.createdAt)
      );
  }, [allJobs, currentUser?.email]);

  const totalPosted = studentJobs.length;
  const approvedPosts = studentJobs.filter(
    (job) => job.status === "approved"
  ).length;
  const pendingPosts = totalPosted - approvedPosts;
  const hireCount = paidJobs.length;
  const points = hireCount * 25 + approvedPosts * 10;

  const chartData = useMemo(() => {
    const months = Array.from({ length: 6 }).map((_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      return {
        key,
        label: date.toLocaleString("en-US", { month: "short" }),
        requests: 0,
        hires: 0,
      };
    });

    const monthMap = months.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    }, {});

    studentJobs.forEach((job) => {
      const postedDate = job.postedAt || job.createdAt;
      if (!postedDate) return;
      const date = new Date(postedDate);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (monthMap[key]) {
        monthMap[key].requests += 1;
      }
    });

    paidJobs.forEach((payment) => {
      const paymentDate = payment.paymentTime;
      if (!paymentDate) return;
      const date = new Date(paymentDate);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (monthMap[key]) {
        monthMap[key].hires += 1;
      }
    });

    return months;
  }, [studentJobs, paidJobs]);

  const recentRequests = studentJobs.slice(0, 4);

  const loading =
    userLoading || jobsLoading || hiredLoading || noticeLoading || false;
  const errored = jobsError || hireError || noticeError;

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (errored) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load dashboard insights. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
        <div className=" lg:px-0 pb-10 container ml-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 pt-2">
          Welcome back, {currentUser?.name?.split(" ")[0] || "Student"} 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Track your tuition posts, hired tutors, and stay updated with notices.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <StatCard
          icon={<FaClipboardList />}
          label="Total Tutor Requests"
          value={totalPosted}
          subLabel={`${approvedPosts} approved`}
          accent="bg-blue-500"
        />
        <StatCard
          icon={<FaClock />}
          label="Pending Reviews"
          value={pendingPosts}
          subLabel="Waiting for admin approval"
          accent="bg-amber-500"
        />
        <StatCard
          icon={<FaChalkboardTeacher />}
          label="Tutors Hired"
          value={hireCount}
          subLabel="Includes trial & confirmed"
          accent="bg-emerald-500"
        />
        <StatCard
          icon={<FaAward />}
          label="Engagement Points"
          value={points}
          subLabel="Earn 25 pts per hire"
          accent="bg-purple-500"
        />
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-[#F9F9FF]  rounded-xl border border-gray-100 p-6 shadow-sm">
          <PerformanceChart data={chartData} />
        </div>
        <div className="bg-[#F9F9FF]  rounded-xl border border-gray-100 p-6 shadow-sm">
          <NoticeBoard notices={notices.slice(0, 6)} loading={noticeLoading} />
        </div>
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <div className="bg-[#F9F9FF]  rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Tutor Requests
              </h3>
              <p className="text-sm text-gray-500">
                Latest posts and their statuses
              </p>
            </div>
          </div>
          {recentRequests.length === 0 ? (
            <div className="text-center text-gray-400 py-8 text-sm">
              You have not posted any tutor requests yet.
            </div>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request._id}
                  className="border border-gray-100 bg-white rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {request.classCourse} • {request.city}
                    </p>
                    <p className="text-sm text-gray-500">
                      {request.subjects?.slice(0, 2).join(", ") ||
                        "Subjects TBD"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Posted{" "}
                      {new Date(
                        request.postedAt || request.createdAt
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === "approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {request.status === "approved" ? "Approved" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400 rounded-xl text-white p-6 shadow-lg flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
              Loyalty progress
            </p>
            <h3 className="text-3xl font-bold mt-2">{points} pts</h3>
            <p className="text-sm mt-2 opacity-90">
              Earn 25 pts for every tutor you hire through TuToria plus bonus
              points for approved posts.
            </p>
          </div>
          <div className="mt-6 bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-sm font-semibold">Next reward unlock</p>
            <p className="text-2xl font-bold">
              {Math.max(0, 200 - points)} pts left
            </p>
            <p className="text-xs opacity-80 mt-1">
              Hit 200 pts to unlock premium placement for a tutor request.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDashboard;