import './App.css';
import {useEffect, useState} from "react";
import {initializeSingularity} from "singularity-init";
import SignInModal from "./components/SignInModal/SignInModal";
import SigningModal from "./components/SigningModal/SigningModal";
import NftModal from "./components/NftModal/NftModal";
import profileBgCircle from "./assets/profile_background.svg"
import ubisoftLogo from "./assets/ubisoft_logo.svg"

function App() {
    const textSelectedColor = '#D9C683'
    const textUnSelectedColor = '#fff'

    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState()
    const [buyNftVisible, setBuyNftVisible] = useState(false)
    const [loading,setLoading] = useState(true)

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const getUserName = () => {
        try {
            if(userData.mode === 'social') {
                if(userData.userMetaData && userData.userMetaData.email) {
                    return userData.userMetaData.email
                } else if(userData.userMetaData && userData.userMetaData.name) {
                    return userData.userMetaData.name
                } else {
                    return 'User'
                }
            } else {
                return 'User'
            }
        } catch (e) {
            console.error(e)
            return 'User'
        }
    }

    const getProfileIcon = () => {
        try{
            const userName = getUserName()
            return userName[0].toUpperCase()
        } catch (e) {
            return 'S'
        }
    }

    const checkUserLoggedIn = async () => {
        const userData = await window.SingularityEvent.getConnectUserInfo();
        const metadata = userData?.metaData;
        if(metadata) {
            setUserData(metadata)
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }

  useEffect(() => {
    const key = "9v1OMzaWWV8lHe16KqqCYet8AqoTO7uJ";
    initializeSingularity(window, document,'1.7.30-sandbox.1','production',key,async () => {
        window.SingularityEvent.subscribe('SingularityEvent-login', data => {
            console.log('user login callback:', data)
            checkUserLoggedIn()
        });

        window.SingularityEvent.subscribe('SingularityEvent-logout', data => {
            console.log('user login callback:', data)
            checkUserLoggedIn()
            window.SingularityEvent.close()
        });

        setLoading(false)
        await checkUserLoggedIn()
    })
  }, [])

  return (
      <div style={{position:'relative',  height:'100vh', width:'100vw', paddingBottom: '16px'}}>

          <div style={{background:'#0F1515', width: '100%', height: '8.3%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                  <img src={ubisoftLogo}  style={{width: '110px', height: '36px', marginLeft: '20px'}} />

                  <div className={'HeaderSeparator'}></div>

                  <img
                      style={{marginLeft: '15px'}}
                      src="https://singularity-web-assets-public.s3.ap-south-1.amazonaws.com/client-assets/champion_tactics/champion_tactics_logo.svg" />

                  { loggedIn &&
                      <div className="MobileMenuIcon" onClick={toggleDrawer}>
                          {/* Replace with your arrow icon or hamburger menu icon */}
                          
                          <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"
                               className="style_buttonIcon__qKW4_">
                              <path d="M16.282 15 12 10.486 14.359 8 21 15l-6.641 7L12 19.514 16.282 15Z"
                                    fill="#fff"></path>
                          </svg>
                          {/*<img src={arrowIcon} alt="Menu" />*/}
                      </div>
                  }



                  { loggedIn &&
                      <div
                          className={'SignMessageHeadingText'}
                          style={{color: buyNftVisible ? textUnSelectedColor : textSelectedColor}}
                          onClick={() => {
                              setBuyNftVisible(false)
                          }}
                      >
                          Sign Message
                      </div>
                  }

                  { loggedIn &&
                      <div
                          className={'PurchaseNftHeadingText'}
                          style={{color: buyNftVisible ? textSelectedColor : textUnSelectedColor}}
                          onClick={() => {
                              setBuyNftVisible(true)
                          }}
                      >
                          Purchase NFT
                      </div>
                  }


              </div>

              <div className={drawerOpen ? "DrawerOpen DrawerVisible" : "DrawerOpen"}>

                  <div className={'DrawerCloseIcon'}
                       style={{position: 'absolute', top: '12px', right: '12px', color: 'white', fontWeight: '900'}} onClick={() => {
                  closeDrawer()
                  }}>
                      x
                  </div>

                  <div
                      className="SignMessageHeadingTextDrawer"
                      style={{color: buyNftVisible ? textUnSelectedColor : textSelectedColor}}
                      onClick={() => {
                          setBuyNftVisible(false);
                          closeDrawer(); // Implement this function to close the drawer
                      }}
                  >
                      Sign Message
                  </div>
                  <div
                      className="PurchaseNftHeadingTextDrawer"
                      style={{color: buyNftVisible ? textSelectedColor : textUnSelectedColor}}
                      onClick={() => {
                          setBuyNftVisible(true);
                          closeDrawer(); // Implement this function to close the drawer
                      }}
                  >
                      Purchase NFT
                  </div>
              </div>

              { loggedIn &&
                  <div
                      onClick={() => {
                          window.SingularityEvent.open()
                      }}
                      style={{width: '40px', height: '40px', background: `url(${profileBgCircle})`, marginRight: '31px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                      <div className={'ProfileIconText'}>
                          {getProfileIcon()}
                      </div>
                  </div>
              }



          </div>

          { loading ?
              <div className={'loader'} />
              :
             <>
                 { loggedIn &&
                     <>
                         { buyNftVisible && <NftModal userData={userData} /> }
                         { !buyNftVisible && <SigningModal userData={userData} /> }
                     </>
                 }

                 { !loggedIn && <SignInModal />}
             </>

          }

      </div>
  );
}

export default App;
