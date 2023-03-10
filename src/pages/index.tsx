import React, { useState, useEffect, Fragment } from 'react';
import GlassCard from './components/GlassCard';
import styles from '@/styles/Home.module.css'
import ImageViewer from "./components/ImageViewer";
import CrackObject from "./models/crack";
import getData from './api/databaseFetch';
import BodyPart from './models/part';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';


export default function Home() {

  // Data State
  let [data, setData] = useState([]);
  let [dashToggle, setDashToggle] = useState(true);
  let [backTrigger, setBackTriggerLevel] = useState(0);
  let [bodyPart, setBodyPart] = useState<BodyPart | null>(null);
  let [crackObject, setCrackObject] = useState<CrackObject | null>(null)

  // Data Fetching
  useEffect(() => {
    getData().then((res:any) => {     
      setData(res);
    });
  }, []);

  // App rendering
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
                              setBackTriggerLevel(1);
                              // Creating Modal Object
                              const bpart = new BodyPart();
                              bpart.createFromObject(bodyPartData);
                              
                              // Toggles
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
                   if (backTrigger == 1) {
                    setBackTriggerLevel(0);
                    setBodyPart(null);
                    setDashToggle(true);
                   }
                   else if (backTrigger == 2) {
                    setBackTriggerLevel(1);
                    setCrackObject(null);
                   }
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
                fill
                className={styles.image}
              />
          </div>
        </div>
        {/*  App Body */}
        <div className={styles.appbody}>
          {
            (bodyPart) && (
             <Fragment>
                {
                  (crackObject) && (
                   
                       <div className={styles.objectInfo}>
                         <ImageViewer imgs={crackObject.images}/>
                         <div className={styles.crackInfo}>
                              <div className={styles.title} style={{ paddingBottom: "1rem" }}>Damage Crack Information</div>
                              <code>Crack ID : {crackObject.crid}</code> <br/>
                              <code>Crack Length : {crackObject.crackLength + " " + crackObject.crackLengthDim}</code><br/>
                              <code>Crack Depth : {crackObject.crackDepth.toString()}</code><br/>
                              <code>Date Recorded : {bodyPart.datestamp}</code><br/> 
                              <code>Number of Images : {crackObject.images.length}</code>
                         </div>
                      </div>
                           
                  ) || (
                    <Fragment>
                        <div className={styles.bigtitle}>Cracks Scanned from {bodyPart.pid}</div><br/>
                        <ul className={styles.crackGrid}>
                          {
                            bodyPart.cracks.length != 0 && bodyPart.cracks.map((crk) => {
                              let crackData = Object(crk);
                              return <li 
                                id={crackData['CRID']} 
                                className={styles.crackGridItem}
                                onClick={() => {
                                    let crackObj = new CrackObject();
                                    crackObj.createFromObject(crackData);
                                    setBackTriggerLevel(2);
                                    setCrackObject(crackObj);
                                }}
                              >
                                {
                                  <React.Fragment>
                                    <Image 
                                      src={crackData['image'][0]}
                                      alt={crackData['CRID']}
                                      width={260}
                                      height={240}
                                      style={{ borderRadius: 16 }}
                                    />
                                    <div className={styles.overlay}>
                                      <code>
                                        Crack Reference : <br/>
                                        { crackData['CRID'] }
                                      </code>
                                      <code>
                                        Click to continue
                                      </code>
                                    </div>
                                  </React.Fragment>
                                }
                              </li>
                            }) || GlassCard(
                              <div style={{ 
                                height: 300, width: 400, 
                                alignItems: "flex-start", 
                                justifyContent: "center",
                                display: "flex",
                                flexDirection: "column",
                              }}>
                                <div className={styles.title}>
                                  No cracks found in scan
                                </div>
                                <div className={styles.subtitle}>
                                  The part seems to have no cracks
                                </div>
                              </div>
                            )
                          }
                        </ul>
                    </Fragment>
                  )
                }
             </Fragment>
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
