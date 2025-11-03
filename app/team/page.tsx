"use client";

import { useState } from "react";
import {
  FiMail,
  FiMoreVertical,
  FiPlus,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { dummyMembers, initialBoardData } from "../data/data";

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = dummyMembers.filter((member) =>
    member.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMemberTaskCount = (userId: number) => {
    return Object.values(initialBoardData.tasks).filter((task) =>
      task.assignees?.includes(userId)
    ).length;
  };

  const getMemberCompletedTasks = (userId: number) => {
    const memberTasks = Object.values(initialBoardData.tasks).filter((task) =>
      task.assignees?.includes(userId)
    );

    return memberTasks.filter((task) =>
      initialBoardData.columns["Done"].taskIds.includes(task.id)
    ).length;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus className="h-4 w-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-600 bg-gray-700/50 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-lg p-3 mr-4">
              <FiUser className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Total Members</p>
              <p className="text-3xl font-bold text-white">
                {dummyMembers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-lg p-3 mr-4">
              <FiUser className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">
                Active Members
              </p>
              <p className="text-3xl font-bold text-white">
                {dummyMembers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-lg p-3 mr-4">
              <FiUser className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">
                Avg Tasks/Member
              </p>
              <p className="text-3xl font-bold text-white">
                {Math.round(
                  Object.values(initialBoardData.tasks).length /
                    dummyMembers.length
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const taskCount = getMemberTaskCount(member.user_id);
          const completedTasks = getMemberCompletedTasks(member.user_id);
          const completionRate =
            taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0;

          return (
            <div
              key={member.id}
              className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {member.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {member.full_name}
                    </h3>
                    <p className="text-sm text-gray-500">Team Member</p>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Active Tasks</span>
                  <span className="text-sm font-semibold text-white">
                    {taskCount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Completed</span>
                  <span className="text-sm font-semibold text-white">
                    {completedTasks}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Completion Rate</span>
                  <span className="text-sm font-semibold text-white">
                    {completionRate}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors">
                  <FiMail className="h-4 w-4" />
                  <span className="text-sm font-medium">Message</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <FiUser className="h-4 w-4" />
                  <span className="text-sm font-medium">Profile</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-700 p-12 text-center">
          <div className="text-gray-400 mb-4">
            <FiSearch className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No team members found
          </h3>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
