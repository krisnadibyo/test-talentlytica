import { useState } from "react";

function App() {
  const students = [
    {
      id: 1,
      name: "John Doe",
      score1: 10,
      score2: 8,
      score3: 7,
      score4: 9,
    },
    {
      id: 2,
      name: "Jane Smith",
      score1: 9,
      score2: 7,
      score3: 8,
      score4: 10,
    },
  ];

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
                name={student.name}
                score1={student.score1}
                score2={student.score2}
                score3={student.score3}
                score4={student.score4}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>

      <div className="mt-4 w-full">
        <textarea className="w-full h-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          disabled={true}
          value={"test"}
        />
      </div>
    </div>
  );
}

function StudentScore({
  name,
  score1,
  score2,
  score3,
  score4,
}: {
  name: string;
  score1: number;
  score2: number;
  score3: number;
  score4: number;
}) {
  const [scores, setScores] = useState({
    score1: score1,
    score2: score2,
    score3: score3,
    score4: score4,
  });

  const handleScoreChange = (scoreKey: keyof typeof scores, value: number) => {
    setScores((prev) => ({
      ...prev,
      [scoreKey]: value,
    }));
  };

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
          value={scores.score1}
          onChange={(e) => handleScoreChange("score1", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <select
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          value={scores.score2}
          onChange={(e) => handleScoreChange("score2", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <select
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          value={scores.score3}
          onChange={(e) => handleScoreChange("score3", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <select
          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
          value={scores.score4}
          onChange={(e) => handleScoreChange("score4", Number(e.target.value))}
        >
          {renderOptions()}
        </select>
      </td>
    </tr>
  );
}

export default App;
