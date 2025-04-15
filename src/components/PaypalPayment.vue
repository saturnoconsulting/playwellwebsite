<template>
  <div class="form-paypal">
    <p>Clicca il bottone qui sotto per pagare l'ordine sui server sicuri di PayPal.</p>
    <img class="img-fluid logopaypal" :src="PATH_APP + 'images/paypal-logo.png'">
    <form :action="PAYPAL_URL" method="POST">
      <input type="hidden" name="cmd" value="_xclick">
      <input type="hidden" name="business" :value="PAYPAL_ACCOUNT">
      <input type="hidden" name="item_name" :value="'Feelit! - Ordine numero ' + order.idorder">
      <input type="hidden" name="item_number" :value="order.idorder">
      <input type="hidden" name="amount" :value="order.total">
      <input type="hidden" name="custom" :value="order.idorder">
      <input type="hidden" name="return" :value="BASE_BACKEND_URL + 'api/v1/returnpaypal?etoken=' + etoken">
      <input type="hidden" name="cancel_return" :value="BASE_BACKEND_URL + 'api/v1/cancelreturnpaypal?etoken=' + etoken">
      <input type="hidden" name="notify_url" :value="BASE_BACKEND_URL + 'payment/ipn?etoken=' + etoken">
      <input type="hidden" name="quantity" value="1">
      <input type="hidden" name="lc" value="IT">
      <input type="hidden" name="rm" value="2">
      <input type="hidden" name="cs" value="0">
      <input type="hidden" name="cbt" value="Continua">
      <input type="hidden" name="currency_code" value="EUR">
      <button class="paypalbutton btn" type="submit">Paga ora</button>
    </form>
  </div>
</template>

<script>
import {PATH_APP, PAYPAL_URL, PAYPAL_ACCOUNT, BASE_BACKEND_URL, etoken} from '@/constants/constants';

export default {
  name: "PaypalPayment",
  props : {
    order : {
      type : Object,
      required: true,
    }
  },
  data() {
    return {
      PAYPAL_URL : PAYPAL_URL,
      PAYPAL_ACCOUNT: PAYPAL_ACCOUNT,
      BASE_BACKEND_URL : BASE_BACKEND_URL,
      PATH_APP : PATH_APP,
      etoken : etoken,
      errors : []
    }
  }
}
</script>

<style scoped>
.form-paypal{
  text-align: center;
  padding: 30px 10px 30px 10px;
  border: 1px solid #dedede;
}
.paypalbutton{
  background-color: #0a53be;
  padding: 10px 15px 10px 15px;
  border: 1px solid #0a53be;
  border-radius: 0;
  color: #fff;
}

.paypalbutton:hover{
  border: 1px solid #0a53be;
  background-color: #fff;
  color: #000;
  border-radius: 0;
}

.logopaypal{
  margin-top: 10px;
  margin-bottom: 20px;
  max-width: 300px;
}
</style>