import React from "react";

export default function MessageBox({ status }) {
  if (!status?.message) return null;
  const map = {
    loading: "bg-yellow-50 text-yellow-700 border-yellow-200",
    success: "bg-green-50 text-green-700 border-green-100",
    error: "bg-red-50 text-red-700 border-red-100",
  };
  return <div className={`p-4 rounded-xl border ${map[status.type] || ""} text-lg`}>{status.message}</div>;
}
