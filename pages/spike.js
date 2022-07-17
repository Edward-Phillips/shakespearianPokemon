import Head from "next/head";
import { useEffect, useState } from "react";

export default function mobileInputSpike() {

  const [value, setValue] = useState('');
  const [event, setEvent] = useState({});

  const handleKeyUp = (e) => {
    e.preventDefault();
    console.log('handle KeyUp');
    console.log(Object.getOwnPropertyNames(e));
    setEvent(e);
  }
  const handleChange =(e) => {
    e.preventDefault();

  }
  return (
    <>
      <Head>
        <title>Who is that Pokemon?</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        <input onKeyUp={handleKeyUp} maxLength="1" value={value} onChange={handleChange}/>
      </div>
      <div>{event?.keyCode} : {event?.key}</div>
    </>
  );
}
