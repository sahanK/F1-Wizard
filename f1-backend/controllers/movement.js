import firebase from '../config/firebase.js';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';

const database = getFirestore(firebase);

const collectionName = 'F1-VehicleMovement';

export const getMovements = async (request, response) => {
  try {
    const movementsCollection = collection(database, collectionName);
    const movementsSnapshot = await getDocs(movementsCollection);
    const movements = movementsSnapshot.docs.map(document => document.data());
    response.status(200).json(movements);
  } catch (error) {
    response.status(500).json({
      message: 'Server error',
    });
  }
};

export const addMovement = async (request, response) => {
  try {
    await setDoc(doc(database, collectionName, nanoid()), request.body);
    response.status(201).json({
      message: 'data added',
    });
  } catch (error) {
    response.status(500).json({
      message: 'Server error',
    });
  }
};