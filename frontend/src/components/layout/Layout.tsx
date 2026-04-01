import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { LogSessionModal } from '@/components/common/LogSessionModal';
import { QuestionModal } from '@/components/common/QuestionModal';
import { useUIStore } from '@/store/uiStore';

// Page imports
import { Dashboard }      from '@/pages/Dashboard';
import { TodaySession }   from '@/pages/TodaySession';
import { DSAPractice }    from '@/pages/DSAPractice';
import { CSFundamentals, SystemDesign, JavaSpring, ReactNext, NodeExpress, Behavioral } from '@/pages/QuestionPages';
import { RevisionQueue, MockInterviews, CompanyPrep, ModuleTracker } from '@/pages/ExtraPages';
import { HourLogger }     from '@/pages/HourLogger';
import { StudyPlan }      from '@/pages/StudyPlan';
import { AIMLPage, CloudDevOps, Settings } from '@/pages/SpecialPages';

const PAGE_MAP: Record<string, React.ReactNode> = {
  dashboard:   <Dashboard />,
  session:     <TodaySession />,
  dsa:         <DSAPractice />,
  csq:         <CSFundamentals />,
  sdq:         <SystemDesign />,
  javaq:       <JavaSpring />,
  reactq:      <ReactNext />,
  nodeq:       <NodeExpress />,
  behq:        <Behavioral />,
  mockq:       <MockInterviews />,
  company:     <CompanyPrep />,
  logger:      <HourLogger />,
  revision:    <RevisionQueue />,
  modules:     <ModuleTracker />,
  study:       <StudyPlan />,
  aiml:        <AIMLPage />,
  clouddevops: <CloudDevOps />,
  settings:    <Settings />,
};

export const Layout: React.FC = () => {
  const { activeTab } = useUIStore();

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
    }}>
      <Sidebar />

      {/* Main area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
      }}>
        <Topbar />

        {/* Content */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '1.25rem 1.5rem',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--edge) transparent',
        }}>
          <div className="animate-fade-in" key={activeTab}>
            {PAGE_MAP[activeTab] ?? <Dashboard />}
          </div>
        </main>
      </div>

      {/* Modals */}
      <LogSessionModal />
      <QuestionModal />
    </div>
  );
};
