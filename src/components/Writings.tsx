import React, { useState, useEffect } from 'react';
    import { Calendar, Edit, BookOpen, CheckSquare, Sparkles } from 'lucide-react';
    import { useWeekSelection } from '../hooks/useWeekSelection';
    import { formatDate, getCurrentWeekDates, getWeekNumber, getDateOfWeek, getTotalWeeks } from '../utils/dateUtils';
    import { DAYS } from '../constants/days';
    import { makeLinksClickable } from '../utils/linkUtils';

    export function Writings() {
      const { selectedDate, weekNumber, year, changeWeek } = useWeekSelection();
      const [selectedDay, setSelectedDay] = useState<number>(selectedDate.getDay());
      const [positiveNotes, setPositiveNotes] = useState<string[]>(() => {
        const savedNotes = localStorage.getItem(`positiveNotes-${selectedDate.toISOString().split('T')[0]}`);
        return savedNotes ? JSON.parse(savedNotes) : ['', '', '', '', ''];
      });
      const [freeWriting, setFreeWriting] = useState<string>(() => {
        return localStorage.getItem(`freeWriting-${selectedDate.toISOString().split('T')[0]}`) || '';
      });
      const [decisions, setDecisions] = useState<string>(() => {
        return localStorage.getItem(`decisions-${selectedDate.toISOString().split('T')[0]}`) || '';
      });
      const weekDates = getCurrentWeekDates(selectedDate);
      const currentDay = DAYS[selectedDay];
      const currentDate = formatDate(weekDates[selectedDay]);

      useEffect(() => {
        const savedNotes = localStorage.getItem(`positiveNotes-${weekDates[selectedDay].toISOString().split('T')[0]}`);
        setPositiveNotes(savedNotes ? JSON.parse(savedNotes) : ['', '', '', '', '']);
        setFreeWriting(localStorage.getItem(`freeWriting-${weekDates[selectedDay].toISOString().split('T')[0]}`) || '');
        setDecisions(localStorage.getItem(`decisions-${weekDates[selectedDay].toISOString().split('T')[0]}`) || '');
      }, [selectedDay, weekNumber, year]);

      useEffect(() => {
        localStorage.setItem(`positiveNotes-${weekDates[selectedDay].toISOString().split('T')[0]}`, JSON.stringify(positiveNotes));
      }, [positiveNotes, selectedDay, weekNumber, year]);

      useEffect(() => {
        localStorage.setItem(`freeWriting-${weekDates[selectedDay].toISOString().split('T')[0]}`, freeWriting);
      }, [freeWriting, selectedDay, weekNumber, year]);

      useEffect(() => {
        localStorage.setItem(`decisions-${weekDates[selectedDay].toISOString().split('T')[0]}`, decisions);
      }, [decisions, selectedDay, weekNumber, year]);

      const handlePositiveNoteChange = (index: number, value: string) => {
        const newNotes = [...positiveNotes];
        newNotes[index] = value;
        setPositiveNotes(newNotes);
      };

      const handleFreeWritingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFreeWriting(e.target.value);
      };

      const handleDecisionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDecisions(e.target.value);
      };

      const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDay(parseInt(e.target.value));
      };

      const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeWeek(parseInt(e.target.value), year);
      };

      const currentYear = new Date().getFullYear();
      const totalWeeks = getTotalWeeks(currentYear);

      return (
        <div className="p-4 md:p-6 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 rounded-lg shadow-lg text-white space-y-6" dir="rtl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 md:mb-0 animate-fade-in">
              <BookOpen size={32} />
              صفحة المدوّنات
            </h2>
            <div className="text-xl font-medium flex flex-col md:flex-row items-center gap-2 animate-fade-in">
              <Calendar size={20} className="inline-block align-middle ml-1" />
              <div className="relative">
                <select
                  value={weekNumber}
                  onChange={handleWeekChange}
                  className="bg-black/20 text-white rounded-lg px-2 py-1 border border-white/10 focus:border-white focus:ring-1 focus:ring-white text-sm md:text-base appearance-none pr-8"
                >
                  {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => (
                    <option key={week} value={week}>الأسبوع {week}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
              <div className="relative mt-2 md:mt-0">
                <select
                  value={selectedDay}
                  onChange={handleDayChange}
                  className="bg-black/20 text-white rounded-lg px-2 py-1 border border-white/10 focus:border-white focus:ring-1 focus:ring-white text-sm md:text-base appearance-none pr-8"
                >
                  {DAYS.map((day, index) => (
                    <option key={index} value={index}>
                      {day} - {formatDate(weekDates[index])}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black/20 p-4 md:p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl font-medium text-amber-400 mb-4 flex items-center gap-2">
              <Sparkles size={24} />
              5 نِعَم اليوم أشكر الله عليها
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {positiveNotes.map((note, index) => (
                <li key={index} className="animate-row-in">
                  <textarea
                    value={note}
                    onChange={(e) => handlePositiveNoteChange(index, e.target.value)}
                    className="w-full p-1 rounded bg-black/20 border border-white/10 text-white text-sm"
                    rows={1}
                    placeholder={`اكتب هنا النقطة ${index + 1}`}
                    dir="rtl"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black/20 p-4 md:p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl font-medium text-amber-400 mb-4 flex items-center gap-2">
              <Edit size={24} />
              الكتابة الحرة
            </h3>
            <textarea
              value={freeWriting}
              onChange={handleFreeWritingChange}
              className="w-full p-2 rounded bg-black/20 border border-white/10 text-white text-sm"
              rows={4}
              placeholder="اكتب هنا أفكارك ومشاعرك"
              dir="rtl"
            />
          </div>
          <div className="bg-black/20 p-4 md:p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl font-medium text-amber-400 mb-4 flex items-center gap-2">
              <CheckSquare size={24} />
              القرارات
            </h3>
            <textarea
              value={decisions}
              onChange={handleDecisionsChange}
              className="w-full p-2 rounded bg-black/20 border border-white/10 text-white text-sm"
              rows={4}
              placeholder="اكتب هنا القرارات التي اتخذتها"
              dir="rtl"
            />
          </div>
        </div>
      );
    }
