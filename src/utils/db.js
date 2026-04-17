import { db } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveUserRoadmap = async (userId, userData, recommendations) => {
  if (!userId) return;
  try {
    const userRef = doc(db, "userRoadmaps", userId);
    await setDoc(userRef, {
      userData,
      recommendations,
      completedTaskIds: [], // array to hold checked task IDs
      notes: "", // raw string holding the scratchpad notes
      xp: 0,
      activityLog: {},
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error("Error saving roadmap:", err);
  }
};

export const getUserRoadmap = async (userId) => {
  if (!userId) return null;
  try {
    const userRef = doc(db, "userRoadmaps", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.error("Error getting roadmap:", err);
  }
  return null;
};

export const updateTaskProgress = async (userId, completedTaskIds) => {
  if (!userId) return;
  try {
    const userRef = doc(db, "userRoadmaps", userId);
    await setDoc(userRef, {
      completedTaskIds,
      progressUpdatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Error updating progress:", err);
  }
};

export const updateUserNotes = async (userId, notesText) => {
  if (!userId) return;
  try {
    const userRef = doc(db, "userRoadmaps", userId);
    await setDoc(userRef, {
      notes: notesText,
      notesUpdatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error("Error updating notes:", err);
  }
};

export const recordActivity = async (userId) => {
  if (!userId) return;
  try {
    const userRef = doc(db, "userRoadmaps", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const tzOffset = (new Date()).getTimezoneOffset() * 60000;
      const today = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
      const log = data.activityLog || {};
      log[today] = (log[today] || 0) + 1;
      await setDoc(userRef, { activityLog: log }, { merge: true });
    }
  } catch (err) {
    console.error("Error logging activity:", err);
  }
};

export const updateUserXP = async (userId, additionalXP) => {
  if (!userId) return;
  try {
    const userRef = doc(db, "userRoadmaps", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const currentXP = data.xp || 0;
      await setDoc(userRef, { xp: currentXP + additionalXP }, { merge: true });
    }
  } catch (err) {
    console.error("Error updating XP:", err);
  }
};
