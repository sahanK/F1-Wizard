import React from 'react';

const SAFETY_THRESHOLD = {
  speed: 230,
  acceleration: 160,
  direction: 'forward',
};

const VehicleDetailRow: React.FC<vehicleMovement> = ({ deviceId, location, direction, speed, acceleration, latitude, longitude }) => {
  return (
    <tr className="hover:bg-gray-50">
      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{deviceId}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <span
          className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
        >
          {latitude}, {longitude}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold
            ${direction === SAFETY_THRESHOLD.direction ? 'bg-green-50 text-green-600': 'bg-red-50 text-red-600'}`
          }
        >
          {direction}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold
          ${speed === SAFETY_THRESHOLD.speed ? 'bg-green-50 text-green-600': 'bg-red-50 text-red-600'}`
        }
        >
          {speed} kmh^1
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold
          ${acceleration === SAFETY_THRESHOLD.acceleration ? 'bg-green-50 text-green-600': 'bg-red-50 text-red-600'}`
        }
        >
          {acceleration} ms^2
        </span>
      </td>
    </tr>
  );
};

export default VehicleDetailRow;