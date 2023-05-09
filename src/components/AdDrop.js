import React, { useState, useEffect } from "react";
import LocationService from "../service/LocationService";

const Country=(props)=> {
	const [country, setCountry] = useState([]);
	const [countryid, setCountryid] = useState("");
	const [states, setState] = useState([]);
	const [stateid, setStateid] = useState("");
	const [city, setCity] = useState([]);
    

	useEffect(() => {
		const getcountry = async () => {
			try {
				const getres = await LocationService.listCtys();
				console.log(getres.data.data);
				setCountry(await getres.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getcountry();
	}, []);

	const handlecountry = (event) => {
		const getcoutryid = event.target.value;
		setCountryid(getcoutryid);
		event.preventDefault();
	};

	useEffect(() => {
		const getstate = async () => {
			const getst = await LocationService.listStates(countryid);
			console.log(getst.data.data);
			setState(await getst.data.data);
		};
		getstate();
	}, [countryid]);

	const handlestate = (event) => {
		const getstateid = event.target.value;
		setStateid(getstateid);
		event.preventDefault();
	};

	useEffect(() => {
		const getcity = async () => {
			const getci = await LocationService.listCities(countryid, stateid);
			console.log(getci.data.data);
			setCity(await getci.data.data);
		};
		getcity();
	}, [stateid, countryid]);

	const handlecity = (event) => {
		const getcityid = event.target.value;
        
		props.setCityid(getcityid);
		event.preventDefault();
	};

	return (
		<div className="container pt-4 pb-8">
			<div className="flex mt-6 mb-4 justify-evenly">
				
					<div className="w-32">
						<label className="mb-2">Country</label>
						<select
							name="country"
							className="form-control mt-1 rounded-md font-medium
                            text-sm h-9 focus:outline-indigo-100"
							onChange={(e) => handlecountry(e)}
						>
							<option>--Select--</option>
							{country.map((getcon) => (
								<option key={getcon} value={getcon}>
									{" "}
									{getcon}
								</option>
							))}
						</select>
					</div>
					<div className="w-32">
						<label className="mb-2">State</label>
						<select
							name="state"
							className="form-control mt-1 rounded-md font-medium
                            text-sm h-9 focus:outline-indigo-100"
							onChange={(e) => handlestate(e)}
						>
							<option>--Select--</option>
							{states.map((st) => (
								<option key={st} value={st}>
									{st}
								</option>
							))}
						</select>
					</div>
					<div className="w-32 ">
						<label className="mb-2">City</label>
						<select
							name="city"
							className="form-control mt-1 rounded-md font-medium
                            text-sm h-9 focus:outline-indigo-100"
							onChange={(e) => handlecity(e)}
						>
							<option>--Select--</option>
							{city.map((city) => (
								<option key={city.locationId} value={city.locationId}>
									{city.city}
								</option>
							))}
						</select>
					</div>
			</div>
		</div>
	);
}

export default Country;
