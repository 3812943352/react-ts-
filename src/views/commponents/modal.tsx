/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-11-27 10:06:01
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-05 15:19:32
 * @FilePath: src/views/commponents/modal.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React, { ReactNode, useRef, useState } from "react";
import { Modal } from "antd";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";

interface CustomModalProps {
  title?: ReactNode; // 可选的标题
  content: ReactNode; // 必须提供的内容
  okText?: string; // 确认按钮文本
  cancelText?: string; // 取消按钮文本
  modalOpen: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void; // 点击确认时的回调
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void; // 点击取消时的回调
  width?: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  content,
  okText = "确定",
  cancelText = "取消",
  modalOpen,
  onOk,
  onCancel,
  width,
}) => {
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const [disabled, setDisabled] = useState(true);

  const draggleRef = useRef<HTMLDivElement>(null);
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } =
      window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  return (
    <>
      <Modal
        width={width || 600}
        title={
          <div
            style={{ width: "100%", cursor: "move" }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {title}
          </div>
        }
        open={modalOpen}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        modalRender={(modal: ReactNode) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event: any, uiData: any) =>
              onStart(event, uiData)
            }
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        {content}
      </Modal>
    </>
  );
};

export default CustomModal;
