import React, { useState } from 'react';

const PortfolioDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample portfolio data
  const portfolioData = [
    { symbol: 'AAPL', companyName: 'Apple Inc.', quantity: 100, entryPrice: 150.00, currentPrice: 175.50, sector: 'Technology' },
    { symbol: 'MSFT', companyName: 'Microsoft Corp.', quantity: 75, entryPrice: 300.00, currentPrice: 320.25, sector: 'Technology' },
    { symbol: 'GOOGL', companyName: 'Alphabet Inc.', quantity: 50, entryPrice: 100.00, currentPrice: 105.80, sector: 'Technology' },
    { symbol: 'TSLA', companyName: 'Tesla Inc.', quantity: 25, entryPrice: 200.00, currentPrice: 180.50, sector: 'Automotive' }
  ];

  const [wishlist] = useState([
    { symbol: 'NVDA', companyName: 'NVIDIA Corp.', targetPrice: 400.00, currentPrice: 450.25, priority: 'High' },
    { symbol: 'AMD', companyName: 'Advanced Micro Devices', targetPrice: 80.00, currentPrice: 85.50, priority: 'Medium' },
    { symbol: 'AMZN', companyName: 'Amazon.com Inc.', targetPrice: 120.00, currentPrice: 135.75, priority: 'Low' }
  ]);

  // Calculate portfolio metrics
  const totalValue = portfolioData.reduce((sum, stock) => sum + (stock.quantity * stock.currentPrice), 0);
  const totalCost = portfolioData.reduce((sum, stock) => sum + (stock.quantity * stock.entryPrice), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalGainLoss / totalCost) * 100);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Portfolio Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'portfolio' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'wishlist' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'analysis' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Analysis
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Dashboard</h2>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Total Portfolio Value</h3>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
                <p className={`text-sm mt-1 ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalGainLoss >= 0 ? '↗' : '↘'} {Math.abs(totalGainLossPercent).toFixed(2)}%
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Total Gain/Loss</h3>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${totalGainLoss.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Since inception</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Number of Holdings</h3>
                <p className="text-2xl font-bold text-gray-900">{portfolioData.length}</p>
                <p className="text-sm text-gray-500 mt-1">Active positions</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-600">Watchlist Items</h3>
                <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                <p className="text-sm text-gray-500 mt-1">Stocks to monitor</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
              <p className="text-gray-600">
                Your portfolio is currently valued at <strong>${totalValue.toLocaleString()}</strong> with a 
                total {totalGainLoss >= 0 ? 'gain' : 'loss'} of <strong>${Math.abs(totalGainLoss).toLocaleString()}</strong> 
                ({Math.abs(totalGainLossPercent).toFixed(2)}%).
              </p>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Holdings</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {portfolioData.map((stock) => {
                    const marketValue = stock.quantity * stock.currentPrice;
                    const gainLoss = marketValue - (stock.quantity * stock.entryPrice);
                    const gainLossPercent = ((gainLoss / (stock.quantity * stock.entryPrice)) * 100);
                    
                    return (
                      <tr key={stock.symbol} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                            <div className="text-sm text-gray-500">{stock.companyName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stock.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${stock.entryPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${stock.currentPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${marketValue.toLocaleString()}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Stock Wishlist</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wishlist.map((stock) => {
                    const difference = stock.currentPrice - stock.targetPrice;
                    const diffPercent = ((difference / stock.targetPrice) * 100);
                    
                    return (
                      <tr key={stock.symbol} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                            <div className="text-sm text-gray-500">{stock.companyName}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${stock.currentPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${stock.targetPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            stock.priority === 'High' ? 'bg-red-100 text-red-800' :
                            stock.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {stock.priority}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {difference >= 0 ? '+' : ''}${difference.toFixed(2)} ({diffPercent.toFixed(1)}%)
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Analysis</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon!</h3>
              <p className="text-gray-600 mb-4">
                Technical analysis with your consolidated trading signals will be available here. 
                This will include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Moving Average analysis (SMA 20, 50, 200)</li>
                <li>RSI momentum indicators</li>
                <li>MACD signal analysis</li>
                <li>Bollinger Bands and volatility</li>
                <li>Volume and support/resistance levels</li>
                <li>BUY/SELL/HOLD recommendations</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioDashboard;