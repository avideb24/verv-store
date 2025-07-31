import { Spin } from "antd";

export default function LoadingSpinner() {

  return (
    <div className="flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
} 