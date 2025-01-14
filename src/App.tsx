import React, { useState, useEffect } from 'react';
    import { TabNavigation } from './components/TabNavigation';
    import { DomainGrid } from './components/DomainGrid';
    import { WeeklySchedule } from './components/WeeklySchedule';
    import { CombinedView } from './components/CombinedView';
    import { useTodos } from './hooks/useTodos';
    import { useWeekSelection } from './hooks/useWeekSelection';
    import { ActivityContext } from './context/ActivityContext';
    import { Evaluation } from './components/Evaluation';
    import { Financial } from './components/Financial';
    import { Writings } from './components/Writings';

    function createStars() {
      const stars = [];
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2;
        const style = {
          top: `${y}vh`,
          left: `${x}vw`,
          width: `${size}px`,
          height: `${size}px`,
        };
        stars.push(<div key={i} className="star" style={style} />);
      }
      return stars;
    }

    export default function App() {
      const [activeTab, setActiveTab] = useState<'domains' | 'weekly' | 'evaluation' | 'financial' | 'writings'>('weekly'); // Set initial tab to 'weekly'
      const { 
        todos: activities, 
        addTodo: addActivity, 
        toggleTodo: toggleActivity,
        deleteTodo: deleteActivity,
        updateTodo: updateActivity 
      } = useTodos();

      // Use shared week selection state
      const weekSelection = useWeekSelection();

      const handleAddActivity = (activity: any) => {
        addActivity({
          ...activity,
          weekNumber: weekSelection.weekNumber,
          year: weekSelection.year
        });
      };

      useEffect(() => {
        // Set initial tab to 'weekly'
        setActiveTab('weekly');
      }, []);

      return (
        <ActivityContext.Provider value={{ activities, addActivity, toggleActivity, deleteActivity, updateActivity }}>
          <div className="min-h-screen bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-gray-100 relative">
            <div className="starfield">
              {createStars()}
            </div>
            <div className="container mx-auto px-4 py-4"> {/* Reduced top padding here */}
              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
              {activeTab === 'domains' && (
                <DomainGrid
                  activities={activities}
                  onAddActivity={handleAddActivity}
                  onEditActivity={updateActivity}
                  onDeleteActivity={deleteActivity}
                  weekSelection={weekSelection}
                />
              )}
              {activeTab === 'weekly' && (
                <WeeklySchedule
                  activities={activities}
                  onToggleReminder={(activityId, dayIndex) => {
                    const activity = activities.find(a => a.id === activityId);
                    if (activity) {
                      const days = activity.reminder?.days || [];
                      updateActivity(activityId, { 
                        reminder: { 
                          ...activity.reminder,
                          days: days.includes(dayIndex) 
                            ? days.filter(d => d !== dayIndex)
                            : [...days, dayIndex]
                        } 
                      });
                    }
                  }}
                  onEditActivity={updateActivity}
                  onDeleteActivity={deleteActivity}
                  weekSelection={weekSelection}
                />
              )}
              {activeTab === 'evaluation' && (
                <Evaluation activities={activities} />
              )}
              {activeTab === 'financial' && (
                <Financial />
              )}
              {activeTab === 'writings' && (
                <Writings />
              )}
            </div>
          </div>
        </ActivityContext.Provider>
      );
    }
