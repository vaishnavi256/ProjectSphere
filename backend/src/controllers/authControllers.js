const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    let { name, email, password, prn, semester} = req.body;
    console.log (name, email, password, prn, semester);
    console.log (typeof semester);
    semester = parseInt(semester);

    try {
        console.log (name, email, password, prn, semester);
        const existingUser = await prisma.student.findFirst({ where: { email } });
        console.log (existingUser);
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log (hashedPassword);
        await prisma.student.create({
            data: { name, email, password: hashedPassword, prn, semester },
        });     

        const token = jwt.sign({ semester: semester, email: email }, SECRET_KEY);

        res.json({ message: "registered successful", token });
    } catch (error) {
        console.log (error);
        res.status(500).json({ error: error.message });
    }
};


// model Student {
//     id         Int      @id @default(autoincrement())
//     email   String   @unique
//     password   String
//     name  String
//     prn   Int           @unique
//     teamId Int    @default(0)
//     guideId Int   @default(0)
//     semester Int  @default(0)
//   }

exports.login = async (req, res) => {
    const { email, password, semester } = req.body;

    try {
        const user = await prisma.student.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ message: "fail", error : "Account does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "fail", error : "Invalid email or password"});

        if (user.semester != semester) {
            await prisma.student.update({
                where: { email },  
                data: { semester},
            });
        }

        const token = jwt.sign({ semester: user.semester, email: user.email }, SECRET_KEY);
        res.json({ message: "success", token, semester, email });

    } catch (error) {
        res.status(500).json({message : "fail", error: "Check email or password" });
    }
};

