const prisma = require("../config/prisma");
require("dotenv").config();
const express = require ("express")
const router = express.Router();

router.get("/profile", );
router.get("/idea", );
router.get ("/weeklyReport", )
router.get ("/notification", )

exports.profile = async (req, res) => {
	const {semester, email} = req.user;
	// console.log (semester, email);
	try{
		const user = await prisma.student.findFirst({
			where: {
				semester,
				email
			}
		});
		if (!user) {
			res.json ({"message" : "failed"});
			return;
		}
		console.log (user);
		res.json ({message : "Success", "data" : user})
	}
	catch(e){
		console.log (e);
		res.json ({"message" : "Failed", "data" : e});
	}

	return

	res.json({"message" : "hey ya from server"})
};
exports.getAll = async (req, res) => {
	try{
		const semester = req.user.semester;
		// console.log ("semester is :(" ,semester);
		const data = await prisma.student.findMany({
			where : {
				semester : semester,
				teamId : null
			},
			select : {
				id : true,
				name : true,
				prn : true	
			}
		});
		// console.log (data);
		return res.json ({message : "success", data})
	}
	catch(error){
		// console.log(error);
		res.json ({message : "fail", error});
	}
}

async function addTeamIDForOtherMembers(team, teamId, semester) {
	const id = teamId;
	for (let i = 0; i < team.length; i++) {
	  await prisma.student.update({
		where: { semester: semester, prn: team[i].label },
		data: { teamId: id },
	  });
	}
  }
  
  exports.createTeam = async (req, res) => {
	try {
	  const data = req.body.team;
	  const name = req.body.teamName;
	  let semester = req.user.semester;
  
	//   console.log (`create team \n : ${data}` );

	  const user = await prisma.team.create({ data: { semester, name } });
	  const teamId = user.id;
		console.log (`teamId is ${teamId}`);
	  await addTeamIDForOtherMembers(data, teamId, semester); //data is array of students
  
	  return res.status(201).json({
		status: "success",
		message: "Team created successfully",
	  });
	} catch (e) {
	  console.log(e);
	}
  };


  // team details 

  exports.getTeamDetails = async (req, res) => {
	// join => team and student teamId on id => return name and prn
	const teamId = parseInt(req.params.id);
	const {semester, email} = req.user;
	console.log (teamId)
	try{
		const teams = await prisma.student.findMany({
			where : {
				semester : semester,
				teamId : teamId
			}
		});
		console.log (`team details : ${JSON.stringify(teams, null, 2)}`);
		res.json ({
			message : "success",
			data : teams
		});
	}
	catch (e){
		console.log (e);
		res.json ({
			message : "fail",
			data : "Refresh error fetching data"
		})
	}
  }

  // update team
