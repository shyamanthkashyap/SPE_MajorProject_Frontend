import React, { useState, useEffect } from "react";

import CategoryServie from "../service/CategoryService";

const CaDrop = (props) => {
	const [maincategory, setMaincategory] = useState([]);
	const [maincategoryid, setMaincategoryId] = useState("");
	const [subcategory, setSubCategory] = useState([]);
	const [subcategoryid, setSubCategoryId] = useState("");

	useEffect(() => {
		const getCategory = async () => {
			try {
				const getres = await CategoryServie.listMainCategory();
				console.log(getres.data.data);
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
			const getst = await CategoryServie.listSubCategory(maincategoryid);
			console.log(getst.data.data);
			setSubCategory(await getst.data.data);
		};
		getsubcategory();
	}, [maincategoryid]);

	const handlesubcategory = (event) => {
		const getsubcategoryid = event.target.value;
		setSubCategoryId(getsubcategoryid);
        props.setCtgy(subcategory[getsubcategoryid]);
        props.setCategoryId(props.ctgy.subCategoryId);
		event.preventDefault();
	};

	return (
		<div className="container">
			<div className="flex mt-6 mb-4  text-sm font-medium text-gray-700 ">
				
					<div className="w-32">
						<label className="mb-2">Categroy</label>
						<select
							name="maincategory"
							className="form-control mt-1 font-medium
                            text-sm h-8 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full border border-gray-300 rounded-md pt-1"
							onChange={(e) => handlecategory(e)}
						>
							<option className="z-10">--Select--</option>
							{maincategory && maincategory.map((getcon) => (
                                
								<option key={getcon.categoryId} value={getcon.categoryId}>
									{" "}
									{getcon.categoryName}
								</option>
							))}
						</select>
					</div>
					<div className="w-32 ml-10">
						<label className="mb-2">Subcategory</label>
						<select
							name="subcategroy"
							className="form-control mt-1 rounded-md font-medium
                            text-sm h-8 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full border border-gray-300  pt-1"
							onChange={(e) => handlesubcategory(e)}
						>
							<option>--Select--</option>
							{subcategory && subcategory.map((st, index) => (
								<option key={st.subCategoryId} value={index}>
									{st.subCategoryName}
								</option>
							))}
						</select>
					</div>
				
			</div>
		</div>
	);
}

export default CaDrop