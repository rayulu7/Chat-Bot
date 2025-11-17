import React from 'react';
import { useTheme } from '../context/ThemeContext';

const TableView = ({ table }) => {
  const { isDark } = useTheme();
  
  if (!table || !table.headers || !table.rows) {
    return null;
  }

  return (
    <div className={`overflow-x-auto my-3 sm:my-4 rounded-lg border ${
      isDark ? 'border-gray-700' : 'border-gray-300'
    }`}>
      <table className="min-w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr className={isDark ? 'bg-gray-800' : 'bg-gray-100'}>
            {table.headers.map((header, index) => (
              <th
                key={index}
                className={`border-b px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold ${
                  isDark 
                    ? 'border-gray-700 text-gray-300' 
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`transition-colors border-b ${
                isDark
                  ? 'hover:bg-gray-800 border-gray-800'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-2 sm:px-4 py-2 sm:py-3 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;

