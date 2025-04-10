import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AllProjects() {
    const [allProjects, setAllProjects] = useState ([{
        "title" : "adfghj",
        "description" : "fghjk lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur mollitia libero reprehenderit laborum impedit alias dignissimos ut! Tenetur id ipsam alias hic odit culpa error architecto. Dignissimos, quibusdam reiciendis.",
        "sem" : 1,
        "teamId" : "fghj",
    }, {
        "title" : "adfghj",
        "description" : "fghjk lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur mollitia libero reprehenderit laborum impedit alias dignissimos ut! Tenetur id ipsam alias hic odit culpa error architecto. Dignissimos, quibusdam reiciendis.",
        "sem" : 1,
        "teamId" : "dfghjx",
    }])
    // sem, teamId 

    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchAllProjects() {
            // 
        }
        fetchAllProjects();
    }, [])

    

    function directToProjectDetails({index}: {index : number}) {
        console.log (index) 
        const info = { semester: allProjects[index].sem, teamId : allProjects[index].teamId };
        navigate("/student-dashboard/project-details", { state: info });
    }

  return (
      <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-blue-700">All Projects</h2>
      {
        allProjects.map ((project, index) => {
            return (
                <div key={index} onClick={() => directToProjectDetails({index})} className='m-2 p-2 bg-blue-50 shadow rounded-sm cursor-pointer'>
                    <h1 className='text-lg font-medium'>{project.title} {index}</h1>
                    <p>{project.description}</p>
                </div>
            )
        })
      }
    </div>
  )
}