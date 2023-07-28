import React from 'react';

interface ErrorProps {
  text: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ text }) => {
  return <p className="text-error">{text}</p>;
};

export default ErrorMessage;
