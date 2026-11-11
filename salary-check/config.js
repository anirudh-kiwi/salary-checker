/* Salary Check settings. Edit this file only; index.html reads it. */
window.SALARY_CHECK_CONFIG = {
  shareUrl: "",        // public address of this page, used by the share buttons
  submitEndpoint: "",  // URL that receives each submission (e.g. the Google Sheet script); empty = nothing saved
  metaPixelId: "",     // Meta Pixel ID; empty = no Meta tracking
  dataUpdated: "November 2026",  // shown as "Updated ..." at the top and bottom; change it when the salary figures are refreshed
  highIncomeBands: ["10-15", "15-25", "25-50", "50+"],  // fixed-pay bands (₹ lakh) that count as 10 lakh and above
  highIncomeEvent: "SalaryCheck10LPlus"                 // Meta custom event sent for those visitors
};
(function (c) {
  if (!c.metaPixelId) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', c.metaPixelId);
  fbq('track', 'PageView');
  window.kiwiTrack = function (name, props) {
    if (name !== 'salary_check_submitted' || !props || !props.first) return;
    fbq('trackCustom', 'SalaryCheckSubmitted');
    if (c.highIncomeBands.indexOf(props.ctc_band) !== -1) fbq('trackCustom', c.highIncomeEvent);
  };
})(window.SALARY_CHECK_CONFIG);
