import styles from "@/components/Feature.module.css";
import { ReactNode } from "react";
export function Feature(props: { featureIcon: string | ReactNode,title: string; description: string }) {
    return (
        <div className={styles.feature}>
            <div className={styles.featureIcon}>{props.featureIcon}</div>
            <h3 className={styles.featureTitle}>{props.title}</h3>
            <p className={styles.featureDescription}>
                {props.description}
            </p>
        </div>
    );
}