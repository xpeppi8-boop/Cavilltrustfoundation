import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out forwards;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &.fade-out {
    animation: ${fadeOut} 0.3s ease-out forwards;
  }
  
  &::before {
    content: '✓';
    color: #4CAF50;
    font-weight: bold;
  }
`;

const CopyNotification = ({ show, onClose }) => {
  if (!show) return null;
  
  return (
    <Notification className={!show ? 'fade-out' : ''}>
      Copied to clipboard!
    </Notification>
  );
};

export default CopyNotification;
