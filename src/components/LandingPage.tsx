"use client";

import Link from "next/link";
import styles from "./LandingPage.module.css";
import { Feature } from "./Feature";
import { Target, Zap, Link as Clip } from "lucide-react";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Workflow</div>
        <nav className={styles.nav}>
          <Link href="/workflows" className={styles.navLink}>
            Workflows
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Build Intelligent Conversational Workflows
          </h1>
          <p className={styles.heroDescription}>
            Create, design, and deploy AI-powered chatbot flows with our intuitive drag-and-drop interface.
            Connect nodes, define responses, and bring your conversational experiences to life.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/workflows" className={styles.primaryButton}>
              Get Started
            </Link>
            <Link href="/workspace" className={styles.secondaryButton}>
              Try Demo
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <Feature 
            featureIcon={"🎯"}
            title="Intuitive Design"
            description="Drag and drop components to build complex Voice conversation flows with ease."
          />

          <Feature 
            featureIcon={"⚡"}
            title="Real-time Preview"
            description="See your changes instantly as you build and refine your workflows."
          />
          <Feature 
            featureIcon={"🔗"}
            title="Smart Connections"
            description="Connect nodes seamlessly to create dynamic conversation paths."
          />
        </section>
      </main>
    </div>
  );
}
