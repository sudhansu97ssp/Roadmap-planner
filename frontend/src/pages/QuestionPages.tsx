import React from 'react';
import { QuestionPage } from './QuestionPage';
import { CS_QUESTIONS, SD_QUESTIONS, JAVA_QUESTIONS, REACT_QUESTIONS, NODE_QUESTIONS, BEH_QUESTIONS } from '@/data/questions';

export const CSFundamentals: React.FC = () => (
  <QuestionPage
    title="CS FUNDAMENTALS"
    icon="🖥️"
    description="Operating Systems, Networking, DBMS, Computer Architecture — the theory behind every system"
    questions={CS_QUESTIONS}
    accentColor="#9f7aea"
    topics={['OS', 'Networking', 'DBMS']}
  />
);

export const SystemDesign: React.FC = () => (
  <QuestionPage
    title="SYSTEM DESIGN"
    icon="🏗️"
    description="High-Level Design (HLD), Low-Level Design (LLD), scalability patterns, distributed systems"
    questions={SD_QUESTIONS}
    accentColor="#ff6b00"
    topics={['HLD', 'LLD']}
  />
);

export const JavaSpring: React.FC = () => (
  <QuestionPage
    title="JAVA + SPRING"
    icon="☕"
    description="Core Java, JVM internals, concurrency, Spring Boot, microservices patterns"
    questions={JAVA_QUESTIONS}
    accentColor="#ffb800"
    topics={['Java Core', 'Spring Boot', 'Microservices']}
  />
);

export const ReactNext: React.FC = () => (
  <QuestionPage
    title="REACT + NEXT.JS"
    icon="⚛️"
    description="Hooks, performance optimization, state management, Next.js rendering strategies"
    questions={REACT_QUESTIONS}
    accentColor="#00ffd0"
    topics={['React', 'Next.js']}
  />
);

export const NodeExpress: React.FC = () => (
  <QuestionPage
    title="NODE.JS + EXPRESS"
    icon="🟢"
    description="Event loop, streams, middleware patterns, REST API design, security, scaling"
    questions={NODE_QUESTIONS}
    accentColor="#00ff94"
    topics={['Node.js', 'Express']}
  />
);

export const Behavioral: React.FC = () => (
  <QuestionPage
    title="BEHAVIORAL"
    icon="🎭"
    description="STAR method stories, Amazon Leadership Principles, conflict resolution, impact stories"
    questions={BEH_QUESTIONS}
    accentColor="#ff00aa"
    topics={['Leadership', 'Conflict', 'Impact', 'Failure', 'Growth']}
  />
);
