'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiUsers, FiTrendingUp, FiAward, FiSearch } from 'react-icons/fi';

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "TP.HCM",
      type: "Full-time",
      description: "Phát triển giao diện người dùng cho các ứng dụng web với React và Next.js"
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "TP.HCM",
      type: "Full-time",
      description: "Xây dựng và tối ưu hóa các API và cơ sở dữ liệu"
    },
    {
      id: 3,
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "TP.HCM",
      type: "Full-time",
      description: "Lên kế hoạch và thực hiện các chiến dịch marketing số"
    },
    {
      id: 4,
      title: "Customer Support",
      department: "Support",
      location: "TP.HCM",
      type: "Full-time",
      description: "Hỗ trợ khách hàng qua điện thoại và email"
    }
  ];

  const filteredJobs = jobPositions.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Cơ hội nghề nghiệp tại TechStore
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Hãy tham gia cùng chúng tôi để xây dựng tương lai công nghệ Việt Nam
            </motion.p>
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Văn hóa công ty</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tại TechStore, chúng tôi xây dựng môi trường làm việc năng động, 
            sáng tạo và thân thiện, nơi mỗi thành viên đều có cơ hội phát triển 
            và đóng góp vào sự phát triển chung của công ty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <FiUsers className="w-8 h-8" />,
              title: "Teamwork",
              description: "Làm việc nhóm hiệu quả, chia sẻ kiến thức"
            },
            {
              icon: <FiTrendingUp className="w-8 h-8" />,
              title: "Phát triển",
              description: "Cơ hội học hỏi và thăng tiến"
            },
            {
              icon: <FiAward className="w-8 h-8" />,
              title: "Đãi ngộ tốt",
              description: "Chế độ lương thưởng và phúc lợi hấp dẫn"
            },
            {
              icon: <FiBriefcase className="w-8 h-8" />,
              title: "Work-Life Balance",
              description: "Cân bằng công việc và cuộc sống"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Job Listings */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Vị trí đang tuyển dụng
          </h2>

          <div className="mb-8">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm vị trí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <FiBriefcase className="mr-2" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <FiUsers className="mr-2" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <FiTrendingUp className="mr-2" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Ứng tuyển ngay
                  </button>
                </div>
                <p className="mt-4 text-gray-600">
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 