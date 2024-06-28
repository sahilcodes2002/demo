import React, { useEffect, useState, useRef } from "react";
import { Users } from "../components/Users";
import { todos } from "../store/atoms/todos";
import { useRecoilState } from "recoil";
import { TodoCard } from "../components/TodoCard";
import { allitems } from "../store/atoms/allcards";
import { Cardcreate } from "../components/Cardcreate";
import { refresh } from "../store/atoms/refresh";
import axios from "axios";
import { format } from "date-fns";

export function Dashboard() {
  const [todo, setTodos] = useRecoilState(todos);
  const [toshow, setShow] = useRecoilState(allitems);
  const [fresh, setFresh] = useRecoilState(refresh);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date from dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Ref for dropdown


  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://honoprisma.hamdidcarel.workers.dev/gettodo", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setTodos(response.data.Message.todo);
      } catch (error) {
        console.error("Error fetching todos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [fresh]);

  // Group todos by date
  
  const groupedTodos = {};
  todo.forEach((td) => {
    const date = format(new Date(td.created_at), 'MM/dd/yyyy');
    if (!groupedTodos[date]) {
      groupedTodos[date] = [];
    }
    groupedTodos[date].push(td);
  });

  // Sort groups by date (descending)
  const sortedDates = Object.keys(groupedTodos).sort((a, b) => new Date(b) - new Date(a));

  // Sort todos within each date group by time (descending)
  sortedDates.forEach((date) => {
    groupedTodos[date].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  });

  // Filter todos based on search query and selected date
  const filteredGroupedTodos = {};
  Object.keys(groupedTodos).forEach((date) => {
    const filteredTodos = groupedTodos[date].filter((td) =>
      td.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredTodos.length > 0) {
      if (!selectedDate || date === selectedDate) {
        filteredGroupedTodos[date] = filteredTodos;
      }
    }
  });
  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Users />
      <div className={`mt-32 md:mt-32 lg:ml-64 scroll-auto ${toshow ? 'bg-white' : 'hidden'}`}>
        <Cardcreate />
      </div>
      <div className={`mt-32 md:mt-32 scroll-auto ${toshow ? 'hidden' : 'bg-white'}`}>
        <div className="lg:ml-64 p-4">
          <div className="mb-4 flex items-center">
          <input
              type="text"
              placeholder="Search by title or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className=" inline-block text-left mr-2" ref={dropdownRef}>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="options-menu"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg class="h-8 w-8 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />  <line x1="16" y1="2" x2="16" y2="6" />  <line x1="8" y1="2" x2="8" y2="6" />  <line x1="3" y1="10" x2="21" y2="10" /></svg>
              </button>
              {dropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-32 max-h-60 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className=" py-1" role="none">
                    <button
                      onClick={() => {setSelectedDate("")
                        setDropdownOpen(false);}
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      All Dates
                    </button>
                    {sortedDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          </div>
          
          {Object.keys(filteredGroupedTodos).length === sortedDates.length ? (
  sortedDates.map((date) => (
    <div key={date} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{date}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredGroupedTodos[date]?.map((td) => (
          <TodoCard key={td.id} todo={td} />
        ))}
      </div>
    </div>
  ))
) : (
  Object.keys(filteredGroupedTodos).map((date) => (
    <div key={date} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{date}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredGroupedTodos[date].map((td) => (
          <TodoCard key={td.id} todo={td} />
        ))}
      </div>
    </div>
  ))
)}

        </div>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </div>
  );
}
