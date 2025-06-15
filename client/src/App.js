import React, { useState, useRef } from "react";
import {
  Upload,
  Users,
  Building,
  Eye,
  Download,
  Shuffle,
  Settings,
  Sun,
  Moon,
  Plus,
  FileText,
  Grid,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

const ExamArrange = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [seatingPlan, setSeatingPlan] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [antiCheatMode, setAntiCheatMode] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showDepartments, setShowDepartments] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const fileInputRef = useRef(null);
  const classroomFileInputRef = useRef(null);

  // Department mapping based on class
  const getDepartmentFromClass = (className) => {
    const deptMap = {
      D1AD: "AI&DS",
      D6AD: "AI&DS",
      D11AD: "AI&DS",
      D16AD: "AI&DS",
      D2: "CMPN",
      D7: "CMPN",
      D12: "CMPN",
      D17: "CMPN",
      D4: "EXTC",
      D9: "EXTC",
      D14: "EXTC",
      D19: "EXTC",
      D3: "IT",
      D8: "IT",
      D13: "IT",
      D18: "IT",
      D1: "AURO",
      D6: "AURO",
      D11: "AURO",
      D16: "AURO",
      D5: "ECS",
      D10: "ECS",
      D15: "ECS",
      D20: "ECS",
    };
    return deptMap[className] || "Unknown";
  };

  // Year mapping based on class
  const getYearFromClass = (className) => {
    if (["D1", "D2", "D3", "D4", "D5", "D1AD"].includes(className)) return "FE";
    if (["D6", "D7", "D8", "D9", "D10", "D6AD"].includes(className))
      return "SE";
    if (["D11", "D12", "D13", "D14", "D15", "D11AD"].includes(className))
      return "TE";
    if (["D16", "D17", "D18", "D19", "D20", "D16AD"].includes(className))
      return "BE";
    return "Unknown";
  };

  // Section mapping based on class
  const getSectionsFromClass = (className) => {
    if (["D1AD", "D6AD", "D11AD", "D16AD"].includes(className))
      return ["A", "B"];
    if (
      ["D2", "D5", "D7", "D10", "D12", "D15", "D17", "D20"].includes(className)
    )
      return ["A", "B", "C"];
    if (["D4", "D9", "D14", "D19"].includes(className)) return ["A", "B"];
    if (
      ["D1", "D3", "D6", "D8", "D11", "D13", "D16", "D18"].includes(className)
    )
      return ["A"];
    return ["A"];
  };

  // Generate roll number based on department and semester
  const generateRollNumber = (department, year, index) => {
    const yearNum = { FE: [1, 2], SE: [3, 4], TE: [5, 6], BE: [7, 8] }[
      year
    ] || [1, 2];
    const semNum = yearNum[Math.floor(Math.random() * 2)]; // Random semester
    const deptPrefix =
      {
        "AI&DS": "AI",
        CMPN: "CS",
        IT: "IT",
        EXTC: "EX",
        ECS: "EC",
        AURO: "AR",
      }[department] || "XX";

    return `${deptPrefix}${semNum}S${String(index).padStart(3, "0")}`;
  };

  // Generate sample student data
  const generateSampleStudents = () => {
    const classes = [
      "D1AD",
      "D1",
      "D2",
      "D3",
      "D4",
      "D5",
      "D6AD",
      "D6",
      "D7",
      "D8",
      "D9",
      "D10",
      "D11AD",
      "D11",
      "D12",
      "D13",
      "D14",
      "D15",
      "D16AD",
      "D16",
      "D17",
      "D18",
      "D19",
      "D20",
    ];
    const firstNames = [
      "Rohan",
      "Aisha",
      "Arjun",
      "Priya",
      "Karan",
      "Sneha",
      "Vikram",
      "Pooja",
      "Rahul",
      "Kavya",
      "Amit",
      "Riya",
      "Siddharth",
      "Meera",
      "Nikhil",
      "Shreya",
      "Varun",
      "Ananya",
      "Akash",
      "Ishika",
    ];
    const surnames = [
      "Sharma",
      "Patel",
      "Singh",
      "Gupta",
      "Mehta",
      "Agarwal",
      "Jain",
      "Shah",
      "Kumar",
      "Verma",
      "Yadav",
      "Mishra",
      "Tiwari",
      "Pandey",
      "Soni",
      "Khanna",
      "Malhotra",
      "Chopra",
      "Kapoor",
      "Bansal",
    ];

    const sampleStudents = [];
    let rollIndex = 1;

    classes.forEach((className) => {
      const department = getDepartmentFromClass(className);
      const year = getYearFromClass(className);
      const sections = getSectionsFromClass(className);

      sections.forEach((section) => {
        // 10 students per section
        for (let i = 0; i < 10; i++) {
          const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
          const surname = surnames[Math.floor(Math.random() * surnames.length)];
          const rollNumber = generateRollNumber(department, year, rollIndex++);

          const yearSemMap = {
            FE: ["Sem 1", "Sem 2"],
            SE: ["Sem 3", "Sem 4"],
            TE: ["Sem 5", "Sem 6"],
            BE: ["Sem 7", "Sem 8"],
          };
          const semester = yearSemMap[year][Math.floor(Math.random() * 2)];

          sampleStudents.push({
            rollNumber,
            name: firstName,
            surname,
            department,
            class: className,
            section,
            year,
            semester,
          });
        }
      });
    });

    return sampleStudents;
  };

  // Generate sample classroom data
  const generateSampleClassrooms = () => {
    const classrooms = [];
    for (let i = 1; i <= 12; i++) {
      classrooms.push({
        roomNumber: `Room${i}`,
        capacity: 60,
        rows: 10,
        columns: 6,
      });
    }
    return classrooms;
  };

  const parseCSV = (csvText, type) => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || "";
      });
      data.push(obj);
    }

    return data;
  };

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = parseCSV(e.target.result, type);
        if (type === "students") {
          setStudents(csvData);
        } else {
          setClassrooms(csvData);
        }
      };
      reader.readAsText(file);
    }
  };

  const loadSampleData = () => {
    setStudents(generateSampleStudents());
    setClassrooms(generateSampleClassrooms());
  };

  const generateSeatingPlan = () => {
    if (students.length === 0 || classrooms.length === 0) {
      alert("Please upload both student and classroom data first.");
      return;
    }

    const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
    const plan = [];
    let currentStudentIndex = 0;

    classrooms.forEach((classroom) => {
      if (currentStudentIndex >= shuffledStudents.length) return;

      const roomPlan = {
        roomNumber: classroom.roomNumber,
        capacity: parseInt(classroom.capacity),
        rows: parseInt(classroom.rows),
        columns: parseInt(classroom.columns),
        seats: [],
      };

      // Initialize seats
      for (let row = 0; row < roomPlan.rows; row++) {
        for (let col = 0; col < roomPlan.columns; col++) {
          roomPlan.seats.push({
            row: row,
            col: col,
            seatNumber: `${row + 1}-${col + 1}`,
            student: null,
          });
        }
      }

      // Assign students with anti-cheat logic
      let seatIndex = 0;
      const assignedInRoom = [];

      while (
        currentStudentIndex < shuffledStudents.length &&
        seatIndex < roomPlan.seats.length
      ) {
        const student = shuffledStudents[currentStudentIndex];
        let canAssign = true;

        if (antiCheatMode && assignedInRoom.length > 0) {
          // Check adjacent seats for same department and semester
          const adjacentSeats = getAdjacentSeats(
            seatIndex,
            roomPlan.rows,
            roomPlan.columns
          );
          const hasAdjacentSameDeptSem = adjacentSeats.some((adjIndex) => {
            const adjSeat = roomPlan.seats[adjIndex];
            return (
              adjSeat.student &&
              adjSeat.student.department === student.department &&
              adjSeat.student.semester === student.semester
            );
          });

          if (hasAdjacentSameDeptSem) {
            canAssign = false;
          }
        }

        if (canAssign) {
          roomPlan.seats[seatIndex].student = student;
          assignedInRoom.push(student);
          currentStudentIndex++;
        }

        seatIndex++;
      }

      plan.push(roomPlan);
    });

    setSeatingPlan(plan);
    setActiveTab("seating");
  };

  const getAdjacentSeats = (seatIndex, rows, columns) => {
    const row = Math.floor(seatIndex / columns);
    const col = seatIndex % columns;
    const adjacent = [];

    // Check all 8 directions
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue;
        const newRow = row + r;
        const newCol = col + c;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns) {
          adjacent.push(newRow * columns + newCol);
        }
      }
    }

    return adjacent;
  };

  const shuffleSeating = () => {
    if (seatingPlan.length === 0) return;

    // Collect all assigned students
    const allStudents = [];
    seatingPlan.forEach((room) => {
      room.seats.forEach((seat) => {
        if (seat.student) allStudents.push(seat.student);
      });
    });

    // Shuffle students
    for (let i = allStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allStudents[i], allStudents[j]] = [allStudents[j], allStudents[i]];
    }

    // Reassign shuffled students
    let studentIndex = 0;
    const newPlan = seatingPlan.map((room) => ({
      ...room,
      seats: room.seats.map((seat) => ({
        ...seat,
        student: seat.student ? allStudents[studentIndex++] : null,
      })),
    }));

    setSeatingPlan(newPlan);
  };

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    const selectedRoomData = seatingPlan.find(
      (room) => room.roomNumber === selectedRoom
    );

    if (!selectedRoomData) {
      alert("Please select a room first.");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>Seating Plan - ${selectedRoomData.roomNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .room-grid { display: grid; grid-template-columns: repeat(${
              selectedRoomData.columns
            }, 1fr); gap: 8px; max-width: 900px; margin: 0 auto; }
            .seat { border: 1px solid #333; padding: 8px; text-align: center; min-height: 70px; display: flex; flex-direction: column; justify-content: center; font-size: 11px; }
            .occupied { background-color: #e3f2fd; }
            .empty { background-color: #f5f5f5; }
            .seat-number { font-weight: bold; margin-bottom: 3px; }
            .student-info { font-size: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ExamArrange - Examination Seating Plan</h1>
            <h2>${selectedRoomData.roomNumber}</h2>
            <p>Total Capacity: ${
              selectedRoomData.capacity
            } | Date: ${new Date().toLocaleDateString()}</p>
            <p>Layout: ${selectedRoomData.rows} rows × ${
      selectedRoomData.columns
    } columns</p>
          </div>
          <div class="room-grid">
            ${selectedRoomData.seats
              .map(
                (seat) => `
              <div class="seat ${seat.student ? "occupied" : "empty"}">
                <div class="seat-number">${seat.seatNumber}</div>
                ${
                  seat.student
                    ? `
                  <div class="student-info">
                    <div style="font-weight: bold;">${
                      seat.student.rollNumber
                    }</div>
                    ${
                      showNames
                        ? `<div>${seat.student.name} ${seat.student.surname}</div>`
                        : ""
                    }
                    ${
                      showDepartments
                        ? `<div>${seat.student.department}</div>`
                        : ""
                    }
                    <div>${seat.student.year} - ${seat.student.semester}</div>
                  </div>
                `
                    : '<div style="color: #999;">Empty</div>'
                }
              </div>
            `
              )
              .join("")}
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToCSV = () => {
    if (seatingPlan.length === 0) return;

    let csvContent =
      "Room,Seat,RollNumber,Name,Surname,Department,Class,Section,Year,Semester\n";

    seatingPlan.forEach((room) => {
      room.seats.forEach((seat) => {
        if (seat.student) {
          csvContent += `${room.roomNumber},${seat.seatNumber},${seat.student.rollNumber},${seat.student.name},${seat.student.surname},${seat.student.department},${seat.student.class},${seat.student.section},${seat.student.year},${seat.student.semester}\n`;
        }
      });
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seating_plan.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportSampleCSVs = () => {
    // Export sample student CSV
    const studentCSV =
      "RollNumber,Name,Surname,Department,Class,Section,Year,Semester\n" +
      generateSampleStudents()
        .slice(0, 50)
        .map(
          (s) =>
            `${s.rollNumber},${s.name},${s.surname},${s.department},${s.class},${s.section},${s.year},${s.semester}`
        )
        .join("\n");

    const studentBlob = new Blob([studentCSV], { type: "text/csv" });
    const studentUrl = window.URL.createObjectURL(studentBlob);
    const studentLink = document.createElement("a");
    studentLink.href = studentUrl;
    studentLink.download = "sample_students.csv";
    studentLink.click();
    window.URL.revokeObjectURL(studentUrl);

    // Export sample classroom CSV
    const classroomCSV =
      "RoomNumber,SeatingCapacity,Rows,Columns\n" +
      generateSampleClassrooms()
        .map((c) => `${c.roomNumber},${c.capacity},${c.rows},${c.columns}`)
        .join("\n");

    const classroomBlob = new Blob([classroomCSV], { type: "text/csv" });
    const classroomUrl = window.URL.createObjectURL(classroomBlob);
    const classroomLink = document.createElement("a");
    classroomLink.href = classroomUrl;
    classroomLink.download = "sample_classrooms.csv";
    classroomLink.click();
    window.URL.revokeObjectURL(classroomUrl);
  };

  // Filter students based on search and department
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchTerm === "" ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${student.name} ${student.surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "" || student.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  // Get unique departments for filter
  const departments = [...new Set(students.map((s) => s.department))];

  const themeClasses = darkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white"
    : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 text-gray-900";

  const cardClasses = darkMode
    ? "bg-gray-800/80 border-gray-700 backdrop-blur-sm shadow-xl"
    : "bg-white/80 border-gray-200 backdrop-blur-sm shadow-xl";

  const buttonClasses = darkMode
    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";

  // Realistic Seat Component
  const RealisticSeat = ({
    seat,
    student,
    seatNumber,
    darkMode,
    showNames,
    showDepartments,
  }) => {
    const getDepartmentColor = (dept) => {
      const colors = {
        "AI&DS": darkMode
          ? "from-purple-600 to-purple-800"
          : "from-purple-400 to-purple-600",
        CMPN: darkMode
          ? "from-blue-600 to-blue-800"
          : "from-blue-400 to-blue-600",
        IT: darkMode
          ? "from-green-600 to-green-800"
          : "from-green-400 to-green-600",
        EXTC: darkMode
          ? "from-orange-600 to-orange-800"
          : "from-orange-400 to-orange-600",
        ECS: darkMode ? "from-red-600 to-red-800" : "from-red-400 to-red-600",
        AURO: darkMode
          ? "from-yellow-600 to-yellow-800"
          : "from-yellow-400 to-yellow-600",
      };
      return (
        colors[dept] ||
        (darkMode ? "from-gray-600 to-gray-800" : "from-gray-400 to-gray-600")
      );
    };

    return (
      <div className="relative group">
        {/* Seat Back */}
        <div
          className={`
          w-full h-20 rounded-t-2xl border-2 relative
          ${
            student
              ? `bg-gradient-to-b ${getDepartmentColor(
                  student.department
                )} border-gray-600 shadow-lg`
              : darkMode
              ? "bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600"
              : "bg-gradient-to-b from-gray-300 to-gray-400 border-gray-400"
          }
          transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
        `}
        >
          {/* Seat Cushion Top Part */}
          <div
            className={`
            absolute bottom-0 left-1 right-1 h-3 rounded-t-xl
            ${
              student
                ? "bg-gradient-to-t from-black/20 to-transparent"
                : "bg-gradient-to-t from-black/10 to-transparent"
            }
          `}
          ></div>

          {/* Seat Number Badge */}
          <div
            className={`
            absolute top-1 left-1 right-1 text-center
            ${
              student
                ? "text-white font-bold text-xs"
                : "text-gray-600 font-semibold text-xs"
            }
          `}
          >
            {seatNumber}
          </div>

          {/* Student Info Area */}
          {student && (
            <div className="absolute bottom-2 left-1 right-1 text-center">
              <div className="text-white font-bold text-xs truncate">
                {student.rollNumber}
              </div>
              {showNames && (
                <div className="text-white/90 text-xs truncate">
                  {student.name}
                </div>
              )}
              {showDepartments && (
                <div className="text-white/80 text-xs">
                  {student.department}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Seat Base/Cushion */}
        <div
          className={`
          w-full h-6 rounded-b-2xl border-2 border-t-0
          ${
            student
              ? `bg-gradient-to-b ${getDepartmentColor(
                  student.department
                )} border-gray-600`
              : darkMode
              ? "bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600"
              : "bg-gradient-to-b from-gray-300 to-gray-400 border-gray-400"
          }
          shadow-md
        `}
        >
          {/* Base Shadow */}
          <div className="w-full h-full bg-gradient-to-b from-transparent to-black/30 rounded-b-2xl"></div>
        </div>

        {/* Seat Legs */}
        <div className="flex justify-between px-2 mt-1">
          <div
            className={`w-1 h-3 ${
              darkMode ? "bg-gray-600" : "bg-gray-500"
            } rounded-b`}
          ></div>
          <div
            className={`w-1 h-3 ${
              darkMode ? "bg-gray-600" : "bg-gray-500"
            } rounded-b`}
          ></div>
        </div>

        {/* Hover Tooltip */}
        {student && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div
              className={`${cardClasses} p-3 rounded-lg shadow-2xl border min-w-48`}
            >
              <div className="text-sm font-bold">{student.rollNumber}</div>
              <div className="text-sm">
                {student.name} {student.surname}
              </div>
              <div className="text-xs opacity-70">
                {student.department} • {student.year}
              </div>
              <div className="text-xs opacity-70">
                {student.class} - {student.section}
              </div>
              <div className="text-xs opacity-70">{student.semester}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header
        className={`border-b ${
          darkMode ? "border-gray-700/50" : "border-gray-200/50"
        } p-6 backdrop-blur-md sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Grid className="w-10 h-10 text-blue-500 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 text-blue-400 animate-ping opacity-20">
                <Grid className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ExamArrange
              </h1>
              <p className="text-sm opacity-70 font-medium">
                AI-Powered Examination Seating Arrangement System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm opacity-70">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl ${cardClasses} border transition-all duration-300 hover:scale-110`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`border-b ${
          darkMode ? "border-gray-700/50" : "border-gray-200/50"
        } p-6 backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              {
                id: "dashboard",
                label: "Dashboard",
                icon: Settings,
                color: "from-blue-500 to-blue-600",
              },
              {
                id: "students",
                label: "Students",
                icon: Users,
                color: "from-green-500 to-green-600",
              },
              {
                id: "classrooms",
                label: "Classrooms",
                icon: Building,
                color: "from-orange-500 to-orange-600",
              },
              {
                id: "seating",
                label: "Seating Plan",
                icon: Eye,
                color: "from-purple-500 to-purple-600",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                    : `${cardClasses} hover:scale-105 hover:shadow-lg`
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 relative z-10">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div
                className={`${cardClasses} border rounded-2xl p-6 transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                      {students.length}
                    </div>
                    <div className="text-xs opacity-60">+12% this week</div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Total Students
                </h3>
                <p className="text-sm opacity-70">Registered for examination</p>
              </div>

              <div
                className={`${cardClasses} border rounded-2xl p-6 transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                      {classrooms.length}
                    </div>
                    <div className="text-xs opacity-60">All available</div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Classrooms
                </h3>
                <p className="text-sm opacity-70">Ready for arrangement</p>
              </div>

              <div
                className={`${cardClasses} border rounded-2xl p-6 transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                      {seatingPlan.length}
                    </div>
                    <div className="text-xs opacity-60">Plans generated</div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Seating Plans
                </h3>
                <p className="text-sm opacity-70">Rooms arranged</p>
              </div>

              <div
                className={`${cardClasses} border rounded-2xl p-6 transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {students.length > 0
                        ? Math.ceil(students.length / 720)
                        : 0}
                    </div>
                    <div className="text-xs opacity-60">Sessions needed</div>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Exam Sessions
                </h3>
                <p className="text-sm opacity-70">Based on capacity</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${cardClasses} border rounded-2xl p-8`}>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <button
                  onClick={loadSampleData}
                  className={`${buttonClasses} text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Load Sample Data</span>
                </button>

                <button
                  onClick={exportSampleCSVs}
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Download Templates</span>
                </button>

                <button
                  onClick={generateSeatingPlan}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={students.length === 0 || classrooms.length === 0}
                >
                  <Grid className="w-5 h-5" />
                  <span className="font-medium">Generate Plan</span>
                </button>

                <button
                  onClick={shuffleSeating}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={seatingPlan.length === 0}
                >
                  <Shuffle className="w-5 h-5" />
                  <span className="font-medium">Shuffle Seats</span>
                </button>

                <button
                  onClick={exportToCSV}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={seatingPlan.length === 0}
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Export CSV</span>
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            <div className={`${cardClasses} border rounded-2xl p-8`}>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Settings & Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Arrangement Settings
                  </h3>
                  <label className="flex items-center space-x-4 group cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={antiCheatMode}
                        onChange={(e) => setAntiCheatMode(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          antiCheatMode
                            ? "bg-gradient-to-r from-blue-500 to-blue-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 mt-0.5 ${
                            antiCheatMode ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Anti-Cheat Mode</span>
                      <p className="text-sm opacity-70">
                        Prevent same department & semester adjacency
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-4 group cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={showNames}
                        onChange={(e) => setShowNames(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          showNames
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 mt-0.5 ${
                            showNames ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Show Student Names</span>
                      <p className="text-sm opacity-70">
                        Display names in seating plan
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-4 group cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={showDepartments}
                        onChange={(e) => setShowDepartments(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          showDepartments
                            ? "bg-gradient-to-r from-purple-500 to-purple-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 mt-0.5 ${
                            showDepartments
                              ? "translate-x-6"
                              : "translate-x-0.5"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Show Departments</span>
                      <p className="text-sm opacity-70">
                        Display department codes
                      </p>
                    </div>
                  </label>
                </div>

                <div
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-50"
                  } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                >
                  <h3 className="text-lg font-semibold mb-4">
                    System Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-blue-600 dark:text-blue-400">
                        Supported Departments
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-purple-500"></div>
                          <span>AI&DS</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-blue-500"></div>
                          <span>CMPN</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-green-500"></div>
                          <span>IT</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-orange-500"></div>
                          <span>EXTC</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-red-500"></div>
                          <span>ECS</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded bg-yellow-500"></div>
                          <span>AURO</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-green-600 dark:text-green-400">
                        Classroom Specifications
                      </h4>
                      <ul className="text-sm space-y-1 opacity-80">
                        <li>• 12 Classrooms (Room1 - Room12)</li>
                        <li>• 60 seats per classroom</li>
                        <li>• 10 rows × 6 columns layout</li>
                        <li>• 1 student per bench</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="space-y-8">
            <div className={`${cardClasses} border rounded-2xl p-8`}>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Student Management
              </h2>

              {/* Upload Section */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e, "students")}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`${buttonClasses} text-white px-6 py-3 rounded-xl flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">Upload Student CSV</span>
                  </button>
                  <div
                    className={`flex-1 p-4 rounded-xl ${
                      darkMode ? "bg-gray-800/50" : "bg-gray-50"
                    } border ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      CSV Format Required:
                    </p>
                    <p className="text-xs opacity-70">
                      RollNumber, Name, Surname, Department, Class, Section,
                      Year, Semester
                    </p>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              {students.length > 0 && (
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by roll number or name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${cardClasses} ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className={`pl-10 pr-8 py-3 rounded-xl border ${cardClasses} ${
                        darkMode ? "border-gray-600" : "border-gray-300"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none`}
                    >
                      <option value="">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Students Table */}
              {filteredStudents.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <thead
                      className={`${
                        darkMode ? "bg-gray-800/50" : "bg-gray-50"
                      }`}
                    >
                      <tr>
                        <th className="text-left p-4 font-semibold">
                          Roll Number
                        </th>
                        <th className="text-left p-4 font-semibold">Name</th>
                        <th className="text-left p-4 font-semibold">
                          Department
                        </th>
                        <th className="text-left p-4 font-semibold">Class</th>
                        <th className="text-left p-4 font-semibold">Section</th>
                        <th className="text-left p-4 font-semibold">Year</th>
                        <th className="text-left p-4 font-semibold">
                          Semester
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.slice(0, 100).map((student, index) => (
                        <tr
                          key={index}
                          className={`border-t ${
                            darkMode ? "border-gray-700" : "border-gray-200"
                          } hover:${
                            darkMode ? "bg-gray-800/30" : "bg-gray-50"
                          } transition-colors`}
                        >
                          <td className="p-4 font-mono text-sm">
                            {student.rollNumber}
                          </td>
                          <td className="p-4">
                            <div className="font-medium">
                              {student.name} {student.surname}
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                student.department === "AI&DS"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                  : student.department === "CMPN"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : student.department === "IT"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : student.department === "EXTC"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                  : student.department === "ECS"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              }`}
                            >
                              {student.department}
                            </span>
                          </td>
                          <td className="p-4">{student.class}</td>
                          <td className="p-4">{student.section}</td>
                          <td className="p-4">{student.year}</td>
                          <td className="p-4">{student.semester}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredStudents.length > 100 && (
                    <div
                      className={`p-4 text-center text-sm opacity-70 ${
                        darkMode ? "bg-gray-800/50" : "bg-gray-50"
                      } border-t`}
                    >
                      Showing first 100 students of {filteredStudents.length}{" "}
                      total
                    </div>
                  )}
                </div>
              )}

              {students.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    No Students Data
                  </h3>
                  <p className="opacity-70 mb-6">
                    Upload a CSV file or load sample data to get started
                  </p>
                  <button
                    onClick={loadSampleData}
                    className={`${buttonClasses} text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    Load Sample Data
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "classrooms" && (
          <div className="space-y-8">
            <div className={`${cardClasses} border rounded-2xl p-8`}>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Classroom Management
              </h2>

              {/* Upload Section */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileUpload(e, "classrooms")}
                    ref={classroomFileInputRef}
                    className="hidden"
                  />
                  <button
                    onClick={() => classroomFileInputRef.current?.click()}
                    className={`${buttonClasses} text-white px-6 py-3 rounded-xl flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">Upload Classroom CSV</span>
                  </button>
                  <div
                    className={`flex-1 p-4 rounded-xl ${
                      darkMode ? "bg-gray-800/50" : "bg-gray-50"
                    } border ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      CSV Format Required:
                    </p>
                    <p className="text-xs opacity-70">
                      RoomNumber, SeatingCapacity, Rows, Columns
                    </p>
                  </div>
                </div>
              </div>

              {/* Classrooms Grid */}
              {classrooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classrooms.map((classroom, index) => (
                    <div
                      key={index}
                      className={`border rounded-2xl p-6 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800/50"
                          : "border-gray-200 bg-gray-50"
                      } hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {classroom.roomNumber}
                        </h3>
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                          <Building className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm opacity-70">Capacity</span>
                          <span className="font-semibold">
                            {classroom.capacity} seats
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm opacity-70">Layout</span>
                          <span className="font-semibold">
                            {classroom.rows} × {classroom.columns}
                          </span>
                        </div>
                        <div className="pt-3">
                          <div
                            className={`w-full h-2 rounded-full ${
                              darkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          >
                            <div
                              className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                              style={{ width: "85%" }}
                            ></div>
                          </div>
                          <p className="text-xs opacity-70 mt-1">
                            85% utilization rate
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    No Classroom Data
                  </h3>
                  <p className="opacity-70 mb-6">
                    Upload a CSV file or load sample data to get started
                  </p>
                  <button
                    onClick={loadSampleData}
                    className={`${buttonClasses} text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    Load Sample Data
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "seating" && (
          <div className="space-y-8">
            {seatingPlan.length > 0 ? (
              <>
                {/* Room Selection and Export */}
                <div className={`${cardClasses} border rounded-2xl p-8`}>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Seating Plan Visualization
                      </h2>
                      <p className="opacity-70">
                        Interactive 3D seating arrangement with department color
                        coding
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          value={selectedRoom}
                          onChange={(e) => setSelectedRoom(e.target.value)}
                          className={`pl-10 pr-8 py-3 rounded-xl border ${cardClasses} ${
                            darkMode ? "border-gray-600" : "border-gray-300"
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none min-w-48`}
                        >
                          <option value="">Select Room to View</option>
                          {seatingPlan.map((room) => (
                            <option
                              key={room.roomNumber}
                              value={room.roomNumber}
                            >
                              {room.roomNumber} (
                              {room.seats.filter((s) => s.student).length}/
                              {room.capacity})
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={exportToPDF}
                        disabled={!selectedRoom}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:transform-none"
                      >
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">Export PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* 3D Seating Visualization */}
                  {selectedRoom && (
                    <div className="space-y-6">
                      {seatingPlan
                        .filter((room) => room.roomNumber === selectedRoom)
                        .map((room) => (
                          <div key={room.roomNumber} className="relative">
                            {/* Room Header with 3D Effect */}
                            <div className="text-center mb-8 relative">
                              <div
                                className={`inline-block px-8 py-4 rounded-2xl ${cardClasses} border-2 ${
                                  darkMode
                                    ? "border-blue-500/50"
                                    : "border-blue-400/50"
                                } shadow-2xl`}
                              >
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                                  {room.roomNumber}
                                </h3>
                                <div className="flex items-center justify-center space-x-6 text-sm">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg"></div>
                                    <span>
                                      Occupied:{" "}
                                      {
                                        room.seats.filter((s) => s.student)
                                          .length
                                      }
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full shadow-lg"></div>
                                    <span>
                                      Available:{" "}
                                      {room.capacity -
                                        room.seats.filter((s) => s.student)
                                          .length}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
                                    <span>Total: {room.capacity}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Blackboard/Front of Room Indicator */}
                            <div className="mb-8">
                              <div
                                className={`mx-auto w-3/4 h-4 rounded-lg ${
                                  darkMode
                                    ? "bg-gradient-to-r from-gray-800 to-gray-900"
                                    : "bg-gradient-to-r from-gray-800 to-gray-900"
                                } shadow-lg border-2 ${
                                  darkMode
                                    ? "border-gray-600"
                                    : "border-gray-700"
                                } relative`}
                              >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold tracking-wider">
                                  BLACKBOARD - FRONT OF ROOM
                                </div>
                              </div>
                              <div className="text-center mt-2">
                                <div className="inline-flex items-center space-x-2 text-xs opacity-60">
                                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-current"></div>
                                  <span>Examination Supervisor Position</span>
                                </div>
                              </div>
                            </div>

                            {/* 3D Seating Grid */}
                            <div className="relative perspective-1000">
                              <div
                                className="grid gap-4 mx-auto justify-center p-8 rounded-3xl relative"
                                style={{
                                  gridTemplateColumns: `repeat(${room.columns}, minmax(0, 1fr))`,
                                  maxWidth: `${
                                    room.columns * 140 + (room.columns - 1) * 16
                                  }px`,
                                  background: darkMode
                                    ? "linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)"
                                    : "linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 0.9) 100%)",
                                  backdropFilter: "blur(10px)",
                                  boxShadow: darkMode
                                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                    : "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                                }}
                              >
                                {/* Ambient Lighting Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>

                                {/* Floor Grid Pattern */}
                                <div
                                  className="absolute inset-0 opacity-10 pointer-events-none"
                                  style={{
                                    backgroundImage: `repeating-linear-gradient(0deg, ${
                                      darkMode ? "#ffffff" : "#000000"
                                    } 0px, transparent 1px, transparent 20px, ${
                                      darkMode ? "#ffffff" : "#000000"
                                    } 21px), repeating-linear-gradient(90deg, ${
                                      darkMode ? "#ffffff" : "#000000"
                                    } 0px, transparent 1px, transparent 20px, ${
                                      darkMode ? "#ffffff" : "#000000"
                                    } 21px)`,
                                    backgroundSize: "21px 21px",
                                  }}
                                ></div>

                                {room.seats.map((seat, index) => (
                                  <RealisticSeat
                                    key={index}
                                    seat={seat}
                                    student={seat.student}
                                    seatNumber={seat.seatNumber}
                                    darkMode={darkMode}
                                    showNames={showNames}
                                    showDepartments={showDepartments}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Department Legend */}
                            <div className="mt-8">
                              <div
                                className={`${cardClasses} border rounded-2xl p-6`}
                              >
                                <h4 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                  Department Color Legend
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                  {[
                                    {
                                      dept: "AI&DS",
                                      color: "from-purple-400 to-purple-600",
                                      count: room.seats.filter(
                                        (s) => s.student?.department === "AI&DS"
                                      ).length,
                                    },
                                    {
                                      dept: "CMPN",
                                      color: "from-blue-400 to-blue-600",
                                      count: room.seats.filter(
                                        (s) => s.student?.department === "CMPN"
                                      ).length,
                                    },
                                    {
                                      dept: "IT",
                                      color: "from-green-400 to-green-600",
                                      count: room.seats.filter(
                                        (s) => s.student?.department === "IT"
                                      ).length,
                                    },
                                    {
                                      dept: "EXTC",
                                      color: "from-orange-400 to-orange-600",
                                      count: room.seats.filter(
                                        (s) => s.student?.department === "EXTC"
                                      ).length,
                                    },
                                    {
                                      dept: "ECS",
                                      color: "from-red-400 to-red-600",
                                      count: room.seats.filter(
                                        (s) => s.student?.department === "ECS"
                                      ).length,
                                    },
                                    {
                                      dept: "AURO",
                                      color: "from-yellow-400 to-yellow-600",
                                      count: room.seats.filter(
                                        (s) => s.student?.department === "AURO"
                                      ).length,
                                    },
                                  ].map((item) => (
                                    <div
                                      key={item.dept}
                                      className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                                    >
                                      <div
                                        className={`w-6 h-6 rounded-lg bg-gradient-to-br ${item.color} shadow-lg flex-shrink-0`}
                                      ></div>
                                      <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm">
                                          {item.dept}
                                        </div>
                                        <div className="text-xs opacity-70">
                                          {item.count} students
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Room Statistics */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div
                                className={`${cardClasses} border rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300`}
                              >
                                <div className="text-2xl font-bold text-green-500 mb-1">
                                  {Math.round(
                                    (room.seats.filter((s) => s.student)
                                      .length /
                                      room.capacity) *
                                      100
                                  )}
                                  %
                                </div>
                                <div className="text-sm opacity-70">
                                  Room Utilization
                                </div>
                                <div
                                  className={`mt-2 w-full h-2 rounded-full ${
                                    darkMode ? "bg-gray-700" : "bg-gray-200"
                                  }`}
                                >
                                  <div
                                    className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                      width: `${
                                        (room.seats.filter((s) => s.student)
                                          .length /
                                          room.capacity) *
                                        100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>

                              <div
                                className={`${cardClasses} border rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300`}
                              >
                                <div className="text-2xl font-bold text-blue-500 mb-1">
                                  {room.rows} × {room.columns}
                                </div>
                                <div className="text-sm opacity-70">
                                  Seating Layout
                                </div>
                                <div className="text-xs opacity-50 mt-1">
                                  Optimized for anti-cheat
                                </div>
                              </div>

                              <div
                                className={`${cardClasses} border rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300`}
                              >
                                <div className="text-2xl font-bold text-purple-500 mb-1">
                                  {
                                    new Set(
                                      room.seats
                                        .filter((s) => s.student)
                                        .map((s) => s.student.department)
                                    ).size
                                  }
                                </div>
                                <div className="text-sm opacity-70">
                                  Departments
                                </div>
                                <div className="text-xs opacity-50 mt-1">
                                  Mixed arrangement
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  <div className={`${cardClasses} border rounded-lg p-6`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Room Summary & Analytics
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm opacity-70">Live Status</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {seatingPlan.map((room) => {
                        const occupiedSeats = room.seats.filter(
                          (seat) => seat.student
                        ).length;
                        const utilizationRate = Math.round(
                          (occupiedSeats / room.capacity) * 100
                        );
                        const departmentCounts = room.seats
                          .filter((seat) => seat.student)
                          .reduce((acc, seat) => {
                            acc[seat.student.department] =
                              (acc[seat.student.department] || 0) + 1;
                            return acc;
                          }, {});

                        return (
                          <div
                            key={room.roomNumber}
                            className={`border-2 ${
                              darkMode
                                ? "border-gray-600/50"
                                : "border-gray-300/50"
                            } rounded-2xl p-6 relative overflow-hidden group hover:shadow-2xl transform hover:scale-105 transition-all duration-500`}
                            style={{
                              background: darkMode
                                ? "linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)"
                                : "linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 0.9) 100%)",
                              backdropFilter: "blur(10px)",
                            }}
                          >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                              <div
                                className="absolute inset-0"
                                style={{
                                  backgroundImage: `radial-gradient(circle at 25% 25%, ${
                                    darkMode ? "#ffffff" : "#000000"
                                  } 2px, transparent 2px)`,
                                  backgroundSize: "20px 20px",
                                }}
                              ></div>
                            </div>

                            {/* Room Header */}
                            <div className="relative mb-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                                  <span>{room.roomNumber}</span>
                                </h4>
                                <div
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    utilizationRate >= 90
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                      : utilizationRate >= 70
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  }`}
                                >
                                  {utilizationRate}% Full
                                </div>
                              </div>

                              {/* Utilization Bar */}
                              <div
                                className={`mt-3 w-full h-3 rounded-full ${
                                  darkMode ? "bg-gray-700" : "bg-gray-200"
                                } overflow-hidden`}
                              >
                                <div
                                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                    utilizationRate >= 90
                                      ? "bg-gradient-to-r from-red-400 to-red-600"
                                      : utilizationRate >= 70
                                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                      : "bg-gradient-to-r from-green-400 to-green-600"
                                  }`}
                                  style={{ width: `${utilizationRate}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Statistics Grid */}
                            <div className="space-y-4 relative">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
                                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {occupiedSeats}
                                  </div>
                                  <div className="text-xs opacity-70">
                                    Occupied
                                  </div>
                                </div>
                                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-700/30">
                                  <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
                                    {room.capacity - occupiedSeats}
                                  </div>
                                  <div className="text-xs opacity-70">
                                    Available
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
                                <div className="text-sm font-semibold mb-2 text-purple-700 dark:text-purple-300">
                                  Layout Info
                                </div>
                                <div className="text-xs space-y-1 opacity-80">
                                  <div className="flex justify-between">
                                    <span>Dimensions:</span>
                                    <span className="font-mono">
                                      {room.rows} × {room.columns}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Capacity:</span>
                                    <span className="font-mono">
                                      {room.capacity} seats
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Departments:</span>
                                    <span className="font-mono">
                                      {Object.keys(departmentCounts).length}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Department Breakdown */}
                              {Object.keys(departmentCounts).length > 0 && (
                                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30">
                                  <div className="text-sm font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
                                    Department Mix
                                  </div>
                                  <div className="space-y-2">
                                    {Object.entries(departmentCounts)
                                      .sort(([, a], [, b]) => b - a)
                                      .slice(0, 3)
                                      .map(([dept, count]) => (
                                        <div
                                          key={dept}
                                          className="flex items-center justify-between text-xs"
                                        >
                                          <div className="flex items-center space-x-2">
                                            <div
                                              className={`w-2 h-2 rounded-full ${
                                                dept === "AI&DS"
                                                  ? "bg-purple-500"
                                                  : dept === "CMPN"
                                                  ? "bg-blue-500"
                                                  : dept === "IT"
                                                  ? "bg-green-500"
                                                  : dept === "EXTC"
                                                  ? "bg-orange-500"
                                                  : dept === "ECS"
                                                  ? "bg-red-500"
                                                  : "bg-yellow-500"
                                              }`}
                                            ></div>
                                            <span>{dept}</span>
                                          </div>
                                          <span className="font-mono font-semibold">
                                            {count}
                                          </span>
                                        </div>
                                      ))}
                                    {Object.keys(departmentCounts).length >
                                      3 && (
                                      <div className="text-xs opacity-60 text-center pt-1">
                                        +
                                        {Object.keys(departmentCounts).length -
                                          3}{" "}
                                        more departments
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:via-purple-400/5 group-hover:to-blue-400/5 transition-all duration-500 pointer-events-none"></div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Overall Statistics */}
                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
                      <h4 className="text-lg font-semibold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Overall Examination Statistics
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                            {seatingPlan.reduce(
                              (sum, room) =>
                                sum +
                                room.seats.filter((s) => s.student).length,
                              0
                            )}
                          </div>
                          <div className="text-sm opacity-70">
                            Total Students Seated
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                            {seatingPlan.reduce(
                              (sum, room) => sum + room.capacity,
                              0
                            )}
                          </div>
                          <div className="text-sm opacity-70">
                            Total Seat Capacity
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                            {Math.round(
                              (seatingPlan.reduce(
                                (sum, room) =>
                                  sum +
                                  room.seats.filter((s) => s.student).length,
                                0
                              ) /
                                seatingPlan.reduce(
                                  (sum, room) => sum + room.capacity,
                                  0
                                )) *
                                100
                            )}
                            %
                          </div>
                          <div className="text-sm opacity-70">
                            Overall Utilization
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                            {seatingPlan.length}
                          </div>
                          <div className="text-sm opacity-70">Active Rooms</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                className={`${cardClasses} border-2 border-dashed ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                } rounded-3xl p-16 text-center relative overflow-hidden`}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 animate-pulse"></div>

                {/* Floating Icons Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div
                    className="absolute top-1/4 left-1/4 w-16 h-16 text-blue-400/20 animate-bounce"
                    style={{ animationDelay: "0s" }}
                  >
                    <Eye className="w-16 h-16" />
                  </div>
                  <div
                    className="absolute top-1/3 right-1/4 w-12 h-12 text-purple-400/20 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <Users className="w-12 h-12" />
                  </div>
                  <div
                    className="absolute bottom-1/3 left-1/3 w-14 h-14 text-indigo-400/20 animate-bounce"
                    style={{ animationDelay: "1s" }}
                  >
                    <Building className="w-14 h-14" />
                  </div>
                </div>

                <div className="relative z-10">
                  {/* Main Icon */}
                  <div className="relative mb-8">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-ping"></div>
                      <Eye className="w-16 h-16 text-blue-500 dark:text-blue-400 relative z-10" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      No Seating Plan Generated
                    </h3>
                    <p className="text-lg opacity-70 max-w-md mx-auto leading-relaxed">
                      Create your first seating arrangement by uploading student
                      and classroom data, then generate an optimized plan.
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 transform hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                        Upload Data
                      </h4>
                      <p className="text-sm opacity-70">
                        Import student and classroom CSV files
                      </p>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 transform hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        Configure
                      </h4>
                      <p className="text-sm opacity-70">
                        Set anti-cheat and display preferences
                      </p>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 transform hover:scale-105 transition-all duration-300">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                        <Grid className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                        Generate
                      </h4>
                      <p className="text-sm opacity-70">
                        Create optimized seating arrangements
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setActiveTab("dashboard")}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative flex items-center space-x-3">
                        <Settings className="w-5 h-5" />
                        <span>Go to Dashboard</span>
                      </div>
                    </button>

                    <button
                      onClick={loadSampleData}
                      className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative flex items-center space-x-3">
                        <Plus className="w-5 h-5" />
                        <span>Load Sample Data</span>
                      </div>
                    </button>
                  </div>

                  {/* Help Text */}
                  <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center justify-center space-x-2 text-amber-700 dark:text-amber-300">
                      <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">!</span>
                      </div>
                      <p className="text-sm font-medium">
                        Need help? Download sample CSV templates from the
                        Dashboard to get started quickly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamArrange;
