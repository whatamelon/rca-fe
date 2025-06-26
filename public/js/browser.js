const agent = window.navigator.userAgent.toLowerCase()

if (!/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(agent)) {
  const appName = window.navigator.appName.toLowerCase()
  if ((appName === 'netscape' && agent.indexOf('trident') !== -1) || agent.indexOf('msie') !== -1) {
    /// IE
    if (window.location.pathname !== '/thankyou') {
      window.location.href = '/thankyou'
    }
  } else if (agent.match(/chrome|chromium|crios/i)) {
    /// chrome
  } else if (agent.match(/whale/i)) {
    /// whale
  } else if (agent.match(/Edg/i)) {
    /// whale
  } else if (agent.match(/Edge/i)) {
    /// whale
  } else if (agent.match(/EdgA/i)) {
    /// whale
  } else if (agent.match(/samsung|samsungbrowser/i)) {
    /// samsung
  } else if (agent.match(/firefox|fxios/i)) {
    /// firefox
  } else if (agent.match(/safari/i)) {
    /// safari
  } else if (agent.match(/opr\//i)) {
    /// opera
    if (window.location.pathname !== '/thankyou') {
      window.location.href = '/thankyou'
    }
  } else if (agent.match(/edg/i)) {
    /// edge
  } else if (window.location.pathname !== '/thankyou') {
    window.location.href = '/thankyou'
  }
}

localStorage.theme = 'light'
