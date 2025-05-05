'use client';

import { motion } from 'framer-motion';
import { FiFileText, FiShield, FiUserCheck, FiAlertTriangle, FiCreditCard, FiTruck } from 'react-icons/fi';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Điều khoản chung",
      content: [
        "Bằng việc sử dụng dịch vụ của TechStore, bạn đồng ý với các điều khoản và điều kiện này",
        "TechStore có quyền thay đổi điều khoản mà không cần thông báo trước",
        "Người dùng có trách nhiệm cập nhật và tuân thủ các điều khoản mới nhất",
        "Mọi tranh chấp sẽ được giải quyết theo quy định của pháp luật Việt Nam"
      ]
    },
    {
      title: "2. Tài khoản người dùng",
      content: [
        "Người dùng phải cung cấp thông tin chính xác khi đăng ký",
        "Bảo mật thông tin đăng nhập và chịu trách nhiệm về mọi hoạt động của tài khoản",
        "Không được chia sẻ tài khoản cho người khác sử dụng",
        "TechStore có quyền khóa tài khoản nếu phát hiện vi phạm"
      ]
    },
    {
      title: "3. Đặt hàng và thanh toán",
      content: [
        "Giá sản phẩm có thể thay đổi mà không cần thông báo trước",
        "Đơn hàng chỉ được xác nhận sau khi thanh toán thành công",
        "Chấp nhận các phương thức thanh toán được liệt kê trên website",
        "Hoàn tiền theo chính sách của TechStore trong trường hợp được chấp nhận"
      ]
    },
    {
      title: "4. Giao hàng",
      content: [
        "Thời gian giao hàng dự kiến được thông báo khi đặt hàng",
        "Phí vận chuyển được tính dựa trên vị trí và khối lượng đơn hàng",
        "Kiểm tra hàng kỹ trước khi nhận",
        "Từ chối nhận hàng nếu phát hiện hư hỏng hoặc không đúng sản phẩm"
      ]
    },
    {
      title: "5. Bảo hành và đổi trả",
      content: [
        "Thời hạn đổi trả trong vòng 7 ngày kể từ ngày nhận hàng",
        "Sản phẩm đổi trả phải còn nguyên vẹn và đầy đủ phụ kiện",
        "Áp dụng chính sách bảo hành theo quy định của nhà sản xuất",
        "Không bảo hành với sản phẩm bị hư hỏng do lỗi người dùng"
      ]
    },
    {
      title: "6. Quyền sở hữu trí tuệ",
      content: [
        "Mọi nội dung trên website thuộc quyền sở hữu của TechStore",
        "Không được sao chép, sử dụng nội dung mà không được phép",
        "Tôn trọng bản quyền và thương hiệu",
        "Vi phạm sẽ bị xử lý theo quy định của pháp luật"
      ]
    }
  ];

  const highlights = [
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: "Điều khoản rõ ràng",
      description: "Các điều khoản được trình bày rõ ràng, minh bạch và dễ hiểu"
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Bảo vệ quyền lợi",
      description: "Đảm bảo quyền lợi của cả khách hàng và doanh nghiệp"
    },
    {
      icon: <FiUserCheck className="w-6 h-6" />,
      title: "Trách nhiệm rõ ràng",
      description: "Quy định rõ trách nhiệm của các bên liên quan"
    },
    {
      icon: <FiAlertTriangle className="w-6 h-6" />,
      title: "Tuân thủ pháp luật",
      description: "Mọi điều khoản đều tuân thủ quy định pháp luật hiện hành"
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
              Điều khoản sử dụng
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Vui lòng đọc kỹ các điều khoản trước khi sử dụng dịch vụ
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-blue-600 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
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

        {/* Agreement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-xl p-8 mt-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Đồng ý với điều khoản
            </h2>
            <p className="text-gray-600 mb-6">
              Bằng việc sử dụng dịch vụ của TechStore, bạn xác nhận đã đọc, 
              hiểu và đồng ý với tất cả các điều khoản và điều kiện trên.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Tôi đồng ý
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 