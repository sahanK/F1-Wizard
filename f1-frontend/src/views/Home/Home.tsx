import React, { useEffect } from 'react';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from "../../redux/hooks";
import VehicleDetailRow from "../../components/VehicleDetailRow";
import { app as firebaseApp } from "../../firebase/config";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [movements, isLoading] = useCollectionData(
    collection(getFirestore(firebaseApp), 'F1-RealtimeMovement'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Vehicle</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Location</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Direction</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Speed</th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Acceleration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {
          movements?.map((vehicleDetail, index) => 
            <VehicleDetailRow
              key={vehicleDetail.deviceId + index}
              deviceId={vehicleDetail.deviceId}
              location={vehicleDetail.location}
              direction={vehicleDetail.direction}
              speed={vehicleDetail.speed}
              acceleration={vehicleDetail.accelerationX}
              latitude={vehicleDetail.latitude}
              longitude={vehicleDetail.longitude}
            />
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default Home;
