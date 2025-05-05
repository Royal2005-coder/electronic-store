'use client';

import { motion } from 'framer-motion';
import { FiTruck, FiClock, FiDollarSign, FiMap, FiPhone, FiMail } from 'react-icons/fi';

export default function ShippingPolicyPage() {
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
            Chính sách vận chuyển
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            {/* Phương thức vận chuyển */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiTruck className="text-blue-600" />
                Phương thức vận chuyển
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  TechStore cung cấp các phương thức vận chuyển sau:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Giao hàng nhanh (1-2 ngày)</li>
                  <li>Giao hàng tiêu chuẩn (3-5 ngày)</li>
                  <li>Giao hàng tiết kiệm (5-7 ngày)</li>
                </ul>
              </div>
            </div>

            {/* Thời gian giao hàng */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiClock className="text-blue-600" />
                Thời gian giao hàng
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Thời gian giao hàng dự kiến:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nội thành Hồ Chí Minh: 1-2 ngày</li>
                  <li>Các tỉnh thành miền Nam: 2-3 ngày</li>
                  <li>Các tỉnh thành miền Trung và miền Bắc: 3-5 ngày</li>
                </ul>
                <p className="text-sm italic">
                  * Lưu ý: Thời gian giao hàng có thể thay đổi tùy thuộc vào điều kiện thời tiết và các yếu tố khách quan khác.
                </p>
              </div>
            </div>

            {/* Phí vận chuyển */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiDollarSign className="text-blue-600" />
                Phí vận chuyển
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Phí vận chuyển được tính dựa trên:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Khoảng cách vận chuyển</li>
                  <li>Khối lượng và kích thước sản phẩm</li>
                  <li>Phương thức vận chuyển được chọn</li>
                </ul>
                <p className="font-medium text-green-600 dark:text-green-400">
                  Miễn phí vận chuyển cho đơn hàng từ 2.000.000₫
                </p>
              </div>
            </div>

            {/* Khu vực giao hàng */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiMap className="text-blue-600" />
                Khu vực giao hàng
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  TechStore giao hàng trên toàn quốc, bao gồm:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Tất cả 63 tỉnh thành</li>
                  <li>Các huyện đảo: Phú Quốc, Côn Đảo, Lý Sơn,...</li>
                </ul>
                <p className="text-sm italic">
                  * Đối với các khu vực hải đảo và vùng sâu vùng xa, thời gian giao hàng có thể kéo dài hơn dự kiến.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Cần hỗ trợ thêm?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nếu bạn có bất kỳ thắc mắc nào về việc vận chuyển, vui lòng liên hệ với chúng tôi:
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