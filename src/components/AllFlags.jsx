import React, { useEffect, useState } from 'react';
import Flag from './Flag';
import axios from 'axios';

const AllFlags = () => {
	const [countries, setCountries] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	const getCountries = async () => {
		try {
			const { data } = await axios.get(
				'https://restcountries.com/v3.1/all',
			);
			setCountries(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCountries();
	}, []);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			<nav className='w-full shadow-md flex justify-center h-[4rem] p-4'>
				<input
					className='p-2 border border-slate-500 rounded-lg w-[60%]'
					type='text'
					placeholder='Search for countries'
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</nav>
			<div className='h-screen max-w-[1200px] m-auto my-6'>
				<div className='m-1 grid grid-cols-4 lg:grid-cols-7'>
					{filteredCountries.map((country) => (
						<Flag key={country.cca3} data={country} />
					))}
				</div>
			</div>
		</>
	);
};

export default AllFlags;
