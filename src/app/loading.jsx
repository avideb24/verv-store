import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
