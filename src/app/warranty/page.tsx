'use client';

import { motion } from 'framer-motion';
import { FiShield, FiClock, FiCheckCircle, FiAlertTriangle, FiHelpCircle, FiFileText } from 'react-icons/fi';

export default function WarrantyPage() {
  const warrantyPolicies = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Thời gian bảo hành",
      description: "Sản phẩm được bảo hành chính hãng từ 12 đến 24 tháng tùy theo loại sản phẩm"
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Thời gian xử lý",
      description: "Cam kết xử lý bảo hành trong vòng 7-15 ngày làm việc"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Điều kiện bảo hành",
      description: "Sản phẩm còn trong thời hạn bảo hành và tem/serial number nguyên vẹn"
    },
    {
      icon: <FiAlertTriangle className="w-6 h-6" />,
      title: "Không được bảo hành",
      description: "Sản phẩm bị hư hỏng do thiên tai, tai nạn hoặc sử dụng sai cách"
    }
  ];

  const warrantySteps = [
    {
      step: 1,
      title: "Kiểm tra điều kiện",
      description: "Kiểm tra thời hạn và điều kiện bảo hành của sản phẩm"
    },
    {
      step: 2,
      title: "Liên hệ hỗ trợ",
      description: "Gọi hotline hoặc đến trực tiếp cửa hàng TechStore gần nhất"
    },
    {
      step: 3,
      title: "Gửi sản phẩm",
      description: "Mang sản phẩm đến trung tâm bảo hành hoặc gửi qua đường bưu điện"
    },
    {
      step: 4,
      title: "Theo dõi tiến độ",
      description: "Kiểm tra tiến độ bảo hành qua website hoặc tổng đài"
    },
    {
      step: 5,
      title: "Nhận sản phẩm",
      description: "Nhận lại sản phẩm đã được sửa chữa và kiểm tra kỹ lưỡng"
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
              Chính sách bảo hành
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Cam kết bảo hành chuyên nghiệp, nhanh chóng và tin cậy
            </motion.p>
          </div>
        </div>
      </div>

      {/* Warranty Policies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Điều khoản bảo hành
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TechStore cam kết mang đến dịch vụ bảo hành tốt nhất cho khách hàng với 
            quy trình chuyên nghiệp và minh bạch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {warrantyPolicies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <div className="text-blue-600">{policy.icon}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600">{policy.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Warranty Process */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Quy trình bảo hành
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 rounded"></div>
            <div className="space-y-12">
              {warrantySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg z-10">
                    {step.step}
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-lg text-gray-600">
              Những thắc mắc phổ biến về chính sách bảo hành
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Làm thế nào để kiểm tra thời hạn bảo hành?",
                answer: "Bạn có thể kiểm tra thời hạn bảo hành bằng cách nhập serial number trên website hoặc liên hệ trực tiếp với cửa hàng."
              },
              {
                question: "Tôi có thể bảo hành ở đâu?",
                answer: "Bạn có thể mang sản phẩm đến bất kỳ cửa hàng TechStore nào hoặc các trung tâm bảo hành ủy quyền của chúng tôi."
              },
              {
                question: "Chi phí bảo hành như thế nào?",
                answer: "Trong thời hạn bảo hành, các lỗi do nhà sản xuất sẽ được sửa chữa miễn phí. Các trường hợp khác sẽ được báo giá cụ thể."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <FiHelpCircle className="w-5 h-5 text-blue-600 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 