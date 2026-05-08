export default function PricingPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Pricing Plans</h1>

      <div>
        <h3>Free Plan</h3>
        <p>Basic CBT access</p>
      </div>

      <div>
        <h3>Basic Plan</h3>
        <p>Up to 200 students</p>
      </div>

      <div>
        <h3>Pro Plan</h3>
        <p>Unlimited schools + analytics</p>
      </div>

      <a href="/login">
        <button>Start Subscription</button>
      </a>
    </div>
  )
}
