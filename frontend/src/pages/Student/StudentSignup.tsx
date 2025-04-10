import { useState } from "react";
import { FaUser, FaEnvelope, FaLock,FaChild } from "react-icons/fa";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    prn : "",
    semester : 0,
    password: "",
    confirmPassword : "",
  });

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  } 

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    if (form.password !== form.confirmPassword) {
      alert("Password and confirm password don't match");
      return;
    }
  
    try {
      const resp = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          prn: form.prn,
          semester: Number(form.semester),
          password: form.password,
        }),
      });
  
      const data = await resp.json();
  
      if (!resp.ok) {
        const errorMsg = data?.message || data?.error || "Signup failed. Please try again.";
        alert(errorMsg);
        return;
      }
  
      if (!data.token) {
        alert("Signup succeeded, but no token received.");
        return;
      }
  
      localStorage.setItem("token", data.token);
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  }

  function handleChange (e: ChangeEvent){
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name] : value,
    }));
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200">
      <Card className="w-full max-w-4xl p-6 flex shadow-lg bg-white rounded-lg">
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Signup as student</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border rounded px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border-none focus:ring-0"
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border-none focus:ring-0"
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaChild className="text-gray-400 mr-2" />
              <Input
                type="text"
                name="prn"
                placeholder="Your PRN"
                value={form.prn}
                onChange={handleChange}
                required
                className="w-full border-none focus:ring-0"
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaChild className="text-gray-400 mr-2" />
              <Input
                type="text"
                name="semester"
                placeholder="Semester"
                value={form.semester}
                onChange={handleChange}
                required
                className="w-full border-none focus:ring-0"
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-none focus:ring-0"
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border-none focus:ring-0"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              Signup
            </Button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?
             <Link to="/login" className="text-blue-600 hover:underline"> Login</Link>
          </p>
        </div>
        <div className="w-1/2 hidden md:flex justify-center items-center">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/project-management-1884978-1597916.png" alt="Illustration" className="max-w-xs" />
        </div>
      </Card>
    </div>
  );
}
