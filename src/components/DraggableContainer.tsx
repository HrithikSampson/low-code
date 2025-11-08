"use client";
import styles from "@/components/DraggableContainer.module.css";

const DraggableContainer = ({ children }: { children: React.ReactNode }) => {
  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.draggableContainer} draggable onDragOver={onDrag}>
        {children}
      </div>
    </div>
  );
};

export default DraggableContainer;