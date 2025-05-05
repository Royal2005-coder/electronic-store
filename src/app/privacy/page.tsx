'use client';

import { motion } from 'framer-motion';
import { FiLock, FiShield, FiUserCheck, FiDatabase, FiEye, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';

export default function PrivacyPolicyPage() {
  const privacyPolicies = [
    {
      icon: <FiLock />,
      title: "Bảo mật thông tin",
      description: "Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng bằng các biện pháp bảo mật tiên tiến nhất"
    },
    {
      icon: <FiShield />,
      title: "Quyền lợi khách hàng",
      description: "Khách hàng có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình"
    },
    {
      icon: <FiUserCheck />,
      title: "Sử dụng thông tin",
      description: "Thông tin cá nhân chỉ được sử dụng cho mục đích cung cấp dịch vụ và nâng cao trải nghiệm khách hàng"
    },
    {
      icon: <FiDatabase />,
      title: "Lưu trữ dữ liệu",
      description: "Dữ liệu được lưu trữ an toàn trên các máy chủ được bảo mật và định kỳ sao lưu"
    }
  ];

  const sections = [
    {
      title: "Thu thập thông tin",
      content: [
        "Họ tên, địa chỉ email và số điện thoại khi đăng ký tài khoản",
        "Địa chỉ giao hàng và thông tin thanh toán khi mua sắm",
        "Thông tin thiết bị và trình duyệt khi truy cập website",
        "Lịch sử mua hàng và tương tác với dịch vụ"
      ]
    },
    {
      title: "Mục đích sử dụng",
      content: [
        "Xử lý đơn hàng và giao hàng",
        "Cung cấp hỗ trợ khách hàng",
        "Gửi thông tin về sản phẩm và khuyến mãi",
        "Phân tích và cải thiện dịch vụ"
      ]
    },
    {
      title: "Bảo vệ thông tin",
      content: [
        "Sử dụng công nghệ mã hóa SSL/TLS",
        "Kiểm soát truy cập và phân quyền chặt chẽ",
        "Định kỳ đánh giá và cập nhật biện pháp bảo mật",
        "Đào tạo nhân viên về bảo mật thông tin"
      ]
    },
    {
      title: "Quyền của người dùng",
      content: [
        "Yêu cầu truy cập thông tin cá nhân",
        "Chỉnh sửa hoặc cập nhật thông tin",
        "Yêu cầu xóa thông tin",
        "Từ chối nhận thông tin quảng cáo"
      ]
    }
  ];

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
              Chính sách bảo mật
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Cam kết bảo vệ thông tin và quyền riêng tư của khách hàng
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Privacy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {privacyPolicies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-blue-600 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
                {policy.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {policy.title}
              </h3>
              <p className="text-gray-600">
                {policy.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: itemIndex * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mt-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Liên hệ về vấn đề bảo mật
            </h2>
            <p className="text-gray-600 mb-6">
              Nếu bạn có bất kỳ thắc mắc nào về chính sách bảo mật hoặc cách chúng tôi 
              xử lý thông tin của bạn, vui lòng liên hệ:
            </p>
            <div className="inline-flex items-center justify-center space-x-4">
              <a
                href="mailto:privacy@techstore.vn"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                <FiMail className="mr-2" />
                privacy@techstore.vn
              </a>
              <a
                href="tel:1900123456"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
              >
                <FiPhone className="mr-2" />
                1900 123 456
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 