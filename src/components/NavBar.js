import React, { useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
	MenuIcon,
	XIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import logo from "../pics/iiitblogo1.png";
import avator from "../pics/avatar.png";
import CategoryService from "../service/CategoryService";
import UserService from "../service/UserService";

const navigation = [
	{ name: "Dashboard", href: "/home", current: false },
	{ name: "My Questions", href: "/myQuestion", current: false },
	{ name: "My Answers", href: "/myAnswer", current: false }
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
const NavBar = () => {
	const navigate = useNavigate();
	const [res, setRes] = useState([]);
	const [text, setText] = useState("");
	const [suggest, setSuggest] = useState([]);

	const node = useRef();
	const [user, showText] = useState(false);

	const [maincategory, setMaincategory] = useState([]);
	const [maincategoryid, setMaincategoryId] = useState("");
	const [subcategory, setSubCategory] = useState([]);
	const [subcategoryid, setSubCategoryId] = useState("");

	const setShowText = (user) => {
		return showText(!user);
	};

	const clickOutside = (e) => {
		if (node.current.contains(e.target)) {
			// inside click
			console.log("clicked inside");
			return;
		}
		console.log("clicked outside scope");
		showText(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", clickOutside);
		return () => {
			document.removeEventListener("mousedown", clickOutside);
		};
	}, [user]);

	console.log(res);

	const onChangeHandler = (text) => {
		setText(text);
	};

	useEffect(() => {
		const getCategory = async () => {
			try {
				const getres = await CategoryService.listMainCategory();
				console.log("@@@@@@@@"+getres.data.data);
				setMaincategory(await getres.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getCategory();
	}, []);

	const handlecategory = (event) => {
		const getmaincategoryid = event.target.value;
		setMaincategoryId(getmaincategoryid);
		event.preventDefault();
	};

	useEffect(() => {
		const getsubcategory = async () => {
			try {
				const getst = await CategoryService.listSubCategory(maincategoryid);
				console.log(getst.data.data);
				setSubCategory(await getst.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getsubcategory();
	}, [maincategoryid]);

	const handlesubcategory = (event) => {
		const getsubcategoryid = event.target.value;
		setSubCategoryId(getsubcategoryid);
		event.preventDefault();
	};

	return (
		<Disclosure as="nav" className="bg-indigo-200">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-indigo-700 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<img
										className="block lg:hidden h-8 w-auto"
										src={logo}
										alt=""
									/>
									<img
										className="hidden lg:block h-8 w-auto"
										src={logo}
										alt=""
									/>
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.href}
												className={classNames(
													item.current
														? "bg-indigo-700 text-white"
														: "text-indigo-500 hover:bg-indigo-700 hover:text-white",
													"px-3 py-2 rounded-md text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>

								<Menu as="div" className="ml-3 relative">
									<div>
										<Menu.Button className=" bg-indigo-200 inline-flex items-center justify-center rounded-md text-indigo-700 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2">
											<span className="text-indigo-500 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
												Category
											</span>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											{maincategory.map((item) => (
												<Menu.Item>
													{({ active }) => (
														<Link
															key={item.categoryId}
															target="_blank"
															to={{
																pathname: `/listCategoryQuestion/${item.categoryId}`,
															}}
															className={classNames(
																active
																	? "bg-indigo-100 hover:ring-2 hover:ring-pink-300 rounded-md ring-inset "
																	: "",
																"block px-4 py-2 text-sm text-indigo-700 "
															)}
														>
															{item.categoryName}
														</Link>
													)}
												</Menu.Item>
											))}
										</Menu.Items>
									</Transition>
								</Menu>
								
							</div>

							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

								<Menu as="div" className="ml-3 relative">
									<div>
										<Menu.Button className="bg-indigo-700 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
											<span className="sr-only">Open user menu</span>
											<img
												className="h-8 w-8 rounded-full"
												src={avator}
												alt="YC"
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<Link
														to={{pathname: `/profile`}}
														className={classNames(
															active ? "bg-indigo-100" : "",
															"block px-4 py-2 text-sm text-indigo-700"
														)}
													>
														My Profile
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<Link
                                                        onClick={() => UserService.signOut()}
														to={{ pathname: `/` }}
														className={classNames(
															active ? "bg-indigo-100" : "",
															"block px-4 py-2 text-sm text-indigo-700"
														)}
													>
														Sign out
													</Link>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-indigo-700 text-white"
											: "text-indigo-500 hover:bg-indigo-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default NavBar;
