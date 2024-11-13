import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51QJEBVP1SlCSfUky5NWJN9QlHwYht0Dx0S0sXG3TI4wtsFs5NYcPzwX3917KqhtYkLbvuZrEpuv4NS9YfLlY7rvU002hTAvjO3'
    );
    // 1) Get checkout session from the endpoint
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
