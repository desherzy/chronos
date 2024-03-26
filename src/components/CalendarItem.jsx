import React, { useState } from 'react';
import '../styles/tailwind.css';
import { Calendar, FlipVertical2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCalendarStore from '../store/calendar';


function CalendarItem({ calendar }) {     
    const navigate = useNavigate();  
    const { deleteCalendar, leaveCalendar } = useCalendarStore();
   // const [deleteView, setDeleteView] = useState(true);
   const shouldRenderDeleteButton = calendar.name !== "Main" || calendar.description !== "Default calendar";
    
    const handleVisitClick = () => {
        navigate(`/calendars/${calendar.id}`);
      };

      const handleDeleteClick = async () => {
        if (calendar.permission === "creator" || calendar.permission === 1) {
            await deleteCalendar(calendar.id);
        } else {
            await leaveCalendar(calendar.id);
        }
    };


    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 w-98 m-2 relative" 
          style={{ background: `linear-gradient(to bottom, ${calendar.color} 25%, transparent 25%)` }}>

        <div className="flex items-center justify-between">
            <div className="flex items-center mb-7">
                <div className="rounded-full bg-gray-300 p-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <h3 className="ml-2 text-sm font-medium text-gray-800">{calendar.name}</h3>
            </div>
            <FlipVertical2Icon className="h-4 w-4 text-gray-400" />
        </div>
        
        <div className="mt-3">
            <p>{calendar.description}</p>
            <p className="text-sm font-semibold text-gray-800 mt-3" >Rights: {calendar.permission}</p>
            <p className="text-xs text-gray-500 mt-2">Created at: {new Date(calendar.createdAt).toLocaleDateString()}, {new Date(calendar.createdAt).toLocaleTimeString()}</p>
        </div>
        <div className="mt-4 flex justify-end ">
            <button className="text-xs font-semibold text-blue-600 bg-blue-100 py-1 px-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-200 hover:text-blue-700" onClick={handleVisitClick}>
                Show Calendar
            </button>

            {shouldRenderDeleteButton && (
          <button
            className="text-xs font-semibold text-red-600 bg-red-100 py-1 px-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-200 hover:text-red-700 ml-4"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        )}

        </div>
    </div>
    );
}

export default CalendarItem;