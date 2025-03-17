import { useState } from "react";

type StudentProps = {
  id: number;
  name: string;
  score1: number;
  score2: number;
  score3: number;
  score4: number;
};

const initialStudents: StudentProps[] = new Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Mahasiswa ${i + 1}`,
    score1: 1,
    score2: 1,
    score3: 1,
    score4: 1,
  }));

// Define the format for the transformed data
type TransformedScores = {
  aspek_penilaian_1: Record<string, number>;
  aspek_penilaian_2: Record<string, number>;
  aspek_penilaian_3: Record<string, number>;
  aspek_penilaian_4: Record<string, number>;
};

function App() {
  const [students, setStudents] = useState<StudentProps[]>(initialStudents);
  const [result, setResult] = useState<string>("");

  const handleSave = () => {
    // Transform the students array into the requested format
    const transformedData: TransformedScores = {
      aspek_penilaian_1: {},
      aspek_penilaian_2: {},
      aspek_penilaian_3: {},
      aspek_penilaian_4: {},
    };

    // Populate the transformed data structure
    students.forEach((student) => {
      transformedData.aspek_penilaian_1[student.name.replace(" ","_").toLowerCase()] = student.score1;
      transformedData.aspek_penilaian_2[student.name.replace(" ","_").toLowerCase()] = student.score2;
      transformedData.aspek_penilaian_3[student.name.replace(" ","_").toLowerCase()] = student.score3;
      transformedData.aspek_penilaian_4[student.name.replace(" ","_").toLowerCase()] = student.score4;
    });

    // Format the JSON with proper indentation
    const res = JSON.stringify(transformedData, null, 2);
    setResult(res);
  };

  const handleScoreUpdate = (
    studentId: number,
    scoreKey: string,
    value: number
  ) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, [scoreKey]: value } : student
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full p-8">
      <div className="p-4 inline-block mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-center text-black">
          Aplikasi Penilaian Mahasiswa
        </h1>
      </div>

      <div className="container mx-auto px-4 py-6 flex justify-center">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aspek 1
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aspek 2
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aspek 3
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aspek 4
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <StudentScore
                key={student.id}
                id={student.id}
                name={student.name}
                score1={student.score1}
                score2={student.score2}
                score3={student.score3}
                score4={student.score4}
                onScoreChange={handleScoreUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={handleSave}
      >
        Simpan
      </button>

      <div className="mt-4 w-full">
        <p className="text-sm font-medium mb-1 text-gray-700">
          Hasil Penilaian:
        </p>
        <textarea
          className="w-full h-64 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm mx-auto"
          readOnly
          value={result}
        />
      </div>
    </div>
  );
}

type StudentScoreProps = StudentProps & {
  onScoreChange: (studentId: number, scoreKey: string, value: number) => void;
};

function StudentScore({
  id,
  name,
  score1,
  score2,
  score3,
  score4,
  onScoreChange,
}: StudentScoreProps) {
  const renderOptions = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <select
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          value={score1}
          onChange={(e) => onScoreChange(id, "score1", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <select
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          value={score2}
          onChange={(e) => onScoreChange(id, "score2", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <select
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          value={score3}
          onChange={(e) => onScoreChange(id, "score3", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <select
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          value={score4}
          onChange={(e) => onScoreChange(id, "score4", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
    </tr>
  );
}

export default App;
