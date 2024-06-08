import '../../App.css'
import {useState} from "react";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import userPool from "./UserPool";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// IMP START - Quick Start
import { Web3Auth } from "@web3auth/modal";
// IMP END - Quick Start
//import Web3 from "web3";

// IMP START - SDK Initialization
// IMP START - Dashboard Registration
const clientId = "BGYRn46Yl0I96FuMFZ8G4DvE1xo1SyKGngV-sHRNU9S4t6XfqlG4XjfJJu-97gxBPQLgbiqylcHwdAftDVRPi_k"; // get from https://dashboard.web3auth.io


const chainConfig = {
    chainId: "0x4a43", // Please use 0x1 for Mainnet
    rpcTarget: "https://rpc.mainnet.oasys.homeverse.games",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    displayName: "Oasys HomeVerse",
    blockExplorerUrl: "https://explorer.oasys.homeverse.games",
    ticker: "OAS",
    tickerName: "OHV",
    logo: "https://www.oasys.games/app/uploads/2023/06/Oasys-Large-Logo-Green.svg",
  };
  
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });
  
  const web3auth = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
  });
  // IMP END - SDK Initialization
  

function  SignInModal() {
    let options = {}


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInLoading, setSignInLoading] = useState(false)

    const onSubmit = () => {
        if(!email && email.length===0)return
        if(!password && password.length===0)return

        setSignInLoading(true)

        userPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                const name = err.name;
                if(name.includes("UsernameExistsException")){
                    console.log("user exist logging in...");
                    loginNow();
                } else {
                    setSignInLoading(false)
                }

            } else {
                loginNow();
            }
        });
    };


    const onConnectWeb3AuthClicked = async () => {
         // IMP START - SDK Initialization
        await web3auth.initModal();
        const w3authProvider = await web3auth.connect();
        window.SingularityEvent.loginWithProvider(w3authProvider)
    }



    const onSignInWithWeb3AuthClicked = async () => {
        setSignInLoading(true)

        try{
            await onConnectWeb3AuthClicked()
        } catch (e) {
            console.error(e)
            setSignInLoading(false)
        }
    };

    const loginNow = () => {
        const user = new CognitoUser({
            Username:email,
            Pool:userPool,
        })
        const authDetails = new AuthenticationDetails({
            Username:email,
            Password:password,
        });
        user.authenticateUser(authDetails,{
            onSuccess:(data)=> {
                console.log("onSuccess: ",data)
                window.SingularityEvent.customAuth('COGNITO', {
                    idToken: data.getIdToken(),
                    accessToken: data.getAccessToken()
                })
            },
            onFailure: (err) =>{
                console.log("onFailure: ",err)
                setSignInLoading(false)
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ",data)
                setSignInLoading(false)
            }
        })
    }


  return (
      <div className={'SignInModalContainer'}>

          <div className={'SignInText'}>
              Sign in to your account
          </div>

          <div className={'EmailContainer'}>
              <div className={'InputLabel'}>Email</div>
              <input
                  value={email}
                  onChange={(event) =>setEmail(event.target.value)}
                  className={'InputTextBox'} />
          </div>

          <div className={'PasswordContainer'}>
              <div className={'InputLabel'}>Password</div>
              <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={'InputTextBox'}
                  type={'password'}>
              </input>
          </div>

          <div className={'SignInButton'} onClick={onSubmit}>
              <div className={'SignInButtonText'}>
                  Sign in
              </div>
          </div>

          <div className={'or'}>
             Or
          </div>

          <div className={'SignInButton'} onClick={onSignInWithWeb3AuthClicked}>
              <div className={'SignInButtonText'}>
                  Sign in with Web3 Auth
              </div>
          </div>

          { signInLoading &&
              <div className={'SignInLoader'} style={{marginBottom: '47px'}}>

              </div>
          }

      </div>
  );
}

export default  SignInModal;
