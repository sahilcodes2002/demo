import React, { useEffect, useState } from "react";
import { Users } from "../components/Users";
import { todos } from "../store/atoms/todos";
import { useRecoilState, useRecoilValue } from "recoil";
import { TodoCard } from "../components/TodoCard";
import { allitems } from "../store/atoms/allcards";
import { Cardcreate } from "../components/Cardcreate";
import { refresh } from "../store/atoms/refresh";
import axios from "axios";

export function Dashboard() {
  const [todo, setTodos] = useRecoilState(todos);
  const [toshow, setShow] = useRecoilState(allitems);
  const [fresh, setFresh] = useRecoilState(refresh);
  const [loading, setLoading] = useState(false);
  if(todo.size==0){
    setShow(true);
  }
  useEffect(() => {
    const fetchTodos = async () => {
        setLoading(true)
      try {
        const response = await axios.get("https://honoprisma.hamdidcarel.workers.dev/gettodo", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          }
        });
        setTodos(response.data.Message.todo); 
      } catch (error) {
        console.error("Error fetching todos", error);
      }finally{
        setLoading(false);
      }
    };

    fetchTodos();
  }, [fresh]);

  // Group todos by date
  const groupedTodos = {};
  todo.forEach((td) => {
    const date = new Date(td.created_at).toLocaleDateString();
    if (!groupedTodos[date]) {
      groupedTodos[date] = [];
    }
    groupedTodos[date].push(td);
  });

  // Sort groups by date (descending)
  const sortedDates = Object.keys(groupedTodos).sort((a, b) => new Date(b) - new Date(a));

  // Sort todos within each date group by time (descending)
  sortedDates.forEach(date => {
    groupedTodos[date].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  });

  return (
    <div>
      <Users />
      <div className={`mt-32 md:mt-32 lg:ml-64 scroll-auto ${toshow ? 'bg-white' : 'hidden'}`}>
        <Cardcreate />
      </div>
      <div className={`mt-32 md:mt-32 scroll-auto ${toshow ? 'hidden' : 'bg-white'}`}>
        <div className={`lg:ml-64 p-4`}>
          {sortedDates.map((date) => (
            <div key={date} className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{date}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {groupedTodos[date].map((td) => (
                  <TodoCard key={td.id} todo={td} />
                ))}
              </div>
            </div>
          ))}
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
