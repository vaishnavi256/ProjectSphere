import React, { useEffect, useState } from 'react'


// model Idea {
//     id     Int  @id @default(autoincrement())
//     teamId Int
//     topic String
//     comment String
//     approved Int // 0 -> pending, 1 -> approved, 2 -> rejected
//   }
export default function Idea() {
    const [idea, setIdea] = useState({
        "topic" : "",
        "approved" : 0, // 0 -> pending, 1 -> approved, 2 -> rejected
        "teamId" : 0
    });

    const [teamId, setTeamId] = useState ("");

    async function getTeamId() {
        const resp = await fetch ('http://localhost:3000/student/profile', {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            } 
        })
        
        const data = await resp.json();
        if (!resp.ok){
            alert(data.data)
        }
        else {
            console.log (data.data);
            setIdea ((prev) => ({ ...prev, teamId: data.data.teamId }))
        }
        
    }

    async function handleSubmit() {
        console.log (idea.teamId)
        const resp = await fetch ("http://localhost:3000/student/idea", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(idea)
        })
        const data = await resp.json();
        if (!resp.ok){
            alert (data.message);
        }
        else{
            alert ("Idea submitted successfully!");
        }
    }

    useEffect (() => {
        getTeamId();
    }, [])

  return (
    
    <div className='bg-white shadow-md p-6 rounded-lg'>
        <div className='text-md'>Add your idea for review</div>
        <input type="text" className='border-2 border-blue-200 rounded-md p-2 mt-2 w-full' placeholder='Enter your idea' onChange={(e) => setIdea({...idea, topic: e.target.value})}/>
        <button className='p-2 bg-blue-500 text-white mt-2 rounded-md' onClick={handleSubmit}>Submit </button>
    </div>
  )
}
