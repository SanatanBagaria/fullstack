// pages/PracticeModePage.jsx
import React, { useState } from "react";

const PracticeModePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = [
    { id: "basics", name: "Basic Operations", description: "Practice addition, subtraction, multiplication, and division", difficulty: "Easy" },
    { id: "advanced", name: "Advanced Operations", description: "Practice with exponents, roots, and parentheses", difficulty: "Medium" },
    { id: "speed", name: "Speed Challenges", description: "Solve simple problems against the clock", difficulty: "Easy" },
    { id: "complex", name: "Complex Problems", description: "Multi-step problems requiring careful planning", difficulty: "Hard" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center items-center mb-8 relative">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 relative">
            PRACTICE MODE
            <div className="absolute w-full h-1 bg-red-500 bottom-0"></div>
          </h1>
          <p className="text-gray-600">Improve your skills with targeted practice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              selectedCategory === category.id ? 'border-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <div className={`px-2 py-1 rounded text-xs ${
                category.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                category.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {category.difficulty}
              </div>
            </div>
            <p className="text-gray-600 mt-2">{category.description}</p>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Choose Difficulty</h2>
          <div className="grid grid-cols-3 gap-4">
            <button className="border border-green-500 text-green-500 hover:bg-green-50 py-2 rounded">
              Easy
            </button>
            <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-50 py-2 rounded">
              Medium
            </button>
            <button className="border border-red-500 text-red-500 hover:bg-red-50 py-2 rounded">
              Hard
            </button>
          </div>
          
          <h2 className="text-2xl font-bold mt-6 mb-4">Time Limit</h2>
          <div className="grid grid-cols-3 gap-4">
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded">
              1 Minute
            </button>
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded">
              3 Minutes
            </button>
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded">
              5 Minutes
            </button>
          </div>
          
          <button className="w-full mt-6 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800">
            Start Practice
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticeModePage;
