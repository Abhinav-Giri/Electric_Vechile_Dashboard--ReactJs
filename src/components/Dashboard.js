import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { SummaryCard } from './SummaryCard';
import { YearlyGrowthChart } from './YearlyGrowthChart';
import { MakeDistributionChart } from './MakeDistributionChart';
import { TypeDistributionChart } from './TypeDistributionChart';
import { processYearlyGrowth, processMakeDistribution, processTypeDistribution, calculateGrowthRate } from '../utils/dataProcessing';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [yearFilter, setYearFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [processedData, setProcessedData] = useState({
    yearlyGrowth: [],
    makeDistribution: [],
    typeDistribution: [],
    growthRate: 0,
    totalVehicles: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ev_population.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const formattedData = results.data.map(record => ({
              make: record.Make,
              model: record.Model,
              modelYear: parseInt(record['Model Year']),
              vehicleType: record['Vehicle Type'],
              cleanAlternativeFuelVehicleEligibility: record['Clean Alternative Fuel Vehicle (CAFV) Eligibility'],
              electricRange: parseInt(record['Electric Range']),
              baseMARP: parseFloat(record['Base MSRP']),
              legislativeDistrict: record['Legislative District'],
              city: record.City,
              state: record.State,
              zipCode: record['ZIP Code'],
              county: record.County,
            }));
            
            setData(formattedData);
            processData(formattedData);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [processedData]);

  const processData = (rawData) => {
    const filteredData = yearFilter === 'all' 
      ? rawData 
      : rawData.filter(vehicle => vehicle.modelYear === parseInt(yearFilter));

    setProcessedData({
      yearlyGrowth: processYearlyGrowth(filteredData),
      makeDistribution: processMakeDistribution(filteredData),
      typeDistribution: processTypeDistribution(filteredData),
      growthRate: calculateGrowthRate(filteredData),
      totalVehicles: filteredData.length
    });
  };

  const handleYearFilter = (event) => {
    const year = event.target.value;
    setYearFilter(year);
    processData(data);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Electric Vehicle Population Dashboard</h1>
          <select 
            value={yearFilter}
            onChange={handleYearFilter}
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="all">All Years</option>
            {processedData.yearlyGrowth.map(({ year }) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard 
            title="Total EVs"
            value={processedData.totalVehicles.toLocaleString()}
            subValue={`${processedData.growthRate}% from last year`}
          />
          <SummaryCard 
            title="Most Popular Make"
            value={processedData.makeDistribution[0]?.make || 'N/A'}
            subValue={`${((processedData.makeDistribution[0]?.count || 0) / processedData.totalVehicles * 100).toFixed(1)}% market share`}
          />
          <SummaryCard 
            title="Top Vehicle Type"
            value={processedData.typeDistribution[0]?.type || 'N/A'}
            subValue={`${processedData.typeDistribution[0]?.value.toFixed(1)}% of all EVs`}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <YearlyGrowthChart data={processedData.yearlyGrowth} />
          </div>
          <MakeDistributionChart data={processedData.makeDistribution} />
          <TypeDistributionChart data={processedData.typeDistribution} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;