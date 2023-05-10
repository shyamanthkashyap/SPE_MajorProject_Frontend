import logo from "./pics/iiitblogo.png";
import "./App.css";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";

function App() {
    
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		fetch("http://localhost:8000/api/auth/user/signin", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: formData.get("username"),
				password: formData.get("password"),
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				console.log(data.status)
				if (data.status === 401 || data.status === 404 || data.status === 500 || data.status === 400) {
					console.log("Error while logging in")
				}
				else{
					localStorage.setItem('user', JSON.stringify(data));
					navigate("/home");
				}
			})
			.catch((err) => err);
	};

	return (
		<>
			<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<img className="mx-auto h-16 w-auto" src={logo} alt="Workflow" />
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-700">
							<Link
								to={{ pathname: `/Register` }}
								className="font-medium text-indigo-700 hover:text-indigo-500"
							>
								Don't have an account? Sign up
							</Link>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="userId-address" className="sr-only">
									Username
								</label>
								<input
									id="username"
									name="username"
									type="username"
									autoComplete="username"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Username"
								/>
							</div>
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
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>

						<div>
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
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default App;
