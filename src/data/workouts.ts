export type WorkoutExercise = {
  id: string;
  name: string;
  muscleGroup: string;
  sets: string;
  reps: string;
  rest: string;
  tips: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
};

export type WorkoutDay = {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  workoutType: string;
  exercises: WorkoutExercise[];
};

const buildExercise = (
  id: string,
  name: string,
  muscleGroup: string,
  sets: string,
  reps: string,
  rest: string,
  duration: string,
  difficulty: WorkoutExercise['difficulty'],
  tips: string[],
): WorkoutExercise => ({
  id,
  name,
  muscleGroup,
  sets,
  reps,
  rest,
  duration,
  difficulty,
  tips,
});

export const WORKOUT_WEEK: WorkoutDay[] = [
  {
    day: 'Monday',
    workoutType: 'Chest + Triceps',
    exercises: [
      buildExercise('monday-bench-press', 'Bench Press', 'Chest, front delts, triceps', '4 sets', '8-10 reps', '90 sec', '12 min', 'Beginner', [
        'Pin your shoulder blades back before every rep.',
        'Drive the bar up on a smooth, controlled path.',
      ]),
      buildExercise('monday-incline-dumbbell-press', 'Incline Dumbbell Press', 'Upper chest, shoulders', '4 sets', '8-12 reps', '75 sec', '11 min', 'Beginner', [
        'Keep the bench angle moderate, not vertical.',
        'Lower dumbbells to chest level with control.',
      ]),
      buildExercise('monday-chest-fly', 'Chest Fly', 'Chest isolation', '3 sets', '12-15 reps', '60 sec', '9 min', 'Beginner', [
        'Use a soft bend in the elbows.',
        'Think of hugging a barrel, not pressing.',
      ]),
      buildExercise('monday-pushups', 'Pushups', 'Chest, core, triceps', '3 sets', 'AMRAP', '45 sec', '8 min', 'Beginner', [
        'Keep your body in one straight line.',
        'Stop a rep before form starts to break.',
      ]),
      buildExercise('monday-tricep-pushdown', 'Tricep Pushdown', 'Triceps', '3 sets', '10-12 reps', '60 sec', '8 min', 'Beginner', [
        'Lock the elbows to your sides.',
        'Separate the rope at the bottom.',
      ]),
      buildExercise('monday-overhead-tricep-extension', 'Overhead Tricep Extension', 'Long head triceps', '3 sets', '10-12 reps', '60 sec', '8 min', 'Beginner', [
        'Keep your ribs down and core tight.',
        'Let the stretch happen behind the head.',
      ]),
    ],
  },
  {
    day: 'Tuesday',
    workoutType: 'Back + Biceps',
    exercises: [
      buildExercise('tuesday-lat-pulldown', 'Lat Pulldown', 'Lats, upper back, biceps', '4 sets', '8-12 reps', '75 sec', '11 min', 'Beginner', [
        'Pull elbows down and back.',
        'Avoid leaning too far away from the stack.',
      ]),
      buildExercise('tuesday-seated-cable-row', 'Seated Cable Row', 'Mid-back, lats', '4 sets', '10-12 reps', '75 sec', '11 min', 'Beginner', [
        'Squeeze shoulder blades together at the finish.',
        'Pause for a second before returning.',
      ]),
      buildExercise('tuesday-barbell-row', 'Barbell Row', 'Upper back, lats', '4 sets', '8-10 reps', '90 sec', '12 min', 'Intermediate', [
        'Keep the torso braced and flat.',
        'Pull to the lower ribs, not the chest.',
      ]),
      buildExercise('tuesday-face-pull', 'Face Pull', 'Rear delts, upper back', '3 sets', '12-15 reps', '45 sec', '8 min', 'Beginner', [
        'Lead with the elbows and open the chest.',
        'Finish with hands near eye level.',
      ]),
      buildExercise('tuesday-barbell-curl', 'Barbell Curl', 'Biceps', '3 sets', '10-12 reps', '60 sec', '8 min', 'Beginner', [
        'Keep your upper arms quiet.',
        'Control the lowering phase.',
      ]),
      buildExercise('tuesday-hammer-curl', 'Hammer Curl', 'Biceps, brachialis, forearms', '3 sets', '10-12 reps', '60 sec', '8 min', 'Beginner', [
        'Use a neutral grip throughout.',
        'Do not swing the dumbbells.',
      ]),
    ],
  },
  {
    day: 'Wednesday',
    workoutType: 'Legs + Abs',
    exercises: [
      buildExercise('wednesday-squats', 'Squats', 'Quads, glutes, core', '4 sets', '8-10 reps', '90 sec', '12 min', 'Beginner', [
        'Keep feet rooted through the full foot.',
        'Descend with a tight brace and upright chest.',
      ]),
      buildExercise('wednesday-leg-press', 'Leg Press', 'Quads, glutes', '4 sets', '10-12 reps', '75 sec', '11 min', 'Beginner', [
        'Do not lock the knees at the top.',
        'Lower until your pelvis stays neutral.',
      ]),
      buildExercise('wednesday-lunges', 'Lunges', 'Quads, glutes, balance', '3 sets', '10 reps each leg', '60 sec', '10 min', 'Beginner', [
        'Keep the front knee stacked over the ankle.',
        'Step long enough to keep your torso tall.',
      ]),
      buildExercise('wednesday-leg-curl', 'Leg Curl', 'Hamstrings', '3 sets', '12-15 reps', '60 sec', '8 min', 'Beginner', [
        'Curl with control rather than momentum.',
        'Squeeze the hamstrings at the top.',
      ]),
      buildExercise('wednesday-calf-raises', 'Calf Raises', 'Calves', '4 sets', '15-20 reps', '45 sec', '8 min', 'Beginner', [
        'Pause at the top for a hard squeeze.',
        'Drop slowly into a deep stretch.',
      ]),
      buildExercise('wednesday-crunches', 'Crunches', 'Abs', '3 sets', '15-20 reps', '45 sec', '7 min', 'Beginner', [
        'Lift the rib cage, not the neck.',
        'Exhale hard at the top.',
      ]),
      buildExercise('wednesday-plank', 'Plank', 'Core, stabilizers', '3 sets', '30-45 sec', '45 sec', '6 min', 'Beginner', [
        'Keep hips level and ribs tucked.',
        'Push the floor away with the forearms.',
      ]),
    ],
  },
  {
    day: 'Thursday',
    workoutType: 'Shoulders + Cardio',
    exercises: [
      buildExercise('thursday-shoulder-press', 'Shoulder Press', 'Front delts, triceps', '4 sets', '8-10 reps', '75 sec', '11 min', 'Beginner', [
        'Press slightly back so the wrists stay stacked.',
        'Keep the ribs from flaring up.',
      ]),
      buildExercise('thursday-lateral-raises', 'Lateral Raises', 'Side delts', '3 sets', '12-15 reps', '45 sec', '8 min', 'Beginner', [
        'Lead with elbows and stop near shoulder height.',
        'Avoid shrugging up into the ears.',
      ]),
      buildExercise('thursday-front-raises', 'Front Raises', 'Front delts', '3 sets', '12-15 reps', '45 sec', '8 min', 'Beginner', [
        'Use a light weight and strict tempo.',
        'Lift to eye level with a soft elbow bend.',
      ]),
      buildExercise('thursday-rear-delt-fly', 'Rear Delt Fly', 'Rear delts, upper back', '3 sets', '12-15 reps', '45 sec', '8 min', 'Beginner', [
        'Think wide, not heavy.',
        'Hold the peak contraction briefly.',
      ]),
      buildExercise('thursday-shrugs', 'Shrugs', 'Upper traps', '4 sets', '10-12 reps', '60 sec', '8 min', 'Beginner', [
        'Lift straight up, not in a circle.',
        'Pause at the top for a full squeeze.',
      ]),
      buildExercise('thursday-cardio', '15-20 Min Cardio', 'Conditioning, heart health', '1 block', '15-20 min', 'As needed', '20 min', 'Beginner', [
        'Choose a pace you can sustain the full block.',
        'Keep breathing steady and nasal when possible.',
      ]),
    ],
  },
  {
    day: 'Friday',
    workoutType: 'Chest + Back',
    exercises: [
      buildExercise('friday-bench-press', 'Bench Press', 'Chest, triceps, front delts', '4 sets', '8-10 reps', '90 sec', '12 min', 'Beginner', [
        'Set your arch before the first rep.',
        'Drive the bar with stable wrists and forearms.',
      ]),
      buildExercise('friday-incline-press', 'Incline Press', 'Upper chest, shoulders', '4 sets', '8-12 reps', '75 sec', '11 min', 'Beginner', [
        'Keep the elbows slightly in front of the torso.',
        'Lower under control and press with intent.',
      ]),
      buildExercise('friday-lat-pulldown', 'Lat Pulldown', 'Lats, upper back', '4 sets', '8-12 reps', '75 sec', '11 min', 'Beginner', [
        'Pull the bar to the upper chest.',
        'Keep shoulders away from the ears.',
      ]),
      buildExercise('friday-cable-row', 'Cable Row', 'Mid-back, lats', '4 sets', '10-12 reps', '75 sec', '10 min', 'Beginner', [
        'Reach forward, then row by driving elbows back.',
        'Hold the squeeze before returning the handle.',
      ]),
      buildExercise('friday-pushups', 'Pushups', 'Chest, triceps, core', '3 sets', 'AMRAP', '45 sec', '8 min', 'Beginner', [
        'Keep the neck long and the core tight.',
        'Use a knee variation if you need clean reps.',
      ]),
      buildExercise('friday-pullups', 'Pullups', 'Lats, biceps, grip', '3 sets', 'AMRAP', '90 sec', '10 min', 'Intermediate', [
        'Start each rep from a dead hang.',
        'Scale with assisted pullups if needed.',
      ]),
    ],
  },
  {
    day: 'Saturday',
    workoutType: 'Arms + Abs',
    exercises: [
      buildExercise('saturday-barbell-curl', 'Barbell Curl', 'Biceps', '4 sets', '8-12 reps', '60 sec', '8 min', 'Beginner', [
        'Keep the torso still through each curl.',
        'Squeeze the biceps hard at the top.',
      ]),
      buildExercise('saturday-hammer-curl', 'Hammer Curl', 'Biceps, forearms', '3 sets', '10-12 reps', '60 sec', '8 min', 'Beginner', [
        'Neutral grip keeps the movement joint-friendly.',
        'Lower slowly to build tension.',
      ]),
      buildExercise('saturday-concentration-curl', 'Concentration Curl', 'Biceps', '3 sets', '10-12 reps', '45 sec', '7 min', 'Beginner', [
        'Anchor the elbow against the inner thigh.',
        'Use a full squeeze at the top.',
      ]),
      buildExercise('saturday-tricep-pushdown', 'Tricep Pushdown', 'Triceps', '3 sets', '10-12 reps', '60 sec', '8 min', 'Beginner', [
        'Keep the elbows pinned and shoulders relaxed.',
        'Finish with the rope split wide.',
      ]),
      buildExercise('saturday-skull-crushers', 'Skull Crushers', 'Triceps', '3 sets', '10-12 reps', '75 sec', '9 min', 'Intermediate', [
        'Move only at the elbows.',
        'Lower the bar behind the forehead for comfort.',
      ]),
      buildExercise('saturday-leg-raises', 'Leg Raises', 'Lower abs', '3 sets', '12-15 reps', '45 sec', '7 min', 'Beginner', [
        'Keep your lower back pressed to the pad or floor.',
        'Control the descent for more ab tension.',
      ]),
      buildExercise('saturday-russian-twists', 'Russian Twists', 'Obliques, core', '3 sets', '20 total reps', '45 sec', '7 min', 'Beginner', [
        'Rotate through the torso, not the arms.',
        'Keep the spine tall throughout the set.',
      ]),
    ],
  },
  {
    day: 'Sunday',
    workoutType: 'Rest / Recovery',
    exercises: [
      buildExercise('sunday-stretching', 'Stretching', 'Mobility, recovery', '1 block', '10-15 min', 'As needed', '12 min', 'Beginner', [
        'Move slowly and breathe into every position.',
        'Hold each stretch without forcing range.',
      ]),
      buildExercise('sunday-walking', 'Walking', 'Light cardio, recovery', '1 block', '20-30 min', 'As needed', '25 min', 'Beginner', [
        'Walk at a pace that feels restorative.',
        'Keep the posture tall and relaxed.',
      ]),
      buildExercise('sunday-mobility-work', 'Mobility Work', 'Hips, spine, shoulders', '1 block', '10-15 min', 'As needed', '12 min', 'Beginner', [
        'Focus on smooth joint circles and controlled ranges.',
        'Do not rush the movement quality.',
      ]),
      buildExercise('sunday-recovery', 'Recovery', 'Nervous system, fatigue management', '1 block', '15-20 min', 'As needed', '20 min', 'Beginner', [
        'Hydrate, sleep, and keep stress low.',
        'Use this day to prepare for the next training block.',
      ]),
    ],
  },
];

export const DAY_ORDER = WORKOUT_WEEK.map((day) => day.day);
