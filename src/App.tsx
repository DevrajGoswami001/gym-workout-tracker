import { useEffect, useMemo, useState } from 'react';
import { DAY_ORDER, WORKOUT_WEEK, type WorkoutDay } from './data/workouts';
import {
  getCompletedExerciseCount,
  getCurrentStreak,
  getDateKey,
  getTodayRecord,
  isWorkoutComplete,
  loadDatabase,
  normalizeDayKey,
  saveDatabase,
  updateExerciseCompletion,
  type WorkoutDatabase,
} from './lib/storage';

type CompletionState = {
  db: WorkoutDatabase;
  todayKey: string;
  currentDay: WorkoutDay;
};

const formatDateLabel = (date = new Date()) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

const formatWorkoutCompletion = (completed: number, total: number) => {
  if (total === 0) {
    return 0;
  }

  return Math.round((completed / total) * 100);
};

const getNextWorkoutDay = (currentDay: WorkoutDay['day']) => {
  const currentIndex = DAY_ORDER.indexOf(currentDay);
  return DAY_ORDER[(currentIndex + 1) % DAY_ORDER.length];
};

const getEstimatedWorkoutMinutes = (exercises: WorkoutDay['exercises']) =>
  exercises.reduce((total, exercise) => {
    const parsedDuration = Number.parseInt(exercise.duration, 10);
    return Number.isNaN(parsedDuration) ? total : total + parsedDuration;
  }, 0);

const getExerciseProgressPercent = (isCompleted: boolean) => (isCompleted ? 100 : 0);

const getWorkoutMood = (day: WorkoutDay['day']) => {
  if (day === 'Sunday') {
    return 'Recovery mode';
  }

  if (day === 'Thursday') {
    return 'Power session';
  }

  return 'Daily focus';
};

function App() {
  const [state, setState] = useState<CompletionState>(() => {
    const db = loadDatabase();
    const todayKey = getDateKey();
    const currentDayName = normalizeDayKey();
    const currentDay = WORKOUT_WEEK.find((day) => day.day === currentDayName) ?? WORKOUT_WEEK[0];

    return { db, todayKey, currentDay };
  });

  useEffect(() => {
    saveDatabase(state.db);
  }, [state.db]);

  useEffect(() => {
    const syncCurrentDay = () => {
      setState((previous) => {
        const nextTodayKey = getDateKey();
        const nextDayName = normalizeDayKey();
        const nextDay = WORKOUT_WEEK.find((day) => day.day === nextDayName) ?? WORKOUT_WEEK[0];

        if (previous.todayKey === nextTodayKey && previous.currentDay.day === nextDay.day) {
          return previous;
        }

        return {
          ...previous,
          todayKey: nextTodayKey,
          currentDay: nextDay,
        };
      });
    };

    const intervalId = window.setInterval(syncCurrentDay, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const todayRecord = useMemo(() => getTodayRecord(state.db, state.todayKey, state.currentDay), [state.db, state.currentDay, state.todayKey]);
  const completedCount = getCompletedExerciseCount(todayRecord);
  const totalExercises = state.currentDay.exercises.length;
  const progressPercent = formatWorkoutCompletion(completedCount, totalExercises);
  const completed = isWorkoutComplete(todayRecord, totalExercises);
  const streak = getCurrentStreak(state.db);
  const nextWorkoutDay = getNextWorkoutDay(state.currentDay.day);

  const handleComplete = (exerciseId: string) => {
    setState((previous) => ({
      ...previous,
      db: updateExerciseCompletion(previous.db, previous.todayKey, previous.currentDay, exerciseId),
    }));
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <div className="layout-shell">
        <header className="topbar glass-panel">
          <div>
            <div className="eyebrow">Gym Workout Tracker</div>
            <h1>Premium daily workout dashboard</h1>
          </div>
          <div className="topbar-pills">
            <span className="meta-pill">Today: {state.currentDay.day}</span>
            <span className="meta-pill">Streak: {streak} days</span>
            <span className="meta-pill">{completedCount}/{totalExercises} complete</span>
          </div>
        </header>

        <section className="workout-panel glass-panel sticky-focus">
          <div className="focus-grid">
            <div className="focus-copy">
              <div className="section-label">Daily Focus</div>
              <div className="focus-badge-row">
                <span className="focus-badge">{getWorkoutMood(state.currentDay.day)}</span>
                <span className="focus-badge focus-badge-alt">Unlocks: {nextWorkoutDay}</span>
              </div>
              <h2>{state.currentDay.workoutType}</h2>
              <p>
                Only today’s training is visible. Complete exercises in order, keep the streak alive, and the next day
                unlocks automatically.
              </p>
              <div className="progress-track" aria-hidden="true">
                <span className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="focus-meta">
                <span className="meta-pill">Duration: {getEstimatedWorkoutMinutes(state.currentDay.exercises)} min</span>
                <span className="meta-pill">Saved in database</span>
                <span className="meta-pill">Live progress enabled</span>
              </div>
            </div>

            <aside className="progress-ring-shell" aria-label={`Workout progress ${progressPercent}%`}>
              <div className="progress-ring">
                <div className="progress-ring-inner">
                  <strong>{progressPercent}%</strong>
                  <span>complete</span>
                </div>
              </div>
              <div className="ring-caption">
                <strong>{completed ? 'Workout Completed Successfully 🎉' : 'Keep checking off the list.'}</strong>
                <span>{completed ? 'Streak updated and progress saved.' : `${totalExercises - completedCount} exercises remaining.`}</span>
              </div>
            </aside>
          </div>

          {completed ? (
            <div className="completion-banner">
              <strong>Workout Completed Successfully 🎉</strong>
              <span>All exercises are locked in for this day and the streak has been updated.</span>
            </div>
          ) : null}
        </section>

        <section className="exercise-panel glass-panel">
          <div className="exercise-panel-header">
            <div>
              <div className="section-label">Workout Cards</div>
              <h2>Complete exercises one by one</h2>
            </div>
            <div className="progress-text">{progressPercent}% done</div>
          </div>

          <div className="exercise-list">
            {state.currentDay.exercises.map((exercise, index) => {
              const progress = todayRecord.completedExercises[exercise.id];
              const isCompleted = Boolean(progress?.completed);
              const exerciseProgress = getExerciseProgressPercent(isCompleted);

              return (
                <article
                  key={exercise.id}
                  className={`exercise-card ${isCompleted ? 'exercise-card-complete' : ''}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="exercise-card-header">
                    <div className="exercise-card-titleblock">
                      <div className="exercise-title-row">
                        <h3>{exercise.name}</h3>
                        <span className={`difficulty-badge difficulty-${exercise.difficulty.toLowerCase()}`}>{exercise.difficulty}</span>
                      </div>
                      <p>{exercise.muscleGroup}</p>
                    </div>
                    <label className="check-control">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        disabled={isCompleted}
                        onChange={() => handleComplete(exercise.id)}
                      />
                      <span>{isCompleted ? 'Completed' : 'Mark complete'}</span>
                    </label>
                  </div>

                  <div className="exercise-detail-grid">
                    <div>
                      <span>Sets</span>
                      <strong>{exercise.sets}</strong>
                    </div>
                    <div>
                      <span>Reps</span>
                      <strong>{exercise.reps}</strong>
                    </div>
                    <div>
                      <span>Rest timer</span>
                      <strong>{exercise.rest}</strong>
                    </div>
                    <div>
                      <span>Duration</span>
                      <strong>{exercise.duration}</strong>
                    </div>
                  </div>

                  <div className="exercise-progress-shell">
                    <div className="exercise-progress-labels">
                      <span>Progress</span>
                      <strong>{exerciseProgress}%</strong>
                    </div>
                    <div className="exercise-progress">
                      <div className="exercise-progress-bar" style={{ width: isCompleted ? '100%' : '0%' }} />
                    </div>
                  </div>

                  <div className="tips-block">
                    <span className="tips-title">Exercise tips</span>
                    <ul className="tip-list">
                      {exercise.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
