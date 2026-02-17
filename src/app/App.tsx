import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './screens/Dashboard';
import BreathingGuide from './screens/BreathingGuide';
import Journal from './screens/Journal';
import AnxietyTracker from './screens/AnxietyTracker';
import Resources from './screens/Resources';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood: 'calm' | 'anxious' | 'stressed' | 'peaceful' | 'neutral';
  timestamp: number;
}

export interface AnxietyLog {
  id: string;
  date: string;
  level: number; // 1-10 scale
  timestamp: number;
}

function App() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [anxietyLogs, setAnxietyLogs] = useState<AnxietyLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch journal entries
      const journalResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-83d701ee/journal`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (journalResponse.ok) {
        const journalData = await journalResponse.json();
        setJournalEntries(journalData);
      }

      // Fetch anxiety logs
      const anxietyResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-83d701ee/anxiety`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (anxietyResponse.ok) {
        const anxietyData = await anxietyResponse.json();
        setAnxietyLogs(anxietyData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addJournalEntry = async (entry: Omit<JournalEntry, 'id'>) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-83d701ee/journal`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entry)
        }
      );

      if (response.ok) {
        const newEntry = await response.json();
        setJournalEntries(prev => [newEntry, ...prev]);
      }
    } catch (error) {
      console.error('Error adding journal entry:', error);
    }
  };

  const addAnxietyLog = async (log: Omit<AnxietyLog, 'id'>) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-83d701ee/anxiety`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(log)
        }
      );

      if (response.ok) {
        const newLog = await response.json();
        setAnxietyLogs(prev => [newLog, ...prev]);
      }
    } catch (error) {
      console.error('Error adding anxiety log:', error);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: '#F0F4F8' }}>
        <div className="mx-auto max-w-[1200px] min-h-screen">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  journalEntries={journalEntries}
                  anxietyLogs={anxietyLogs}
                  loading={loading}
                />
              } 
            />
            <Route path="/breathing" element={<BreathingGuide />} />
            <Route 
              path="/journal" 
              element={
                <Journal 
                  entries={journalEntries}
                  addEntry={addJournalEntry}
                />
              } 
            />
            <Route 
              path="/tracker" 
              element={
                <AnxietyTracker 
                  logs={anxietyLogs}
                  addLog={addAnxietyLog}
                />
              } 
            />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
