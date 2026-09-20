import React from 'react';
import hand from '../assets/hand.png'
import bookMark from '../assets/bookMark.png'
import leaf from '../assets/leaf.png'
import ongoing from '../assets/ongoing.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="p-8 bg-gray-100 min-h-screen font-sans text-gray-800">
            <h1 className="text-3xl font-bold">Welcome, NGO/Panchayat User</h1>
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">Start a New Blue Carbon Project</h2>
                <p className="mt-2 text-gray-700">Ready to make a difference? Submit details about your latest blue carbon initiative to begin the certification process.</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 cursor-pointer text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-150 ease-in-out" onClick={()=> navigate('/new-submission')}>Create New Project Submission</button>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">My Project Overview</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm h-[130px]">
                        <div className='flex gap-1'><img src={leaf} alt="" className='w-[30px]' /><span className="text-md text-gray-500 mt-1">Total Projects</span></div>
                        <span className="text-4xl font-bold">12</span>
                    </div>
                    <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm h-[130px]">
                        <div className='flex gap-1'><img src={hand} alt="" className='w-[30px]' /><span className="text-sm text-gray-500 mt-1">Certified Projects</span></div>
                        <span className="text-4xl font-bold">5</span>
                    </div>
                    <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm h-[130px]">
                        <div className='flex gap-1'><img src={bookMark} alt="" className='w-[26px] bg-white' /><span className="text-sm text-gray-500 mt-1">Credits Issued <span className="text-gray-400">tCO2e</span></span></div>
                        <span className="text-4xl font-bold">1,200</span>
                    </div>
                    <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-sm h-[130px]">
                        <div className='flex gap-1'><div className="p-2 bg-blue-100 text-blue-600 rounded-full mb-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><span className="text-sm text-gray-500 mt-1">In Review</span></div>
                        <span className="text-4xl font-bold">3</span>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Ongoing Project Status</h2>
                <div className="mt-6 p-6 bg-white rounded-lg shadow-lg relative">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Mangrove Restoration Project, Alibaug</h3>
                    <div className="flex items-center justify-between w-full">
                        <div className='basis-[45%] flex items-center'>
                            <div className="flex flex-col items-center justify-center space-x-2"><div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><span className="text-sm font-medium text-gray-600">Submitted</span></div>
                            <Line percent={100} strokeWidth={2} strokeColor="#2761F5" trailWidth={2} trailColor="#F3F4F6" className="flex-1 rounded-full h-1.5" />
                        </div>
                        <div className='basis-[55%] flex items-center '>
                            <div className='flex-1'><div className=" flex items-center"><div className="flex flex-col items-center justify-center"><img src={ongoing} alt="Ongoing" className="w-[50px] rounded-full" /><span>UnderProcess</span></div><Line percent={0} strokeWidth={2} strokeColor="#2761F5" trailWidth={2} trailColor="#97989C" className="flex-1 rounded-full h-1.5" /></div></div>
                            <div className="flex flex-col items-center justify-center space-x-2"><div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><span className="text-sm font-medium text-gray-400">Approved</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Past Submissions</h2>
                <div className="mt-4 overflow-x-auto bg-white rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200"><thead className="bg-gray-50"><tr><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mangrove Restoration</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alibaug</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50 hectares</td><td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-blue-600 hover:text-blue-900 font-medium">View Details</button></td></tr>
                        <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Coastal Wetland Conservation</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sundarbans</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">120 hectares</td><td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-blue-600 hover:text-blue-900 font-medium">View Details</button></td></tr>
                        <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Seagrass Bed Enhancement</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gulf of Mannar</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35 hectares</td><td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-blue-600 hover:text-blue-900 font-medium">View Details</button></td></tr>
                        <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Salt Marsh Rehabilitation</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Chilika Lake</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">80 hectares</td><td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-blue-600 hover:text-blue-900 font-medium">View Details</button></td></tr>
                        <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Estuary Ecosystem Revival</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Godavari Delta</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">60 hectares</td><td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-blue-600 hover:text-blue-900 font-medium">View Details</button></td></tr>
                    </tbody></table>
                </div>
            </div>
        </div>
    );
};
export default Home;