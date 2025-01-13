export const processYearlyGrowth = (data) => {
    const yearlyCount = data.reduce((acc, vehicle) => {
      const year = vehicle.modelYear;
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(yearlyCount)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year);
  };
  
  export const processMakeDistribution = (data) => {
    const makeCount = data.reduce((acc, vehicle) => {
      const make = vehicle.make;
      acc[make] = (acc[make] || 0) + 1;
      return acc;
    }, {});
  
    return Object.entries(makeCount)
      .map(([make, count]) => ({ make, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };
  
  export const processTypeDistribution = (data) => {
    const typeCount = data.reduce((acc, vehicle) => {
      const type = vehicle.vehicleType || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
  
    const total = Object.values(typeCount).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(typeCount)
      .map(([type, count]) => ({
        type,
        value: (count / total) * 100,
        count
      }))
      .sort((a, b) => b.value - a.value);
  };
  
  export const calculateGrowthRate = (data) => {
    const yearlyData = processYearlyGrowth(data);
    if (yearlyData.length < 2) return 0;
    
    const currentYear = yearlyData[yearlyData.length - 1];
    const previousYear = yearlyData[yearlyData.length - 2];
    
    return ((currentYear.count - previousYear.count) / previousYear.count * 100).toFixed(1);
  };