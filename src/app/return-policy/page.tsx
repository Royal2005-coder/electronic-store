'use client';

import { motion } from 'framer-motion';
import { FiRefreshCw, FiClock, FiPackage, FiAlertCircle, FiPhone, FiMail } from 'react-icons/fi';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Chính sách đổi trả
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Điều kiện đổi trả */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiRefreshCw className="text-blue-600" />
                Điều kiện đổi trả
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  TechStore cam kết đổi trả sản phẩm trong các trường hợp sau:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sản phẩm còn nguyên vẹn, không có dấu hiệu đã qua sử dụng</li>
                  <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất</li>
                  <li>Sản phẩm không đúng mẫu mã, màu sắc như đã đặt hàng</li>
                  <li>Sản phẩm không đúng với mô tả trên website</li>
                </ul>
              </div>
            </div>

            {/* Thời hạn đổi trả */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiClock className="text-blue-600" />
                Thời hạn đổi trả
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Đổi trả miễn phí trong vòng 7 ngày kể từ ngày nhận hàng</li>
                  <li>Bảo hành theo chính sách của nhà sản xuất</li>
                  <li>Đối với sản phẩm lỗi kỹ thuật: đổi mới trong 30 ngày đầu tiên</li>
                </ul>
                <p className="text-sm italic">
                  * Thời hạn có thể thay đổi tùy theo chương trình khuyến mãi
                </p>
              </div>
            </div>

            {/* Quy trình đổi trả */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiPackage className="text-blue-600" />
                Quy trình đổi trả
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Liên hệ với bộ phận CSKH qua hotline 1900 1234</li>
                  <li>Cung cấp mã đơn hàng và lý do đổi trả</li>
                  <li>Nhận mã đổi trả và hướng dẫn đóng gói</li>
                  <li>Gửi sản phẩm về địa chỉ được cung cấp</li>
                  <li>Nhận sản phẩm mới hoặc hoàn tiền trong vòng 3-5 ngày làm việc</li>
                </ol>
              </div>
            </div>

            {/* Các trường hợp không áp dụng */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiAlertCircle className="text-blue-600" />
                Các trường hợp không áp dụng đổi trả
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sản phẩm đã qua sử dụng, có dấu hiệu trầy xước, hư hỏng</li>
                  <li>Sản phẩm không còn đầy đủ phụ kiện, tem nhãn, bao bì</li>
                  <li>Sản phẩm trong chương trình khuyến mãi đặc biệt</li>
                  <li>Quá thời hạn đổi trả quy định</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Cần hỗ trợ đổi trả?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Liên hệ ngay với chúng tôi để được hướng dẫn chi tiết:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:19001234"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPhone />
                1900 1234
              </a>
              <a
                href="mailto:support@techstore.vn"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FiMail />
                support@techstore.vn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 