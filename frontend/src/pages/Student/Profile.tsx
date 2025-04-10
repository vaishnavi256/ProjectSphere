import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateTeam from "../../createdComp/CreateTeam";
import { get } from "http";

const Profile = () => {
    // function to request backend and get info

    /*
    studentD info () => name, prn, current sem , batch, Guide 
    team info (semester, teamId) (can get teamId) => names 
    project details => (prn) => [{title , description, github link}]
    */

    const [student, setStudent] = useState({
        "Name" : "zy",
        "PRN" : "",
        "Batch" : 0,
        "Guide" : 0,
        "Semester" : 1,
        "teamId" : 0
    })

    const [students, setStudents] = useState([{
        name : "vaish",
        prn : 0
    }])

    const [team, setTeam] = useState ([{
        name : "",
        prn : ""
    }]);

    const [prevProjects, setPrevProjects] = useState ([{
        "Semester" : 1,
        "Title" : "xyz",
        "Description" : "xyz",
        "Github" : "xyz.com"
    }, {
        "Semester" : 1,
        "Title" : "xyz",
        "Description" : "xyz",
        "Github" : "xyz.com"
    }])
    const navigate = useNavigate();

    async function getDetails() {
        try {
            const token = localStorage.getItem("token");
            await fetch("http://localhost:3000/student/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(resp => {
                if (!resp.ok) throw new Error("Failed to fetch student data");
                return resp.json();
            })
            .then(data => {
                // console.log (data);
                setStudent(() => {
                    console.log (data.data);
                    const updatedStudent = {
                        Name: data.data.name,
                        PRN: data.data.prn ,
                        Batch: data.data.batch || 0,
                        Guide: data.data.guide?.name || 0,
                        Semester: data.data.semester,   
                        teamId: data.data.teamId || 0
                    };
                    return updatedStudent;
                });
            })
            .catch(error => console.error("Error fetching details:", error));           
        } catch (error) {
            console.error("Error fetching details:", error);
        }
        
    }

    async function getTeamDetails() {
        // while (student.teamId == 0)
        console.log (student.teamId);

        const resp = await fetch (`http://localhost:3000/student/team/${student.teamId}`, {
            method: "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (resp.ok) {
            const data = await resp.json();
            console.log ("Team details : ");
            console.log (data);
            setTeam ([]);
            for (let i = 0; i < data.data.length; i++){
                setTeam (prev => [...prev, {name : data.data[i].name, prn : data.data[i].prn}]);
            }
        }
        else{
            console.error ("Failed to fetch team data");
        }
    }

    useEffect(() => {
        getDetails();
    }, []);

    useEffect (() => {
        getTeamDetails();
    }, [student.teamId])

    function directToProjectDetails({ index } : any) {
        const info = { semester: prevProjects[index].Semester, prn : student.teamId };
        navigate("/student-dashboard/project-details", { state: info });
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
            {/* Profile Information */}
            <div className="flex items-center space-x-4">
                <div>
                    <h2 className="text-xl font-bold">Name : {student.Name}</h2>
                    <p className="text-gray-600">PRN: {student.PRN}</p>
                    <p className="text-gray-600">Batch: {student.Batch}</p>
                    <p className="text-gray-600">Guide: {student.Guide}</p>
                    <p className="text-gray-600">Team: {student.teamId}</p>
                    <p className="text-blue-500 font-semibold">Semester: {student.Semester}</p>
                </div>
            </div>

            {student.teamId == 0 && <CreateTeam/>
            }

            {/* Team details */}
            { student.teamId != 0 &&
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow">
                    {/* <button></button> */}
                    // can create updation team
                    <h3 className="text-lg font-semibold mb-2">Team Details</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {team.map((member, index) => (
                            <li key={index}>{member.name} {member.prn} </li>  
                        ))}
                    </ul>
                </div>
            }

            {/* Previous Projects Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Previous Projects</h3>
                {
                    prevProjects.map ((prevProject, index) => {
                        return ( 
                            <div key={index} onClick={() => directToProjectDetails({index})} className="mt-6 p-4 cursor-pointer bg-blue-50 rounded-lg shadow">
                                <h1 className="text-md"> Semester : {prevProject.Semester}</h1>
                                <h2 className="text-md">Title : {prevProject.Title}</h2>
                                <p>Description : {prevProject.Description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Profile;
