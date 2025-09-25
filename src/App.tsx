import React from "react";

interface Job {
  id: string;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
}

const jobs: Job[] = [
  { id: "1", company: "Google", role: "SWE", status: "Applied" },
  { id: "2", company: "Meta", role: "Frontend Dev", status: "Interview" },
  { id: "3", company: "Netflix", role: "Backend Eng", status: "Offer" },
  { id: "4", company: "Amazon", role: "Intern", status: "Rejected" },
];

const statuses: Job["status"][] = ["Applied", "Interview", "Offer", "Rejected"];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Tracker</h1>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded font-medium hover:bg-gray-200">
          + Add Job
        </button>
      </nav>

      {/* Kanban Board */}
      <div className="p-6 flex gap-6 overflow-x-auto">
        {statuses.map((status) => (
          <div key={status} className="w-1/4 min-w-[250px] bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">{status}</h2>
            <div className="space-y-3">
              {jobs
                .filter((job) => job.status === status)
                .map((job) => (
                  <div
                    key={job.id}
                    className="bg-gray-50 border rounded-lg p-3 shadow-sm"
                  >
                    <h3 className="font-medium">{job.company}</h3>
                    <p className="text-sm text-gray-600">{job.role}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
