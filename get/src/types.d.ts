export type Exercise = {
  id: number;
  name: string;
};

export type TrainingDay = {
  id: number;
  date: string;
  exercises: Exercise[];
};
