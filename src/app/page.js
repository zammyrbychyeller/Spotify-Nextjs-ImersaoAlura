'use client'
import { useEffect, useState } from "react";
import Navsearch from "../../components/Navsearch/page";
import styles from "./page.module.css";
import Image from "next/image";

const A_SECRET_API = process.env.SECRET_API;
const URL_API = '/api/playlist'

export default function Home() {

  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const query = await fetch(A_SECRET_API || URL_API);
      const response = await query.json();
      // console.log(response);
      setUserInfo(response);
    }
    getData();
  }, []);

  const getGreeting = () => {
    const localTime = new Date();

    const hours = localTime.getHours();

    if (hours >= 6 && hours < 12) {
      return "Bom dia";
    } else if (hours >= 12 && hours < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  return (
    <div className={styles.content_view}>
      <Navsearch />

      <div className={styles.view_navigation}>
        <div className={styles.playlist}>
          <h1 id="greeting">{getGreeting()}</h1>
          <h2 className="session">Navegar por todas as seções</h2>
        </div>
        <div className={styles.content_viewn}>
          {
            userInfo && userInfo.length && userInfo.map((playlist, index) => {
              return (
                <a href={playlist.urlplaylist} target="_blank" key={index}>
                  <div className={styles.cards} >
                    <div className={styles.wrapper}>
                      <Image src={playlist.urlImg} alt="test" width={100} height={100} className={styles.cover_image} property="true" />
                    </div>
                    <h1 className={styles.title}>{playlist.name}</h1>
                    <Image src={playlist.urlImg} alt="character" width={100} height={180}  className={styles.character} property="true" />
                  </div>
                </a>

              )
            })
          }
        </div>
      </div>

    </div>
  );
}
