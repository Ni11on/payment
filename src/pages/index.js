import { useState } from "react"
import Script from "next/script"
import { sessionKey } from "../fechtniubiz"

export default function Home() {



  const [sesionKey, setSesionKey] = useState()

  const niubizKey = async () => {
    const keys = await sessionKey()
    setSesionKey(keys.sessionKey)
  }

  const onload = () => {
    niubizKey()
    VisanetCheckout.configure({
      sessiontoken: sesionKey,
      channel: 'web',
      merchantid: '456879852',
      purchasenumber: '202',
      amount: '10.5',
      expirationminutes: '20',
      timeouturl: 'about:blank',
      merchantlogo: 'img/comercio.png',
      formbuttoncolor: '#000000',
      action: 'confirmation',
      complete: function (params) {
        alert(JSON.stringify(params))
      }
    })
    VisanetCheckout.open()
  }

  const attrs = { onClick: onload }

  return (
    <div>

      <button {...attrs}> Pay </button>
      <Script
        id="onload-id"
        src="https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=truef"
        onLoad={onload} />
    </div>
  )
}
