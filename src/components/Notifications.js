// Add missing dependencies to useEffect
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  const audioRef = useRef(null);

  const loadNotifications = () => {
    if (!user?.id) return;
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id),
      where('read', '==', false)
    );
    
    return onSnapshot(q, (snapshot) => {
      const newNotifications = [];
      snapshot.forEach(doc => {
        newNotifications.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(newNotifications);
      
      // Play sound for new notifications
      if (newNotifications.length > 0 && audioRef.current) {
        audioRef.current.play();
      }
    });
  };

  useEffect(() => {
    const audio = new Audio('/notification-sound.mp3');
    audioRef.current = audio;
    
    let unsubscribe;
    if (user?.id) {
      unsubscribe = loadNotifications();
    }
    
    return () => {
      if (unsubscribe) unsubscribe();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [user?.id]); // Add user.id to dependencies
  
  // If loadNotifications and audio don't need to be in dependencies because they're stable,
  // you can disable the warning:
  /*
  useEffect(() => {
    // ... your code
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  */
  
  return (
    <div>
      {/* Your notifications component */}
    </div>
  );
}

export default Notifications;