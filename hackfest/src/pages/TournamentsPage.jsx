// pages/TournamentsPage.jsx
import React from "react";

const TournamentsPage = () => {
  const upcomingTournaments = [
    { 
      id: 1, 
      name: "Weekly Challenge", 
      date: "April 10, 2023", 
      time: "18:00 UTC", 
      participants: 24,
      maxParticipants: 32,
      mode: "First Three",
      status: "registration"
    },
    { 
      id: 2, 
      name: "Speed Masters", 
      date: "April 15, 2023", 
      time: "15:00 UTC", 
      participants: 16,
      maxParticipants: 16,
      mode: "Time Attack",
      status: "full"
    },
    { 
      id: 3, 
      name: "Reverse Challenge", 
      date: "April 20, 2023", 
      time: "20:00 UTC", 
      participants: 8,
      maxParticipants: 32,
      mode: "Reverse Hectoc",
      status: "registration"
    },
  ];
  
  const pastTournaments = [
    { 
      id: 4, 
      name: "Monthly Championship", 
      date: "March 30, 2023", 
      winner: "CalculusKing",
      participants: 32,
      mode: "First Three"
    },
    { 
      id: 5, 
      name: "Speed Challenge", 
      date: "March 15, 2023", 
      winner: "Mathwizard",
      participants: 16,
      mode: "Time Attack"
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center items-center mb-8 relative">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 relative">
            TOURNAMENTS
            <div className="absolute w-full h-1 bg-red-500 bottom-0"></div>
          </h1>
          <p className="text-gray-600">Compete against the best players in scheduled tournaments</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Upcoming Tournaments</h2>
      <div className="space-y-4 mb-8">
        {upcomingTournaments.map((tournament) => (
          <div key={tournament.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{tournament.name}</h3>
                <p className="text-gray-600">{tournament.date} at {tournament.time}</p>
              </div>
              <div className={`px-3 py-1 rounded ${
                tournament.status === "registration" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {tournament.status === "registration" ? "Registration Open" : "Registration Closed"}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Mode:</span> {tournament.mode}
              </div>
              <div>
                <span className="text-gray-600">Participants:</span> {tournament.participants}/{tournament.maxParticipants}
              </div>
              <div className="text-right">
                {tournament.status === "registration" ? (
                  <button className="bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-800">
                    Register
                  </button>
                ) : (
                  <button className="bg-gray-300 text-gray-600 px-4 py-1 rounded cursor-not-allowed">
                    Full
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Past Tournaments</h2>
      <div className="space-y-4">
        {pastTournaments.map((tournament) => (
          <div key={tournament.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{tournament.name}</h3>
                <p className="text-gray-600">{tournament.date}</p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                Completed
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Mode:</span> {tournament.mode}
              </div>
              <div>
                <span className="text-gray-600">Participants:</span> {tournament.participants}
              </div>
              <div>
                <span className="text-gray-600">Winner:</span> <span className="font-medium">{tournament.winner}</span>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button className="text-blue-600 hover:text-blue-800">
                View Results
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
