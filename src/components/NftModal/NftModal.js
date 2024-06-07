import "./NftModal.css"
import nftImage from "../../assets/nft.png"
import eyeIcon from "../../assets/eye_icon.svg"
import {v4} from "uuid";
function  NftModal({userData}) {

    const getPublicAddress = () => {
        try{
            return userData.wallet.accounts.evmPublicAddress[0].publicAddress
        } catch (e) {
            console.error(e)
            return ''
        }
    }

    const onBuyNowClicked = () => {
        const clientReferenceId = v4();

        let body = {
            clientReferenceId,
            singularityTransactionType: 'NFT_PURCHASE',
            transactionIconLink: 'https://singularity-web-assets-public.s3.ap-south-1.amazonaws.com/client-assets/champion_tactics/ubisoft_demo_nft.png',
            transactionLabel: 'S9Y_TEST NFT',
            clientReceiveObject: {
                clientRequestedAssetId: '190110',
                address: getPublicAddress()
            },
            userReceiveAssetDetailsList: [
                {
                    marketplaceId: 'ALTURA_MARKETPLACE_19011',
                    userRequestedNFTId: '1',
                    userRequestedNFTAddress: '0x8852c53b3652ceb0bbd6932c4acb710b8e83e656',
                    userRequestedNFTQuantity: '1',
                    userRequestedNFTType: 'ERC1155',
                    userRequestedNFTPrice: '0.1',
                    userRequestedNFTTradeType: 'BUY',
                    seaportData: {
                        seaportOrderData: JSON.stringify({         "offerer": "0x17F547ae02a94a0339c4CFE034102423907c4592",         "zone": "0x0000000000000000000000000000000000000000",         "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000",         "startTime": "1705911356",         "endTime": "115792089237316195423570985008687907853269984665640564039457584007913129639935",         "orderType": 1,         "offer": [           {             "itemType": 3,             "token": "0x8852c53b3652ceb0bbd6932c4acb710b8e83e656",             "identifierOrCriteria": "1",             "startAmount": "10000000000",             "endAmount": "10000000000"           }         ],         "consideration": [           {             "itemType": 0,             "token": "0x0000000000000000000000000000000000000000",             "identifierOrCriteria": "0",             "startAmount": "960000000000000000000000000",             "endAmount": "960000000000000000000000000",             "recipient": "0x17F547ae02a94a0339c4CFE034102423907c4592"           },           {             "itemType": 0,             "token": "0x0000000000000000000000000000000000000000",             "identifierOrCriteria": "0",             "startAmount": "40000000000000000000000000",             "endAmount": "40000000000000000000000000",             "recipient": "0xf2f9ed9f20696d900d324514552238023f649b51"           }         ],         "totalOriginalConsiderationItems": 2,         "salt": "0x000000003e49e456bf2ebe44",         "conduitKey": "0x0000000000000000000000000000000000000000000000000000000000000000",         "counter": "0",             "signature": "0xe63ee93533882665faddb578b85f83b49f0cb36564f15dce1dac344ac63d07cd9ce7e9b74e42b9d32d47abbc0df7beaabfb3d1f0d10a2787560c4915112147b1"       })
                    }
                }
            ]
        };


        const requestString = JSON.stringify(body);
        window.SingularityEvent.transactionFlow(requestString);
    }

  return (
      <div className={'NftModalMainContainer'}>

          <div>
              <img src={nftImage} className={'NftImage'}/>
          </div>

          <div className={'NftDataContainer'}>
              <div className={'NftTitleContainer'}>
                  <div className={'NftTitle'}>
                      S9Y_TEST NFT
                  </div>
              </div>

              <div className={'NftSubTitleContainer'}>
                  <div className={'NftSubTitle'}>
                      Ubisoft Champion Tacticts
                  </div>
              </div>

              <div className={'NftRankContainer'}>
                  <div className={'NftRank'}>
                      Rarity Rank : #12333
                  </div>

                  <img className={'EyeIcon'} src={eyeIcon} />

                  <div className={'NftViews'}>
                      22 views
                  </div>
              </div>

              <div className={'NftPriceDiv'}>
                  <div className={'NftCurrentPrice'}>
                      Current Price
                  </div>

                  <div className={'PriceInEthContainer'}>
                      <div className={'NftPriceInEth'}>
                          0.1 OAS
                      </div>

                      <div className={'NftPriceInUsd'}>
                          $0.0101
                      </div>
                  </div>

              </div>


              <div
                  onClick={onBuyNowClicked}
                  className={'NftBuyNowButton'} >
                  Buy Now
              </div>

              <div className={'NftDisclaimer'}>
                  The Warlords is a collection of 9,999 unique digital collectibles for the game Champions Tactics™ Grimoria Chronicles by Ubisoft. Champions Tactics™ Grimoria Chronicles is a brand new PVP Tactical RPG experimental game on PC currently in development at Ubisoft. Assemble a team of mythical Champions, engage in thrilling tactical battles against other players and discover the legends of the dark and mystical world of Grimoria
              </div>

          </div>

      </div>
  );
}

export default  NftModal;
