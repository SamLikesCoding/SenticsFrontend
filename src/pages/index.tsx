import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css'
import getData from './api/databaseFetch';
import { BodyPart } from './models/part';
import GlassCard from './components/GlassCard';

export default function Home() {
  // Data State
  let [data, setData] = useState([]);
  let [dashToggle, setDashToggle] = useState(true);
  let [bodyPart, setBodyPart] = useState<BodyPart | null>(null);

  // Data Fetching
  useEffect(() => {
    getData().then((res:any) => {     
      setData(res);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Sentics Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* Navigation Section */}
        <div className={styles.navbar}>
          <div style={{
            padding: '1rem',
            backgroundColor: '#B92736'
          }}>
              <div className={styles.title}>
                Quality Monitor
              </div>
              <div className={styles.subtitle}>
                Dashboard
              </div>
          </div>
          {
            dashToggle && (
              <React.Fragment>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#871D27'
                }}>
                    <code>Scanned Parts</code>
                </div>
                <div className={styles.partList}>
                    {
                      data.map((bodyPartData) => (
                         <div 
                            id={bodyPartData['PID']}
                            key={bodyPartData['PID']} className={styles.card}
                            onClick={(_:any) => {
                              console.log(bodyPartData);

                              // Creating Modal Object
                              const bpart = new BodyPart();
                              bpart.createFromObject(bodyPartData);

                              setBodyPart(bpart);
                              setDashToggle(false);
                         }}>
                            <code>{bodyPartData['PID']}</code><br/>
                            <code style={{
                              fontSize: 10
                            }}>Cracks : {Object(bodyPartData['cracks']).length}</code>
                         </div>
                        )
                      )
                    }
                </div>
              </React.Fragment>
            ) || 
            <div className={styles.partInfo}>
               <div style={{
                  padding: '1rem',
                  backgroundColor: '#871D27'
                }}>
                  <code>
                    Part : {bodyPart?.pid}
                  </code>
              </div>
              <div className={styles.partData}>
                 <code>
                      No of cracks : {bodyPart?.cracks.length} <br/>
                      Date scanned : {bodyPart?.datestamp} <br/>
                 </code>
              </div>
              <div className={styles.card}
                   onClick={() => {
                   setBodyPart(null);
                   setDashToggle(true);
              }}>
                <code>Back</code>
              </div>
            </div>
          }
          <div className={styles.logoDiv}>
              <code>
                Powered by
              </code>
              <Image 
                src={"/images/logo.png"}
                alt="logo"
                height={24.47}
                width={120}
                style={{ paddingLeft: "12px" }}
              />
          </div>
        </div>
        <div className={styles.appbody}>
          {
            (bodyPart) && (
              <div className={styles.crackGrid}>
                {
                  bodyPart.cracks.map((crk) => {
                    let crackData = Object(crk);
                    console.log(crackData['image'].length);
                    return <div className={styles.crackGridItem}>
                      {
                        GlassCard(
                          <Image 
                            src={crackData['image'][0]}
                            alt={crackData['CRID']}
                            width={180}
                            height={150}
                            style={{ borderRadius: 8 }}
                          />
                        )
                      }
                    </div>
                  })
                }
              </div>
            ) || (
              <div>
                 {GlassCard(
                 <div className={styles.splash}>
                    <div className={styles.bigtitle}>
                        Quality Check Dashboard
                    </div>
                    <br/><br/>
                    <div className={styles.subtitle}>
                      The scanned parts are available in the navigation bar. Select the part for the scan report and further details.
                    </div>
                 </div>)}
              </div>
            )
          }
        </div>
      </main>
    </>
  )
}
