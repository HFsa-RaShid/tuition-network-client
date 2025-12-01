import React, { useContext, useMemo } from "react";
import {
  FaSuitcase,
  FaCheckDouble,
  FaWallet,
  FaStar,
  FaBullhorn,
  FaCalendarCheck,
} from "react-icons/fa";
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useAllJobs from "../../../../hooks/useAllJobs";
import usePaidJobs from "../../../../hooks/usePaidJobs";
import useDashboardNotices from "../../../../hooks/useDashboardNotices";
import EmptyState from "../../../../components/EmptyState";

const StatTile = ({ icon, label, value, helper, color }) => (
  <div className="bg-gray-100/90 border border-gray-100 rounded-xl p-5 shadow-lg flex items-center gap-4">
    <span className={`text-blue-500 text-sm p-3 rounded-xl bg-blue-200`}>
      {icon}
    </span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
      {helper && <p className="text-xs text-gray-400 mt-1">{helper}</p>}
    </div>
  </div>
);

const ActivityChart = ({ data }) => {
  const maxValue =
    data.length > 0
      ? Math.max(...data.map((item) => Math.max(item.apps, item.hires)), 1)
      : 1;

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Applications vs Hires
          </h3>
          <p className="text-sm text-gray-500">
            Last {data.length} months snapshot
          </p>
        </div>
        <div className="flex gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
            Applications
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            Confirmed/Hired
          </span>
        </div>
      </div>
      <div className="flex items-end gap-5 h-64 border-t border-gray-300 pt-6">
        {data.map((item) => {
          const appHeight = (item.apps / maxValue) * 100;
          const hireHeight = (item.hires / maxValue) * 100;
          return (
            <div
              key={item.key}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div className="flex items-end gap-2 h-48 w-full justify-center">
                <div
                  className="w-6 rounded-md bg-indigo-300 flex items-end justify-center"
                  style={{ height: `${appHeight}%` }}
                >
                  <span className="text-[11px] text-indigo-700 font-semibold mb-1">
                    {item.apps}
                  </span>
                </div>
                <div
                  className="w-6 rounded-md bg-emerald-400 flex items-end justify-center"
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
          <EmptyState message="Not enough activity captured yet." />
        )}
      </div>
    </div>
  );
};

const NoticePanel = ({ notices, loading }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <FaBullhorn className="text-rose-500" />
      <h3 className="text-lg font-semibold text-gray-800">Notice Board</h3>
    </div>
    <div className="space-y-4 max-h-72 overflow-auto pr-1">
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse h-16 bg-gray-100/90 rounded-xl"
            ></div>
          ))}
        </div>
      )}
      {!loading && (!notices || notices.length === 0) && (
        <EmptyState message="No announcements from admin yet." />
      )}
      {!loading &&
        notices.map((notice) => (
          <div
            key={notice._id}
            className="border border-gray-100 rounded-xl p-4 bg-rose-50"
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
              {new Date(notice.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
    </div>
  </div>
);

const TutorDashboard = () => {
  const { user } = useContext(AuthContext);
  const { currentUser, isLoading: userLoading } = useCurrentUser(user?.email);
  const {
    allJobs = [],
    isLoading: jobsLoading,
    isError: jobsError,
  } = useAllJobs();
  const {
    paidJobs = [],
    isLoading: paidLoading,
    isError: paidError,
  } = usePaidJobs(user?.email);
  const {
    notices = [],
    isLoading: noticeLoading,
    isError: noticeError,
  } = useDashboardNotices();

  const appliedJobs = useMemo(() => {
    if (!currentUser?.email || !Array.isArray(allJobs)) return [];
    return allJobs
      .filter((job) =>
        job?.appliedTutors?.some(
          (tutor) =>
            tutor?.email?.toLowerCase() === currentUser.email.toLowerCase()
        )
      )
      .map((job) => {
        const myApplication = job.appliedTutors.find(
          (tutor) =>
            tutor.email?.toLowerCase() === currentUser.email.toLowerCase()
        );
        return { ...job, myApplication };
      })
      .sort(
        (a, b) =>
          new Date(b.myApplication?.appliedAt || b.createdAt || 0) -
          new Date(a.myApplication?.appliedAt || a.createdAt || 0)
      );
  }, [allJobs, currentUser?.email]);

  const totalApplications = appliedJobs.length;
  const confirmedJobs = appliedJobs.filter(
    (job) => job.myApplication?.confirmationStatus === "confirmed"
  ).length;
  const shortlistedJobs = appliedJobs.filter(
    (job) =>
      job.myApplication?.confirmationStatus &&
      job.myApplication?.confirmationStatus !== "confirmed"
  ).length;
  const totalEarnings = paidJobs.reduce(
    (sum, payment) => sum + (payment.tutorAmount || payment.amount || 0),
    0
  );
  const loyaltyPoints = confirmedJobs * 40 + totalApplications * 10;

  const chartData = useMemo(() => {
    const months = Array.from({ length: 6 }).map((_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index));
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      return {
        key,
        label: date.toLocaleString("en-US", { month: "short" }),
        apps: 0,
        hires: 0,
      };
    });

    const monthMap = months.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    }, {});

    appliedJobs.forEach((job) => {
      const appliedAt = job.myApplication?.appliedAt || job.createdAt;
      if (!appliedAt) return;
      const date = new Date(appliedAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (monthMap[key]) {
        monthMap[key].apps += 1;
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
  }, [appliedJobs, paidJobs]);

  const latestApplications = appliedJobs.slice(0, 4);

  const loading = userLoading || jobsLoading || paidLoading || noticeLoading;
  const errored = jobsError || paidError || noticeError;

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
        Unable to load tutor insights. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="ml-10 lg:px-0 pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 pt-2">
          Hi {currentUser?.name?.split(" ")[0] || "Tutor"}, keep inspiring! ✨
        </h2>
        <p className="text-gray-500 text-sm">
          Monitor your applications, confirmations, and earnings in one place.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <StatTile
          icon={<FaSuitcase />}
          label="Total Applications"
          value={totalApplications}
          helper={`${shortlistedJobs} shortlisted`}
          color="bg-indigo-500"
        />
        <StatTile
          icon={<FaCheckDouble />}
          label="Confirmed Jobs"
          value={confirmedJobs}
          helper="Admins or parents confirmed you"
          color="bg-emerald-500"
        />
        <StatTile
          icon={<FaWallet />}
          label="Total Earnings"
          value={`${totalEarnings.toLocaleString("en-US")} BDT`}
          helper={`${paidJobs.length} paid engagements`}
          color="bg-orange-500"
        />
        <StatTile
          icon={<FaStar />}
          label="Loyalty Points"
          value={loyaltyPoints}
          helper="40 pts per confirmed job"
          color="bg-purple-500"
        />
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-gray-100/90 rounded-xl border border-gray-100 p-6 shadow-lg">
          <ActivityChart data={chartData} />
        </div>
        <div className="bg-gray-100/90 rounded-xl border border-gray-100 p-6 shadow-lg">
          <NoticePanel notices={notices.slice(0, 6)} loading={noticeLoading} />
        </div>
      </div>

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <div className="bg-gray-100/90 rounded-xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Active Opportunities
              </h3>
              <p className="text-sm text-gray-500">
                Requests where you are still in the race
              </p>
            </div>
          </div>
          {latestApplications.length === 0 ? (
            <EmptyState message="You haven't applied to any tuitions yet." />
          ) : (
            <div className="space-y-4">
              {latestApplications.map((job) => (
                <div
                  key={job._id}
                  className="border bg-white border-gray-200 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {job.classCourse} • {job.city}
                    </p>
                    <p className="text-sm text-gray-500">
                      {job.subjects?.slice(0, 2).join(", ") || "Subjects TBD"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Applied{" "}
                      {job.myApplication?.appliedAt
                        ? new Date(
                            job.myApplication.appliedAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.myApplication?.confirmationStatus === "confirmed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    {job.myApplication?.confirmationStatus
                      ? job.myApplication.confirmationStatus
                      : "Under Review"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400 rounded-xl text-white p-6 shadow-lg flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
              Weekly focus
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {Math.max(0, 5 - confirmedJobs)} more confirmations
            </h3>
            <p className="text-sm mt-2 opacity-90">
              Reach 5 confirmed jobs this week to unlock a profile highlight on
              the landing page.
            </p>
          </div>
          <div className="mt-6 bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-sm font-semibold">Upcoming trial classes</p>
            <p className="text-2xl font-bold">{paidJobs.length} scheduled</p>
            <p className="text-xs opacity-80 mt-1">
              Keep your calendar updated to avoid clashes and maintain your
              response score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
