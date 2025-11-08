"use client";
import styles from "@/components/MessagePanel.module.css";
import { useCallback } from "react";
import SettingsPanel from "./SettingsPanel";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import DraggableContainer from "./DraggableContainer";
const MessagePanel = () => {
  const selectedNodeId = useSelector(
    (state: RootState) => state.workflow.selectedNodeId,
  );
  return selectedNodeId === null ? (
    <DraggableContainer>
        <div className={styles.messageBox}>
          <p>___</p>
          <p>___</p>
          <p>__&nbsp;</p>
        </div>
        <div className={styles.messageText}>Message</div>
     </DraggableContainer>
  ) : (
    <SettingsPanel />
  );
};

export default MessagePanel;
