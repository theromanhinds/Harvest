import React from 'react'
import { useState, useEffect } from 'react';
//imports two react hooks

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from 'firebase/database';
// import { child, get } from 'firebase/database';
//imports firebase database functions from installed dependencies

import Header from '../Components/Header';
import AddButton from './AddButton';
import SubButton from './SubButton';
import CounterHeader from './CounterHeader';
import SocialButton from './SocialButton';
import SettingButton from './SettingButton';
//imports external button components that get rendered to page

const firebaseConfig = {
  apiKey: "AIzaSyBz3q9s-RscOFDtHXEaN1ZN5oUo-v3LnhM",
  authDomain: "counter-4b0e9.firebaseapp.com",
  databaseURL: "https://counter-4b0e9-default-rtdb.firebaseio.com",
  projectId: "counter-4b0e9",
  storageBucket: "counter-4b0e9.appspot.com",
  messagingSenderId: "147317050466",
  appId: "1:147317050466:web:27a9b1136aa9cef0c1d53b",
  measurementId: "G-65WTG4DSHL"
};
//firebase object that stores links, connecting app to database

const app = initializeApp(firebaseConfig);
//const database = vvv
getDatabase(app);

function Counter() {

    const [count, setCount] = useState(0);
    const [cooldown, setCooldown] = useState(false);
    
    //useState hooks that control the count and button cooldown

    useEffect(() => {

      const db = getDatabase();
      const countRef = ref(db, 'values');
      onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data.count);
      });

      const timer = setTimeout(() => {
        //any functions inside setTimeout function are called after timer is cleared
        //integer in second paramter determines timer length in milliseconds
        setCooldown(false);
      }, 2000);
      setCooldown(true);
      return () => clearTimeout(timer);
    }, [count]);
    //useEffect hook that controls the button cooldown


    function incrementCount() {
      setCount(prevCount => prevCount + 1);
      //console.log(count);
      updateDatabaseAdd();
    } 
    function decrementCount() {
      setCount(prevCount => prevCount - 1);
      //console.log(count);
      updateDatabaseSub();
    } 
    //incremement and decrement count state using state hooks 
    //and calls function to update database with rendered value

    function updateDatabaseAdd() {
      const db = getDatabase();
      set(ref(db, 'values'), {
        count: count + 1,
      });
    }
    
    function updateDatabaseSub() {
      const db = getDatabase();
      set(ref(db, 'values'), {
        count: count - 1,
      });
    }

    // function getData() {
    //   const dbRef = ref(getDatabase());
    //   get(child(dbRef, `values`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       setCount(snapshot.val().count);
    //     } else {
    //       console.log("No data available");
    //     }
    //   }).catch((error) => {
    //     console.error(error);
    //   });
    // }

  return (
    <div className="App">
      <div className='Container'>
    <Header/>
    
    <div className="Counter">
        <CounterHeader/>
        <AddButton cooldown={cooldown} count={count} increment={incrementCount}/>
        <div className='SmallButtons'>
        <SubButton cooldown={cooldown} count={count} decrement={decrementCount}/>
        <SocialButton/>
        <SettingButton/>
        {/* <button onClick={getData}>Update</button> */}
        </div>
        </div>
    </div>
    </div>
  )
}

export default Counter