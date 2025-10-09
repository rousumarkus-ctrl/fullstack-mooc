interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((c) => (
        <Part key={c.name} course={c}></Part>
      ))}
    </div>
  );
};

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  const part: CoursePart = props.course;

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>background material {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>required skills {part.requirements.join(' ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescript extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescript {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescript {
  backgroundMaterial: string;
  kind: 'background';
}
interface CoursePartSpecial extends CoursePartDescript {
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
    kind: 'basic',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: 'group',
  },
  {
    name: 'Basics of type Narrowing',
    exerciseCount: 7,
    description: 'How to go from unknown to string',
    kind: 'basic',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    backgroundMaterial:
      'https://type-level-typescript.com/template-literal-types',
    kind: 'background',
  },
  {
    name: 'TypeScript in frontend',
    exerciseCount: 10,
    description: 'a hard part',
    kind: 'basic',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    kind: 'special',
  },
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = 'Half Stack application development';

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName}></Header>
      <Content courses={courseParts}></Content>
      <Total total={totalExercises}></Total>
    </div>
  );
};

export default App;
