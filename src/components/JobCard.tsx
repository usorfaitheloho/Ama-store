import React from "react";
import { Job } from "../types/job";

interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: string) => void;
  showActions?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Saved":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Applied":
        return "bg-green-100 text-green-800 border-green-200";
      case "Networking":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Interview":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Offer":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Part-time":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Internship":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Contract":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Hybrid":
        return "bg-green-50 text-green-700 border-green-200";
      case "Remote":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1d ago";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return `${Math.floor(diffInDays / 30)}mo ago`;
  };

  const getCompanyIcon = (company: string) => {
    // Create a simple icon based on company name first letter
    const firstLetter = company.charAt(0).toUpperCase();
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];
    const colorIndex = company.length % colors.length;

    return (
      <div
        className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-sm`}
      >
        {firstLetter}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header with company info and status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getCompanyIcon(job.company)}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {job.company}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                job.status
              )}`}
            >
              {job.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {formatTimeAgo(job.createdAt)}
          </span>
          {showActions && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit?.(job)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                title="Edit job"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete?.(job.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="Delete job"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Job title */}
      <h4 className="font-medium text-gray-900 text-sm mb-3 line-clamp-2 leading-snug">
        {job.role}
      </h4>

      {/* Job details */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {job.type && (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(
              job.type
            )}`}
          >
            {job.type}
          </span>
        )}
        {job.location && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{job.location}</span>
          </div>
        )}
      </div>

      {/* Notes preview */}
      {job.notes && (
        <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 line-clamp-2">
          {job.notes}
        </div>
      )}
    </div>
  );
};

export default JobCard;
