import logo from "../pics/iiitblogo.png";
import "../App.css";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdDrop from "./AdDrop"


const Register = () => {
	const navigate = useNavigate();
    const [cityid, setCityid] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
        console.log(cityid);

		fetch(`http://172.18.0.20:8000/api/auth/user/signup`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({            
				username: formData.get("userId"),
				password: formData.get("password"),
                locationId: cityid,
				email: formData.get("email")
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.message);
				if (data.message === "User registered successfully!") {
					navigate("/login");
				}
				else{
					console.log("Error while registering!!!")
				}
			})
			.catch((err) => err);
	};

	return (
		<>
			<div className="container max-w-2xl ring-1 shadow-xl ring-indigo-50 rounded-md place-content-center my-16 mx-auto">
				<div className="min-h-full flex items-center justify-center py-8 px-2 sm:px-3 lg:px-3">
					<div className="max-w-md w-full space-y-4">
						<div>
							<img className="mx-auto h-16 w-auto" src={logo} alt="Workflow" />
							<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Register an account
							</h2>
						</div>
						<form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
							<input type="hidden" name="remember" defaultValue="true" />
							<div className="shadow-sm -space-y-px overflow-hidden">
                                <h4 className="my-2">
                                    Username
                                </h4>
								<div>
									<label htmlFor="userId-address" className="sr-only">
										Username
									</label>
									<input
										id="userId-address"
										name="userId"
										type="userId"
										autoComplete="userId"
										required
										className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Username"
									/>
								</div>
                            </div>
							<div className="shadow-sm -space-y-px overflow-hidden">
                                <h4 className="my-2">
                                    Email Address
                                </h4>
								<div>
									<label htmlFor="userId-address" className="sr-only">
										Email Address
									</label>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Email Address"
									/>
								</div>
                            </div>
                            <div className="shadow-sm -space-y-px overflow-hidden">
                                <h4 className="my-2">
                                    Password
                                </h4>
								<div>
									<label htmlFor="password" className="sr-only">
										Password
									</label>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Password"
									/>
								</div>

                                <AdDrop cityid={cityid} setCityid={setCityid}></AdDrop>
							</div>

							<div className="pb-6 pt-8">
								<button
									type="submit"
									className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									<span className="absolute left-0 inset-y-0 flex items-center pl-3">
										<LockClosedIcon
											className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
											aria-hidden="true"
										/>
									</span>
									Register Now!
								</button>
							</div>


						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
