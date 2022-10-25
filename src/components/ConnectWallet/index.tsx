import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ColorMode, DAppClient, TezosOperationType } from "@airgap/beacon-sdk";

import HoverMenu from "components/UI/HoverMenu";
import { BiUser } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { RiWallet3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import offerPercentage from "assets/images/offer-percentage.svg";
import {
  Tezos,
  TEZOS_COLLECT_NETWORK,
  TEZOS_COLLECT_WALLET,
} from "helper/constants";
import { beautifyAddress } from "helper/formatters";
import { useTezosCollectStore } from "store";

const ConnectWallet = () => {
  const navigate = useNavigate();
  const { activeAddress } = useTezosCollectStore();
  const setActiveAddress = useTezosCollectStore(
    (store) => store.setActiveAddress
  );

  const onConnectWallet = async () => {
    await TEZOS_COLLECT_WALLET.requestPermissions({
      network: TEZOS_COLLECT_NETWORK,
    });
    const _activeAddress = await TEZOS_COLLECT_WALLET.getPKH();
    setActiveAddress(_activeAddress);
  };

  const onDisconnectWallet = async () => {
    setActiveAddress("");
    await TEZOS_COLLECT_WALLET.clearActiveAccount();
  };

  useEffect(() => {
    const getActiveAccounts = async () => {
      const _activeAddress =
        await TEZOS_COLLECT_WALLET.client.getActiveAccount();
      if (_activeAddress?.address) {
        // If defined, the user is connected to a wallet.
        // You can now do an operation request, sign request, or send another permission request to switch wallet
        // console.log("Already connected:", _activeAddress?.address);

        // You probably want to show the address in your UI somewhere.
        setActiveAddress(_activeAddress?.address);
        // console.log(activeAddress);
      }
      Tezos.setWalletProvider(TEZOS_COLLECT_WALLET);
    };
    getActiveAccounts();
  }, []);

  return activeAddress.length === 0 ? (
    <button
      className="tezGr-button px-2 md:px-6 ml-4 md:ml-0 duration-100"
      id="collect_wallet"
      onClick={onConnectWallet}
    >
      <span className="hidden md:block">Connect Wallet</span>
      <RiWallet3Line className="md:hidden" size={20} />
    </button>
  ) : (
    <HoverMenu
      options={[
        {
          icon: <FaUserCircle size={20} />,
          text: "My Profile",
          handler: () => {
            navigate(`/profile/${activeAddress}`);
          },
        },
        {
          icon: <img src={offerPercentage} />,
          text: "Offers",
          handler: () => {
            navigate(`/profile/${activeAddress}/offers`);
          },
        },
        {
          icon: <IoMdHeart size={20} />,
          text: "Watchlist",
          handler: () => {
            navigate(`/profile/${activeAddress}/favorites`);
          },
        },
        {
          text: <span className="text-tezWarning">Disconnect Wallet</span>,
          class:
            "p-4 pr-8 flex gap-2 border-t-2 border-t-inputBorder items-center bg-componentBg hover:bg-white/10 duration-50",
          handler: () => onDisconnectWallet(),
        },
      ]}
      icon={<BiUser size={20} className="mx-2" />}
      text={
        <span className="mr-4 hidden md:block">
          {beautifyAddress(activeAddress)}
        </span>
      }
    />
  );
};

export default ConnectWallet;
