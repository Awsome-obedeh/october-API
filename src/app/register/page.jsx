"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Loginform() {
  const router=useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [err,setErr]=useState('')
  const [loading, setLoading]=useState(false)
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = emailRegex.test(email);
  const passwordChecks = {
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const passwordIsValid = Object.values(passwordChecks).every(Boolean);

  const formIsValid = emailIsValid && passwordIsValid;

  async function handleSubmit(e) {
    setLoading(true)
    // prevent default submit
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!formIsValid) return;

    console.log("Registration form submitted:", { email, password });

    setSubmitted(true);
    setEmail("");
    setPassword("");
    setTouched({ name: false, email: false, password: false });

    // submit to API
    const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    // convert the API response back to object
    const data=await res.json()
    

    console.log(data)
    console.log(res)

    if(res.status===200){
      setLoading(false)
      // route to login page
      router.replace('/login')
    }

    else if(res.status===400 || res.status==500){
      setErr("Something went wrong")
      loading(false)
    }
  }

 return (

  <div>
      {submitted ? (
        <div className="mb-4 p-4 rounded bg-green-50 text-green-800 border border-green-100">
          Login successful.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4  flex flex-col gap-4 ">
          {" "}
          <label className="block text-sm font-bold mb-1" htmlFor="email">
            Email{" "}
          </label>{" "}
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            type="email"
            placeholder="you@example.com"
            className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
              touched.email && !emailIsValid
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:ring-indigo-200"
            }`}
            aria-invalid={touched.email && !emailIsValid}
            aria-describedby="email-error"
          />
          {touched.email && !emailIsValid ? (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              Enter a valid email address.
            </p>
          ) : null}


          <div className="mb-4">
            {" "}
            <label
              className="block text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password{" "}
            </label>{" "}
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              type="password"
              placeholder="Enter your password"
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring ${
                touched.password && !passwordIsValid
                  ? "border-red-400 focus:ring-red-200"
                  : "border-gray-200 focus:ring-indigo-200"
              }`}
              aria-invalid={touched.password && !passwordIsValid}
              aria-describedby="password-requirements"
            />
            {touched.password && !passwordIsValid ? (
              <p className="mt-2 text-sm text-red-600">
                Password does not meet all requirements.
              </p>
            ) : null}
          </div>
          <div className="text-sm text-gray-600 underline">
            <button
              type="submit"
              disabled={!formIsValid}
              className={`rounded-md px-4 py-2 text-white font-medium w-full mt-5 ${
                formIsValid
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-500 cursor-not-allowed text-black"
              }`}
            >
              { loading ? (<span>Please wait....</span>) : (<span>Login</span>)}
              
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}