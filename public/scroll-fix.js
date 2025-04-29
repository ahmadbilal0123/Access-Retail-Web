// This script runs before React hydration and helps prevent automatic scrolling
;(() => {
  // Force scroll to top immediately
  window.scrollTo(0, 0)

  // Disable scroll restoration
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }

  // Remove any hash from the URL
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname)
  }

  // Create a function to force scroll to top
  function forceScrollTop() {
    window.scrollTo(0, 0)
  }

  // Apply repeatedly
  var scrollInterval = setInterval(forceScrollTop, 50)

  // Clean up after a delay
  setTimeout(() => {
    clearInterval(scrollInterval)
  }, 2000)

  // Also handle DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    forceScrollTop()

    // Temporarily disable scrolling
    document.body.style.overflow = "hidden"

    // Re-enable after a delay
    setTimeout(() => {
      document.body.style.overflow = ""
    }, 1000)
  })

  // Also handle load event
  window.addEventListener("load", forceScrollTop)

  // Handle any hash changes
  window.addEventListener("hashchange", () => {
    // Remove hash and prevent scrolling
    window.history.replaceState(null, "", window.location.pathname)
    forceScrollTop()
  })
})()

