import React from "react";
import styles from "./GlassCard.module.css"

export default function GlassCard(widgetChild:JSX.Element) {
    return (
        <div className={styles.glassCard}>
            <React.Fragment>
                <center>
                    {widgetChild}
                </center>
            </React.Fragment>
        </div>
    );
}