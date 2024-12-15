import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload, UploadProps } from "antd";

interface FileUploaderProps extends Omit<UploadProps, "onChange"> {
  onFileSelect: (file: File) => void;
  fileList: any;
  onRemove: any;
  form: any;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  fileList,
  onRemove,
  form,
  ...restProps
}) => {
  const beforeUpload = (file: File) => {
    const isExcel =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";
    if (!isExcel) {
      message.error("请上传excel文件！");
      return false;
    }
    const isLt100M = file.size / 1024 / 1024 < 100;
    if (!isLt100M) {
      message.error("文件大小不能超过100M！");
      return false;
    }
    onFileSelect(file);
    return false; // 阻止默认上传行为
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    // 文件选择后立即显示文件列表，但不执行上传
    if (info.file.status !== "uploading") {
    }
  };

  return (
    <Form form={form}>
      <Form.Item name={"file"}>
        <Upload
          {...restProps}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          fileList={fileList}
          onRemove={onRemove}
          showUploadList={{
            extra: ({ size = 0 }) => (
              <span style={{ color: "#cccccc" }}>
                ({(size / 1024 / 1024).toFixed(2)}MB)
              </span>
            ),
          }}
          progress={{
            strokeColor: {
              "0%": "#108ee9",
              "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent) =>
              percent && `${parseFloat(percent.toFixed(2))}%`,
          }}
        >
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

// 设置默认属性
FileUploader.defaultProps = {
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) =>
      percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

export default FileUploader;
