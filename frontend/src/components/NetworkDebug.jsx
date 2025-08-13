import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const NetworkDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    currentUrl: '',
    apiBaseUrl: '',
    userAgent: '',
    connectionStatus: 'checking...',
    apiStatus: 'checking...',
    lastError: null
  });

  useEffect(() => {
    // Get current environment info
    const info = {
      currentUrl: window.location.href,
      apiBaseUrl: api.defaults.baseURL || 'relative',
      userAgent: navigator.userAgent,
      connectionStatus: navigator.onLine ? 'online' : 'offline'
    };

    // Test API connectivity
    testApiConnection(info);
  }, []);

  const testApiConnection = async (info) => {
    try {
      console.log('Testing API connection with base URL:', api.defaults.baseURL);
      const response = await api.get('/api/dashboard/');
      console.log('API response received:', response.status, response.data);

      setDebugInfo({
        ...info,
        apiStatus: `✅ Connected (${response.status})`,
        lastError: null
      });
    } catch (error) {
      console.error('API connection failed:', error);

      // Try with fetch directly to see if it's an axios issue
      try {
        const directResponse = await fetch('/api/dashboard/');
        if (directResponse.ok) {
          setDebugInfo({
            ...info,
            apiStatus: `⚠️ Axios failed but fetch works (${directResponse.status})`,
            lastError: {
              message: `Axios error: ${error.message}, but direct fetch works`,
              code: error.code,
              url: error.config?.url,
              baseURL: error.config?.baseURL
            }
          });
        } else {
          throw new Error(`Direct fetch also failed: ${directResponse.status}`);
        }
      } catch (directError) {
        setDebugInfo({
          ...info,
          apiStatus: `❌ Both axios and fetch failed`,
          lastError: {
            message: error.message,
            code: error.code,
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            directFetchError: directError.message
          }
        });
      }
    }
  };

  const retryConnection = () => {
    setDebugInfo(prev => ({ ...prev, apiStatus: 'retrying...' }));
    testApiConnection({
      currentUrl: debugInfo.currentUrl,
      apiBaseUrl: debugInfo.apiBaseUrl,
      userAgent: debugInfo.userAgent,
      connectionStatus: debugInfo.connectionStatus
    });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-gray-900 mb-3">🔧 Network Debug Info</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <p><strong>Current URL:</strong> {debugInfo.currentUrl}</p>
          <p><strong>API Base URL:</strong> {debugInfo.apiBaseUrl}</p>
          <p><strong>Connection:</strong> {debugInfo.connectionStatus}</p>
          <p><strong>API Status:</strong> {debugInfo.apiStatus}</p>
        </div>
        
        {debugInfo.lastError && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-red-800 font-medium">Last Error:</p>
            <p className="text-red-700">{debugInfo.lastError.message}</p>
            {debugInfo.lastError.code && (
              <p className="text-red-600">Code: {debugInfo.lastError.code}</p>
            )}
            {debugInfo.lastError.url && (
              <p className="text-red-600">URL: {debugInfo.lastError.baseURL}{debugInfo.lastError.url}</p>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-3 space-x-2">
        <button
          onClick={retryConnection}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Retry Connection
        </button>

        <button
          onClick={() => window.open('/api/dashboard/', '_blank')}
          className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
        >
          Test API Direct
        </button>

        <button
          onClick={() => window.open('/api/transactions/', '_blank')}
          className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
        >
          Test Transactions API
        </button>
      </div>
    </div>
  );
};

export default NetworkDebug;
