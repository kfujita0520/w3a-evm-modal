import "./SigningModal.css"
import copyIcon from "../../assets/copy_icon.svg"
import {useState} from "react";
function  SigningModal({userData}) {

    const [message, setMessage] = useState('');

    function ellipsizeAddress(address, startLength = 6, endLength = 4) {
        const addressLength = address.length;
        const ellipsis = '...';

        if (addressLength <= startLength + endLength) {
            // Address is too short, just return it as is
            return address;
        } else {
            const start = address.slice(0, startLength);
            const end = address.slice(addressLength - endLength);
            return start + ellipsis + end;
        }
    }

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
            }
        } catch (e) {
            console.error(e)
            return 'User'
        }
    }

    const getPublicAddress = () => {
        try{
            return userData.wallet.accounts.evmPublicAddress[0].publicAddress
        } catch (e) {
            console.error(e)
            return ''
        }
    }

    const getPublicAddressEllipsized = () => {
        try{
            const publicAddress = getPublicAddress()
            return ellipsizeAddress(publicAddress)
        } catch (e) {
            console.error(e)
            return ''
        }
    }

    const onCopyIconClicked = async () => {
        try {
            // this feature may be rejected if it is loaded in http: context
            // instead of https: context
            await navigator.clipboard.writeText(getPublicAddress());
        } catch {
            console.error('Error copying');
        }
    }

    const onSignClicked = async () => {
        if(!message)return
        if(message.length === 0)return

        try {
            const signature = await window.SingularityEvent.requestPersonalSignature(message);
            if (signature.metaData) window.alert('Signature: ' + signature.metaData.signature);
        } catch (err) {
            console.error(err);
            window.alert('Some error occured');
        }

    }

  return (
      <div style={{

      }}
           className={'SigningModalContainer'}>

          <div className={'WelcomeTitleContainer'}>
              <div className={'WelcomeTitle'}>
                  Welcome {getUserName()}
              </div>
          </div>

          <div className={'YourWalletAddressIsContainer'}>
              <span className={'YourWalletAddressIs'}>
                  Your wallet address is &nbsp;
              </span>
              <span className={'WalletAddress'}>
                  {getPublicAddressEllipsized()}
              </span>
              <img src={copyIcon} style={{width: '24px', height: '24px', marginLeft: '15px', cursor: 'pointer'}} onClick={onCopyIconClicked} />
          </div>

          <div style={{width: '100%', marginTop: '14px'}}>
              <span className={'YourWalletAddressIs'}>
                  Try out the wallet by signing the message below.
              </span>
          </div>

          <div style={{width: '100%', marginTop: '26px', display: 'flex', flexDirection: 'column'}}>
              <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={'SignatureInputTextBox'} />
          </div>

          <div className={'CtaButtonsContainer'}>
              <div
                  onClick={() => { setMessage('') }}
                  className={'SigningModalCancelButton'}>
                  CANCEL
              </div>

              <div
                  onClick={onSignClicked}
                  className={'SigningModalSignInButton'}>
                  Sign
              </div>
          </div>



      </div>
  );
}

export default  SigningModal;
