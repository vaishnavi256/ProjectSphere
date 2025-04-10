import React, { useEffect, useState } from 'react'
import Select from 'react-select'
interface student {
    value : string,
    label : string
}

export default function CreateTeam() {
    const [teamName, setTeamName] = useState("");
    const [students, setStudents] = useState<student[]>([])
    const [selectedOptions, setSelectedOptions] = useState();
    const [error, setError] = useState("");

    useEffect (() => {
        getAllStudents();
    }, [])

    async function getAllStudents() {
        console.log ("All student data");
        const token = localStorage.getItem("token");
        await fetch("http://localhost:3000/student/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(resp => {
            if (!resp.ok) {
                setError ("Failed to fetch student data");
                throw new Error("Failed to fetch student data");
            }
            return resp.json();
        })
        .then(data => {
            // console.log (data);
            setStudents([]);
            for (let i = 0; i < data.data.length; i++) {
                let d = data.data[i];
                setStudents ((prev) => {
                    return (
                        [...prev, {
                            "value" : d.name + d.prn,
                            "label" : d.prn 
                        }]
                    )
                })
                console.log (students);
            }
            // setStudents(data.data);
        })
        .catch((error) => setError(`Error fetching details + ${error}`));           
    }   

    async function handleTeamCreation(){
        console.log ("team creation");
        console.log (selectedOptions);
        const token = localStorage.getItem("token");
        await fetch("http://localhost:3000/student/createTeam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                "team": selectedOptions,
                "teamName" : teamName
            })
        }).then(resp => {
            console.log (resp);
        }).then(data => {
            console.log (data);
        })
    }

    function handleSelect(data : any) {
        console.log ("select options");
        console.log (data);
        setSelectedOptions(data);
        console.log (selectedOptions);
    }

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow">
        <div>
            <h2>Select your team</h2>
            <div className="dropdown-container">
                <Select
                options={students}
                placeholder="Select color"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
                />
            </div>
        </div>
        <div>
            <input className='mt-1 border rounded-md p-1'  placeholder='Team Name' type="text" onChange={(e) => setTeamName(e.target.value)} />
        </div>
        <button  onClick={handleTeamCreation} className='bg-blue-600 text-white p-1 mt-1 rounded-'>Submit</button>
    </div>
  )
}
function data(value: void): void | PromiseLike<void> {
    throw new Error('Function not implemented.');
}

