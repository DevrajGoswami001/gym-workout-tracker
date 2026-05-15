import type { WorkoutExercise, WorkoutDay } from '../data/workouts';

export type ExerciseProgress = {
  completed: boolean;
  completedAt: string | null;
};

export type DailyWorkoutRecord = {
  day: WorkoutDay['day'];
  workoutType: string;
  completedExercises: Record<string, ExerciseProgress>;
  completedAt: string | null;
};

export type WorkoutDatabase = {
  days: Record<string, DailyWorkoutRecord>;
};

const STORAGE_KEY = 'gym-workout-tracker-db-v1';

export const getDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const normalizeDayKey = (date = new Date()) => {
  const weekday = date.getDay();
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday] as WorkoutDay['day'];
};

export const createEmptyDatabase = (): WorkoutDatabase => ({
  days: {},
});

export const loadDatabase = (): WorkoutDatabase => {
  if (typeof window === 'undefined') {
    return createEmptyDatabase();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptyDatabase();
    }

    const parsed = JSON.parse(raw) as Partial<WorkoutDatabase>;
    if (!parsed.days || typeof parsed.days !== 'object') {
      return createEmptyDatabase();
    }

    return {
      days: parsed.days,
    };
  } catch {
    return createEmptyDatabase();
  }
};

export const saveDatabase = (database: WorkoutDatabase) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
};

export const getTodayRecord = (
  database: WorkoutDatabase,
  dateKey: string,
  workoutDay: WorkoutDay,
): DailyWorkoutRecord => {
  const existingRecord = database.days[dateKey];
  if (existingRecord) {
    return existingRecord;
  }

  const completedExercises: Record<string, ExerciseProgress> = {};
  for (const exercise of workoutDay.exercises) {
    completedExercises[exercise.id] = {
      completed: false,
      completedAt: null,
    };
  }

  return {
    day: workoutDay.day,
    workoutType: workoutDay.workoutType,
    completedExercises,
    completedAt: null,
  };
};

export const updateExerciseCompletion = (
  database: WorkoutDatabase,
  dateKey: string,
  workoutDay: WorkoutDay,
  exerciseId: WorkoutExercise['id'],
): WorkoutDatabase => {
  const todayRecord = getTodayRecord(database, dateKey, workoutDay);
  const currentProgress = todayRecord.completedExercises[exerciseId];

  if (currentProgress?.completed) {
    return database;
  }

  const nextRecord: DailyWorkoutRecord = {
    ...todayRecord,
    completedExercises: {
      ...todayRecord.completedExercises,
      [exerciseId]: {
        completed: true,
        completedAt: new Date().toISOString(),
      },
    },
  };

  const allCompleted = Object.values(nextRecord.completedExercises).every((progress) => progress.completed);
  if (allCompleted) {
    nextRecord.completedAt = new Date().toISOString();
  }

  return {
    days: {
      ...database.days,
      [dateKey]: nextRecord,
    },
  };
};

export const isWorkoutComplete = (record: DailyWorkoutRecord | undefined, totalExercises: number) =>
  record !== undefined &&
  Object.values(record.completedExercises).filter((progress) => progress.completed).length === totalExercises;

export const getCompletedExerciseCount = (record: DailyWorkoutRecord | undefined) =>
  record ? Object.values(record.completedExercises).filter((progress) => progress.completed).length : 0;

export const getCurrentStreak = (database: WorkoutDatabase, today = new Date()) => {
  const cursor = new Date(today);
  cursor.setHours(0, 0, 0, 0);
  const earliestDate = new Date(2024, 0, 1);

  while (cursor >= earliestDate) {
    const latestCompletedKey = getDateKey(cursor);
    const latestCompletedRecord = database.days[latestCompletedKey];

    if (latestCompletedRecord && Object.values(latestCompletedRecord.completedExercises).every((progress) => progress.completed)) {
      let streak = 0;
      const streakCursor = new Date(cursor);

      while (streakCursor >= earliestDate) {
        const streakKey = getDateKey(streakCursor);
        const streakRecord = database.days[streakKey];
        const streakComplete = streakRecord && Object.values(streakRecord.completedExercises).every((progress) => progress.completed);

        if (!streakComplete) {
          break;
        }

        streak += 1;
        streakCursor.setDate(streakCursor.getDate() - 1);
      }

      return streak;
    }

    cursor.setDate(cursor.getDate() - 1);
  }

  return 0;
};
