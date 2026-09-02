import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Check,
  Triangle,
  BaggageClaim,
} from "lucide-react";
import {
  getAllAnalyticsData,
  getDashboardStatusData,
} from "@/store/admin/analytics-slice";

// دالة مساعدة لجلب تواريخ الشهر الحالي ديناميكياً
const getCurrentMonthDates = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();

  return {
    startDate: `${year}-${month}-01`,
    endDate: `${year}-${month}-${lastDay}`,
  };
};

function AdminDashboard() {
  const dispatch = useDispatch();
  const { analyticsData, statusData, isLoading } = useSelector(
    (state) => state.adminAnalytics,
  );

  // التواريخ الافتراضية للشهر الحالي ديناميكياً
  const [dates, setDates] = useState(getCurrentMonthDates);

  useEffect(() => {
    // جلب البيانات معاً عند تغيير التاريخ
    Promise.all([
      dispatch(getAllAnalyticsData(dates)),
      dispatch(getDashboardStatusData()),
    ]);
  }, [dispatch, dates]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // أيقونات وألوان مخصصة لكل حالة أوردر متوافقة مع الـ Dark Mode الجديد
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          icon: <Clock className="w-5 h-5" />,
          color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        };
      case "inprocess":
        return {
          icon: (
            <RefreshCw
              className="w-5 h-5 animate-spin"
              style={{ animationDuration: "3s" }}
            />
          ),
          color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        };
      case "confirmed":
        return {
          icon: <Check className="w-5 h-5" />,
          color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
        };
      case "delivered":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        };
      case "rejected":
        return {
          icon: <XCircle className="w-5 h-5" />,
          color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        };
      default:
        return {
          icon: <ShoppingBag className="w-5 h-5" />,
          color: "text-slate-400 bg-slate-400/10 border-slate-400/20",
        };
    }
  };

  // الـ Skeleton Loader متوافق مع درجات الـ Dark Theme المظلمة
  if (isLoading) {
    return (
      <div className="p-6 mx-auto space-y-8 animate-pulse">
        <div className="flex justify-between items-center pb-5 border-b border-border">
          <div className="space-y-2 w-1/3">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="h-12 bg-muted rounded-xl w-64"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-muted rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 min-h-screen bg-background text-foreground">
      {/* 1️⃣ الهيدر وفلاتر التحكم في التاريخ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Admin Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor your store sales, costs, and net profits efficiently.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl border border-border bg-card shadow-sm self-start sm:self-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase px-1 text-muted-foreground">
              From
            </span>
            <input
              type="date"
              name="startDate"
              value={dates.startDate}
              onChange={handleDateChange}
              className="text-xs font-semibold p-2 rounded-lg border border-border text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="h-5 w-px bg-border mx-1"></div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase px-1 text-muted-foreground">
              To
            </span>
            <input
              type="date"
              name="endDate"
              value={dates.endDate}
              onChange={handleDateChange}
              className="text-xs font-semibold p-2 rounded-lg border border-border text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* 2️⃣ كروت المؤشرات المالية الأساسية */}
      {analyticsData && (
        <div className="space-y-4 w-full">
          <h2 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
            Financial Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* كارت Revenue */}
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-200 flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </span>
                <h3 className="text-3xl font-bold text-foreground">
                  ${analyticsData.totalRevenue?.toLocaleString()}
                </h3>
                <span className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Gross Sales
                </span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            {/* كارت Cost */}
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-200 flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {" "}
                  Total Product Cost{" "}
                </span>
                <h3 className="text-3xl font-bold text-foreground ">
                  ${analyticsData.totalCost?.toLocaleString()}
                </h3>
                <span className="inline-flex items-center text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  Expenses
                </span>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                <BaggageClaim className="w-6 h-6" />
              </div>
            </div>

            {/* كارت Net Profit */}
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-200 flex items-start justify-between relative overflow-hidden group">
              <div className="space-y-2 z-10">
                <span className="text-sm font-medium text-muted-foreground">
                  {" "}
                  Net Profit{" "}
                </span>
                <h3
                  className={`text-3xl font-bold ${analyticsData.netProfit > 0 ? "text-emerald-500" : "text-rose-500"}`}
                >
                  ${analyticsData.netProfit?.toLocaleString()}
                </h3>
                <span
                  className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${analyticsData.netProfit > 0 ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"}`}
                >
                  {analyticsData.netProfit >= 0 ? "Net Earnings" : "Net Loss"}
                </span>
              </div>
              <div
                className={`p-3 rounded-xl z-10 ${analyticsData.netProfit > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-600"}`}
              >
                <Triangle
                  className={`w-6 h-6 ${analyticsData.netProfit < 0 ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3️⃣ قسم إحصائيات حالات الأوردرات (Order Status) */}
      {statusData && statusData.length > 0 && (
        <div className="space-y-4 pt-4 w-full">
          <h2 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
            Orders Status Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {statusData.map((statusItem, index) => {
              const config = getStatusConfig(statusItem.status);
              return (
                <div
                  key={index}
                  className="bg-card p-5 rounded-xl border border-border shadow-sm hover:border-muted-foreground/30 transition-colors flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-tight">
                      {statusItem.status}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${config.color}`}>
                      {config.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground">
                      ${statusItem.totalSales?.toLocaleString()}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {statusItem.orderCount}{" "}
                      {statusItem.orderCount === 1 ? "Order" : "Orders"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
