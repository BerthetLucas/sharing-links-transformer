import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const MotionSection = ({ children, className, delay }: MotionSectionProps) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: delay ?? 0 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.section>
  );
};
