import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoCalendarOutline, IoCartOutline, IoPersonOutline, IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';

interface UserDetailProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
    joinDate: string;
    totalOrders: number;
    phone?: string;
    address?: string;
  };
}

const UserDetailModal: React.FC<UserDetailProps> = ({ isOpen, onClose, userData }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-[90%] max-w-[500px] relative shadow-xl"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <IoClose size={24} className="text-gray-600 dark:text-gray-300" />
            </button>

            <motion.h2
              className="text-center text-2xl font-semibold text-gray-800 dark:text-white mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Thông tin chi tiết
            </motion.h2>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="space-y-3"
            >
              <InfoItem icon={<IoCalendarOutline />} label="Ngày tham gia" value={userData.joinDate} />
              <InfoItem icon={<IoCartOutline />} label="Tổng đơn hàng" value={userData.totalOrders.toString()} />
              <InfoItem icon={<IoPersonOutline />} label="Họ tên" value={userData.name} />
              <InfoItem icon={<IoMailOutline />} label="Email" value={userData.email} />
              {userData.phone && (
                <InfoItem icon={<IoCallOutline />} label="Số điện thoại" value={userData.phone} />
              )}
              {userData.address && (
                <InfoItem icon={<IoLocationOutline />} label="Địa chỉ" value={userData.address} />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <motion.div
    variants={{
      hidden: { x: -20, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    }}
    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:translate-x-2 transition-transform"
  >
    <span className="text-2xl text-blue-500 dark:text-blue-400 mr-4">
      {icon}
    </span>
    <span className="font-medium text-gray-700 dark:text-gray-200">
      {label}
    </span>
    <span className="ml-auto text-gray-600 dark:text-gray-300">
      {value}
    </span>
  </motion.div>
);

export default UserDetailModal; 