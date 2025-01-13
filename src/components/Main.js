// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// // Sample data - replace with actual data from CSV
// const yearlyGrowthData = [
//   { year: 2018, count: 5000 },
//   { year: 2019, count: 8000 },
//   { year: 2020, count: 12000 },
//   { year: 2021, count: 18000 },
//   { year: 2022, count: 25000 },
//   { year: 2023, count: 35000 },
// ];

// const makeData = [
//   { make: 'Tesla', count: 15000 },
//   { make: 'Chevrolet', count: 8000 },
//   { make: 'Nissan', count: 6000 },
//   { make: 'Ford', count: 5000 },
//   { make: 'BMW', count: 4000 },
// ];

// const typeData = [
//   { type: 'Sedan', value: 45 },
//   { type: 'SUV', value: 30 },
//   { type: 'Hatchback', value: 15 },
//   { type: 'Truck', value: 10 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// const EVDashboard = () => {
//   const [activeFilter, setActiveFilter] = useState('all');

//   return (
//     <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Electric Vehicle Population Dashboard</h1>
        
//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Total EVs</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">35,000</p>
//               <p className="text-sm text-gray-500">+40% from last year</p>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader>
//               <CardTitle>Most Popular Make</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">Tesla</p>
//               <p className="text-sm text-gray-500">42.8% market share</p>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader>
//               <CardTitle>Top Vehicle Type</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">Sedan</p>
//               <p className="text-sm text-gray-500">45% of all EVs</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {/* Growth Over Time */}
//           <Card className="col-span-2">
//             <CardHeader>
//               <CardTitle>EV Growth Over Time</CardTitle>
//             </CardHeader>
//             <CardContent className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={yearlyGrowthData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="year" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="count" stroke="#8884d8" name="Total EVs" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           {/* Make Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Distribution by Make</CardTitle>
//             </CardHeader>
//             <CardContent className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={makeData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="make" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="count" fill="#8884d8" name="Number of Vehicles" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           {/* Vehicle Type Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Vehicle Type Distribution</CardTitle>
//             </CardHeader>
//             <CardContent className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={typeData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {typeData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EVDashboard;