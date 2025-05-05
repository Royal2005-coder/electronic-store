'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShoppingBag } from 'react-icons/fi';
import styles from './UserDetailModal.module.css';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    joinDate: string;
    totalOrders: number;
  };
}

export default function UserDetailModal({ isOpen, onClose, userData }: UserDetailModalProps) {
  if (!isOpen) return null;

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.1 } },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            variants={contentVariants}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FiX />
            </button>

            <h2 className={styles.title}>Thông tin chi tiết</h2>

            <div className={styles.statsContainer}>
              <motion.div
                className={styles.statItem}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.statLabel}>
                  <FiCalendar className="inline-block mr-1" />
                  Ngày tham gia
                </div>
                <div className={styles.statValue}>{userData.joinDate}</div>
              </motion.div>
              
              <motion.div
                className={styles.statItem}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.statLabel}>
                  <FiShoppingBag className="inline-block mr-1" />
                  Tổng đơn hàng
                </div>
                <div className={styles.statValue}>{userData.totalOrders}</div>
              </motion.div>
            </div>

            <motion.div
              className={styles.infoGroup}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.label}>
                <FiUser />
                Họ tên
              </div>
              <div className={styles.value}>{userData.name}</div>
            </motion.div>

            <motion.div
              className={styles.infoGroup}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.label}>
                <FiMail />
                Email
              </div>
              <div className={styles.value}>{userData.email}</div>
            </motion.div>

            <motion.div
              className={styles.infoGroup}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className={styles.label}>
                <FiPhone />
                Số điện thoại
              </div>
              <div className={styles.value}>{userData.phone || 'Chưa cập nhật'}</div>
            </motion.div>

            <motion.div
              className={styles.infoGroup}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className={styles.label}>
                <FiMapPin />
                Địa chỉ
              </div>
              <div className={styles.value}>{userData.address || 'Chưa cập nhật'}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 